import { app, BrowserWindow, globalShortcut } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let event = require('./event'),
  server = null;      // node 服务器实例
const http = require('http');
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame:false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  event(mainWindow, app);

  // 注册esc，用来关闭眼保的遮挡框
  globalShortcut.register('ESC', function () {
    // 关闭眼保
    eyeTimeUp();
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
const electron = require('electron');
const ipc = electron.ipcMain;

ipc.on('close-app', () => {
  // 发起通知告知关闭
  mainWindow.webContents.send('app-close');
  ipc.on('close-app-ok', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });
});

ipc.on('max-app', () => {
  // mainWindow.maximize();
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
      mainWindow.maximize()
  }
});
ipc.on('min-app', () => {
  mainWindow.minimize();
});
let eyeWindow = null,
  eyeTimekeeping = null;
// 眼保开始
ipc.on('eyeProtection-start', (e, time) => {
  if (eyeWindow) {
    return;
  }
  eyeWindow = new BrowserWindow({
    width: 200, 
    height: 100,
    frame: false,
    // alwaysOnTop: true,   // 保险
    parent: mainWindow //win是主窗口
  });
  eyeWindow.loadURL(`file:///${__dirname}/eyeCover.html`);

  eyeWindow.setFullScreen(true);

  eyeTimekeeping = setTimeout(function() {
    eyeTimeUp();
  }, time * 1000);
});

function eyeTimeUp() {
  if (eyeWindow) {
    eyeWindow.close();
    eyeWindow = null;
    clearTimeout(eyeTimekeeping);
    eyeTimekeeping = null;
    // 结束了，可以重新开始计时了
    mainWindow.webContents.send('eyeProtection-restart');
  }
}











// node服务器
ipc.on('http-request', (e, config) => {
  if (!server) {
      requestHttp(config);
  }
});

function requestHttp(config) {
  let info = combineInfo(config);
  console.log(info);

  // 请求的数据内容组装
  var options = {  
      hostname: 'openapi.tuling123.com',
      path: '/openapi/api/v2',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
  };

  var robotServer = http.request(options, function (roRes) {
      let data = '';

      roRes.setEncoding('utf8');  
      console.log('STATUS: ' + roRes.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(roRes.headers));
      roRes.on('data', function (chunk) {
          data += chunk;
      });  
      roRes.on('end', function() {
          // 接受完成，发送给页面
          mainWindow.webContents.send('http-request-data', {
            dataStr: data
          });
          // console.log('datadatadatadatadata: ' + data);
      })
  });

  robotServer.write(info);
  robotServer.end();  
}

function combineInfo(config) {
  let info = config.text,
    msg = {
    "reqType":0,
    "perception": {
        "inputText": {
            "text": info
        }
    },
    "userInfo": {
        "apiKey": config.apiKey,
        "userId": ~~(Math.random() * 99999)
    }
  };

  return JSON.stringify(msg);
}


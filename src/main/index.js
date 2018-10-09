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

let event = require('./event');
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
const ipc = require('electron').ipcMain;
const path = require('path');

ipc.on('close-app', () => {
  // 发起通知告知关闭
  mainWindow.webContents.send('app-close');
  ipc.on('close-app-ok', () => {
      mainWindow.close();
  });
});

ipc.on('max-app', () => {
  mainWindow.maximize();
});
ipc.on('min-app', () => {
  mainWindow.minimize();
});
// 眼保开始
ipc.on('eyeProtection-start', (e, time) => {
  let newwin = new BrowserWindow({
    width: 200, 
    height: 100,
    frame: false,
    // alwaysOnTop: true,
    parent: mainWindow //win是主窗口
  });
  newwin.loadURL(`file:///${__dirname}/a.html`);

  // newwin.setFullScreen(true);

  setTimeout(function() {
    newwin.close();
    // 结束了，可以重新开始计时了
    mainWindow.webContents.send('eyeProtection-restart');
  }, time * 1000);
});

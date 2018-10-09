// 
let mainWindow = null;
let appTray = null;
let app = null;
const electron = require('electron');
const ipc = electron.ipcMain;
const path = require('path');

// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray () {
    //用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 
    // ，通常被添加到一个 context menu 上.
    const Menu = electron.Menu;
    const Tray = electron.Tray;
    //系统托盘右键菜单
    let trayMenuTemplate = [{//系统托盘图标目录
        label: '退出',
        click: function () {
            app.quit();
            app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
        }
    }];
    // 当前目录下的app.ico图标
    appTray = new Tray('app.ico');
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

    // 隐藏主窗口
    mainWindow.hide();
    // 设置托盘悬浮提示
    appTray.setToolTip('never forget');
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu);
    //单击托盘小图标显示应用
    appTray.on('click', function(){
        // 显示主程序
        mainWindow.show();
        // 关闭托盘显示
        appTray.destroy();
    });
};

// 最小化到托盘监听
ipc.on('open-tray', () => {
    setTray();
});
// 应用退出的监听
/* ipc.on('close-app', () => {
    mainWindow = null;
    appTray.destroy();
}); */

module.exports = (main, apl) => {
    mainWindow = main;
    app = apl;
}
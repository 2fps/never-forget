var me = {
    name: 'never',
    version: 1,
    request: null,
    db: null,
    ojstore: {
        name: 'students',       // 
        keypath: 'id'           // 主键
    }
};
let connect = () => {
    let indexedDB = window.indexedDB;

    return new Promise((resolve, reject) => {
        // 打开连接
        me.request = indexedDB.open(me.name, 1);
        // 异常
        me.request.onerror = function(e) {
            console.log(e.target.errorCode);
            reject();
        };
        // 连接成功
        me.request.onsuccess = function(e) {
            me.database = e.target.result;
            resolve('success');
        }
        // 
        me.request.onupgradeneeded = (e) => {
            me.database = e.target.result;
            // 
            if (!me.database.objectStoreNames.contains('setting')){
                let store = me.database.createObjectStore("setting", {
                    keyPath: 'name'
                });
                // var store = me.database.createObjectStore("setting",{autoIncrement:true}/* ,{keyPath:"id"} */);
                request = store.add({
                    name: 'setting',
                    global: {
                        tray: true
                    }
                });
            }
            if (!me.database.objectStoreNames.contains('work')) {
                let store = me.database.createObjectStore("work", {
                    keyPath: 'date'
                });
                request = store.add({
                    date: '123'
                });
            }
            if (!me.database.objectStoreNames.contains('eye')) {
                let store = me.database.createObjectStore("eye", {
                    keyPath: 'name'
                });
                request = store.add({
                    name: 'setting',
                    enable: false,
                    wait: 45 * 60,
                    duration: 60
                });
            }

            resolve('update');
        }
    });
};

// 连接
connect();


export default me;
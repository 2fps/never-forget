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
    let indexedDB = window.indexedDB,
        instance = null;

    if (instance) {
        // connect后一直返回实例就行了
        return instance;
    }

    instance = new Promise((resolve, reject) => {
        // 打开连接
        me.request = indexedDB.open(me.name, 1);
        // 异常
        me.request.onerror = function(e) {
            console.log(e.target.errorCode);
            reject();
        };
        // 连接成功
        me.request.onsuccess = function(e) {
            me.db = e.target.result;
            resolve('success');
        }
        // 
        me.request.onupgradeneeded = (e) => {
            me.db = e.target.result;
            // 
            if (!me.db.objectStoreNames.contains('setting')){
                let store = me.db.createObjectStore("setting", {
                    keyPath: 'name'
                });
                // var store = me.db.createObjectStore("setting",{autoIncrement:true}/* ,{keyPath:"id"} */);
                me.request = store.add({
                    name: 'setting',
                    global: {
                        tray: true
                    }
                });
            }
            if (!me.db.objectStoreNames.contains('work')) {
                let store = me.db.createObjectStore("work", {
                    keyPath: 'date'
                });
                me.request = store.add({
                    date: '123'
                });
            }
            if (!me.db.objectStoreNames.contains('eye')) {
                let store = me.db.createObjectStore("eye", {
                    keyPath: 'name'
                });
                me.request = store.add({
                    name: 'config',
                    enable: false,
                    wait: 45 * 60,
                    duration: 60
                });
            }

            resolve('update');
        }
    });

    return instance;
};

if (!me.db) {
    connect();
}

/* // 连接
if (!me.db) {
    connect();
}
 */
me.connect = connect;

export default me;
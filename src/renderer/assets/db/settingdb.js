import dataBase from './connection';

let me = {};

// 获取设置下的配置
me.getGlobalSetting = () => {
    return new Promise((resolve, reject) => {
        let store = dataBase.db.transaction('setting', 'readwrite').objectStore('setting'),
            request = store.get('setting');

        request.onerror = function(){
            // error
            reject();
        };
        request.onsuccess = function(e){
            var result = e.target.result;

            resolve(result);
        };
    });
};
// 下发设置的配置
me.setGlobalSetting = (name, info, key) => {
    // 先查询，后修改
    return new Promise((resolve, reject) => {
        let store = dataBase.db.transaction('setting', 'readwrite').objectStore('setting'),
            request = store.get('setting');

        request.onerror = function() {
            // error
            reject();
        };
        request.onsuccess = function(e) {
            var result = e.target.result;

            for (var i in info) {
                // 批量修改
                if (info.hasOwnProperty(i)) {
                    result.global[i] = info[i];
                }
            }
            store.put(result, key);

            resolve();
        };
    });
};

export default me;
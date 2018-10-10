import dataBase from './connection';

// 获取设置下的配置
// storename: 'global'
exports.getEyeConfig = () => {
    dateStr = dateStr || getNowDate();

    return new Promise((resolve, reject) => {
        let store = dataBase.db.transaction('eye', 'read').objectStore('eye'),
            request = store.get('eye');

        request.onerror = function() {
            // error
            reject();
        };
        request.onsuccess = function(e) {
            var result = e.target.result;

            resolve(result);
        };
    });
};

// 设置任务的配置
exports.setEyeConfig = (info, dateStr) => {
    dateStr = dateStr || getNowDate();
    // 先查询，后修改
    return new Promise((resolve, reject) => {
        let store = dataBase.db.transaction('eye', 'readwrite').objectStore('eye'),
            request = store.get('eye');

        request.onerror = function() {
            // error
            reject();
        };
        request.onsuccess = function(e) {
            let result = e.target.result;

            for (let i in info) {
                // 批量修改
                if (info.hasOwnProperty(i)) {
                    result[i] = info[i];
                }
            }
            store.put(result, 'eye');

            resolve();
        };
    });
};
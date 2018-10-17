import dataBase from './connection';
import Util from '../util';

// 获取设置下的配置
// storename: 'global'
exports.getWorkByDate = (dateStr) => {
    dateStr = dateStr || getNowDate();

    return new Promise((resolve, reject) => {
        let store = dataBase.db.transaction('work', 'read').objectStore('work'),
            request = store.get(dateStr);

        request.onerror = function() {
            reject();
        };
        request.onsuccess = function(e) {
            var result = e.target.result;

            resolve(result);
        };
    });
};

// 设置任务的配置
exports.setWorkByDate = (info, dateStr) => {
    dateStr = dateStr || Util.getNowDate();
    // 先查询，后修改
    return new Promise((resolve, reject) => {
        let store = dataBase.db.transaction('work', 'readwrite').objectStore('work'),
            request = store.get(dateStr);

        request.onerror = function(){
            // error
            reject();
        };
        request.onsuccess = function(e){
            var result = e.target.result;

            if (!result) {
                // 没有查询到这种情况下就是新增
                result = info;
            }
            store.put(result, dateStr);

            resolve();
        };
    });
};
import cache from '../../assets/dataBase';

const state = {
    enable: false,      // 使能
    last: 45,           // 眼保等待时间
    duration: 1         // 眼保持续时间
}
const mutations = {
    // 点击确定时，保存到vuex
    confirmData(state, data) {
        state.enable = data.enable;
        state.last = data.last;
        state.duration = data.duration;
    },
    // 保存到storage
    saveData(state) {
        cache.saveEyeData({
            enable: state.enable,
            last: state.last,
            duration: state.duration
        });
    },
    getData(state) {
        let data = cache.getEyeData();

        if (undefined !== data.enable) {
            // 有设置过st
            state.enable = data.enable;
            state.last = data.last;
            state.duration = data.duration;
        }
    }
}
const actions = {
    someAsyncTask ({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}
const getters = {
    // 获取任务的ID号，唯一标定一个任务
    getData: state => {
        return {
            enable: state.enable,
            last: state.last,
            duration: state.duration
        };
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}
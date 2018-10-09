import cache from '../../assets/dataBase';

const state = {
    all: {                  // 总的配置，应用的配置
        alwaysTray: true    // 默认关闭时最小化到托盘
    }
}
const mutations = {
    getAllConfig() {
        let setting = cache.getSetting();

        if (setting.all) {
            state.all.alwaysTray = setting.all.alwaysTray;
        }
    },
    saveTray() {
        let setting = cache.getSetting();

        if (!setting.all) {
            setting.all = {};
        }
        setting.all.alwaysTray = state.all.alwaysTray;

        cache.saveSetting(setting);
    }
}
const actions = {

}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters
}
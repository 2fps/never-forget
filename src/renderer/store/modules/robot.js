import cache from '../../assets/dataBase';

const state = {
    apikey: ''
}
const mutations = {
    // 保存到storage
    getApi(state) {
        let ro = cache.getRobotApiKey();
        state.apikey = ro.apikey
    },
    setApi(state, newApiKye) {
        let ro = {
            apikey: newApiKye
        };

        cache.setRobotApiKey(ro);
    }
}
const actions = {
}
const getters = {
};
export default {
    state,
    mutations,
    actions,
    getters
}
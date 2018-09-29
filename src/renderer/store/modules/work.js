const state = {
    unfinishWork: [],
    finishedWork: [],
    ids: []
}
const mutations = {
    addNewWork (state, work) {
        state.unfinishWork.push(work);
    },
    // 完成了某个任务
    doFinish (state, workId) {
    }
}
const actions = {
    someAsyncTask ({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}
export default {
    state,
    mutations,
    actions
}
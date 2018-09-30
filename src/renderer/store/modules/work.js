const state = {
    unfinishWork: [],
    finishedWork: [],
    nextID: 0           // id给work标定
}
const mutations = {
    addID (state) {
        state.nextID++;
    },
    // 增加新的未完成的任务
    addNewWork (state, work) {
        let i = 0,
            len = state.unfinishWork.length;

        if (!work.isTop) {
            // 非置顶的，查找最后一个置顶任务
            for (; i < len; ++i) {
                if (!state.unfinishWork[i]) {
                    break;
                }
            }
        } else {
            // 置顶，相当于从0开始插入
            i = 0;
        }

        state.unfinishWork.splice(i, 0, work);
    },
    // 置顶工作
    topWork (state, workId) {
        let index = findIndex(state.unfinishWork, workId),
            temp = state.unfinishWork.splice(index, 1);

        // 数组头部插入数据
        state.unfinishWork.unshift(...temp);
    },
    // 删除未完成的工作
    deleteUnfinishWork (state, workId) {
        let index = findIndex(state.unfinishWork, workId);

        state.unfinishWork.splice(index, 1);
    },
    modifyUnfinishWork (state, info) {
        let index = findIndex(state.unfinishWork, info.ID);

        // 修改对应的内容
        state.unfinishWork[index].name = '';
        state.unfinishWork[index].content = '';
    },
    // 完成了某个任务
    doFinish (state, workId) {
        let index = findIndex(state.unfinishWork, workId),
            temp = state.unfinishWork.splice(index, 1);

        // 放入完成任务列表
        state.finishedWork.push(...temp);
    },
    deleteFinishedWork (state, workId) {
        let index = findIndex(state.finishedWork, workId);

        state.finishedWork.splice(index, 1);
    }
}
// 根据id属性从arr中检索出他的位置（下标）
function findIndex(arr, id) {
    let ind = 0,
        len = arr.length;

    for (; ind < len; ++ind) {
        if (arr[ind].ID === id) {
            // 匹配成功
            break;
        }
    }

    return ind;
}
const actions = {
    someAsyncTask ({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}
const getters = {
    // 获取任务的ID号，唯一标定一个任务
    getID: state => state.nextID
};
export default {
    state,
    mutations,
    actions,
    getters
}
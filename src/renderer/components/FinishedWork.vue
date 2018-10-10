<template>
    <div class="finished-work-outer">
        <div class="finished-work-box">
            <div class="work-box-header">
                <span>已完成任务</span>
                (<span>{{ this.finishedWork.length }}</span>)
            </div>
            <div class="work-box-content">
                <div v-for="(work, index) in finishedWork" :key="index" class="text item one-work">
                    <p class="finish-main">
                        <span>任务名称：</span>
                        <span v-text="work.name"></span>
                    </p>
                    <p class="finish-extend">
                        <span>任务内容：</span>
                        <span v-text="work.content"></span>
                    </p>
                    <div class="operation-icon" @click.stop>
                        <i class="delete-work el-icon-close" title="删除" @click="remove(work.ID)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            finishedWork: []
        }
    },
    methods: {
        remove (Id) {
            this.$store.commit('deleteFinishedWork', Id);
        },
        
    },
    mounted() {
        this.finishedWork = this.$store.state.work.finishedWork;
    }
}
</script>

<style lang="scss" scoped>
.finished-work-outer {
    height: 100%;
    position: relative;
}
.finished-work-box {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    background-color: #fff;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    & > .work-box-header {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
    }
    & > .work-box-content {
        position: absolute;
        top: 41px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        overflow: scroll;
    }
}
.one-work {
    padding: 5px 5px 8px;
    position: relative;
    cursor: pointer;
    &:hover {
        background-color: #DCDFE6;
    }
    .finish-main {
        color: #606266;
        font-size: 14px;
        margin-bottom: 0px;
    }
    .finish-extend {
        color: #909399;
        font-size: 12px;
        margin-top: 0px;
    }
    .delete-work {
        position: absolute;
        top: 0px;
        right: 0px;
        cursor: pointer;
        &:hover {
            color: #F56C6C;
        }
    }
    .operation-icon {
        display: none;
        position: absolute;
        top: 12px;
        right: 10px;
    }
    &:hover .operation-icon {
        display: block;
    } 
}
</style>

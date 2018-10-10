<template>
    <div class="unfinish-work-outer">
        <div class="unfinish-work-box">
            <div class="work-box-header">
                <span>未完成任务</span>
                (<span>{{ this.unfinishWork.length }}</span>)
            </div>
            <div class="work-box-content">
                <div v-for="(work, index) in unfinishWork" :key="index" class="text item one-work">
                    <p class="finish-main">
                        <span>任务名称：</span>
                        <span v-text="work.name"></span>
                    </p>
                    <p class="finish-extend">
                        <span>任务内容：</span>
                        <span v-text="work.content"></span>
                    </p>
                    <div class="operation-icon" @click.stop>
                        <i class="delete-work el-icon-check" title="完成" @click="finish(work.ID)"></i>
                        <i class="delete-work el-icon-close" title="删除" @click="remove(work.ID)"></i>
                        <i class="delete-work el-icon-upload2" title="置顶" style="right:40px;" @click="toTop(work.ID)"></i>
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
            unfinishWork: []
        }
    },
    mounted() {
        // 形成应用关系
        this.unfinishWork = this.$store.state.work.unfinishWork;
    },
    methods: {
        finish(Id) {
            this.$store.commit('doFinish', Id);
        },
        // 删除未完成的工作
        remove(Id) {
            this.$store.commit('deleteUnfinishWork', Id);
        },
        // 置顶未完成的工作
        toTop (Id) {
            this.$store.commit('topWork', Id);
        }
    }
}
</script>

<style lang="scss" scoped>
.unfinish-work-outer {
    height: 100%;
    position: relative;
}
.unfinish-work-box {
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
        background-color: #EBEEF5;
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
    }
    .el-icon-upload2 {
        right: 40px;
        &:hover {
            color: #409EFF;
        }
    }
    .el-icon-close {
        right: 20px;
        &:hover {
            color: #F56C6C;
        }
    }
    .el-icon-check {
        &:hover {
            color: #409EFF;
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

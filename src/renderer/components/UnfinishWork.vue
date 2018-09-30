<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>未完成任务</span>
                (<span>{{ this.unfinishWork.length }}</span>)
            </div>
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
                    <i class="delete-work el-icon-check" @click="finish(work.ID)"></i>
                    <i class="delete-work el-icon-close" style="right:20px;" @click="remove(work.ID)"></i>
                    <i class="delete-work el-icon-upload2" style="right:40px;" @click="toTop(work.ID)"></i>
                </div>
            </div>
        </el-card>
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
        },
        open3() {
            this.$prompt('请输入邮箱', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value
                });
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '取消输入'
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.unfinish-time-input {
    width: 40%;
}
.box-card {
    margin: 10px 20px;
}
.one-work {
    margin-bottom: 8px;
    position: relative;
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
    .operation-icon {
        display: none;
    }
    &:hover .operation-icon {
        display: block;
    } 
}
</style>

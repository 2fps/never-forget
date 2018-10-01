<template>
    <div class="main-work">
        <div class="form-row">
            <p>任务名称:</p>
            <el-input
                v-model="name"
                placeholder="请输入任务名称"
                size="small">
            </el-input>
        </div>
        <div class="form-row">
            <p>细节内容:</p>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入详细内容"
                v-model="content">
            </el-input>
        </div>
        <div class="form-row">
            <el-switch
                v-model="isTop"
                active-color="#409EFF"
                active-text="是否置顶"
                inactive-color="#909399">
            </el-switch>
        </div>
        <el-button type="primary" class="align-center" @click="addNewWork()">新增任务</el-button>
    </div>
</template>

<script>
const ipc = require('electron').ipcRenderer;

export default {
    data() {
        return {
            name: '',
            content: '',
            isTop: false
        }
    },
    methods: {
        addNewWork() {
            if ('' === this.name) {
                this.$message.error('请输入名称');

                return;
            }
            this.$store.commit('addID');
            this.$store.commit('addNewWork', {
                name: this.name,
                content: this.content,
                ID: this.$store.getters.getID,
                isTop: this.isTop
            });
            // 清空数据
            this.name = '';
            this.content = '';
        },
        newAdd() {
            ipc.send('eyeProtection');
        }
    }
}
</script>

<style lang="scss" scoped>
.main-work {
    padding: 10px;
    .form-row {
        margin-bottom: 20px;
        & > p {
            margin-bottom: 10px;
        }
    }
}
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
    }
}
</style>

<template>
    <div>
        活动名称
        <el-input v-model="name" size="small"></el-input>
        细节内容
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="content">
        </el-input>
        <el-switch
            v-model="isTop"
            active-color="#409EFF"
            active-text="是否置顶"
            inactive-color="#909399">
        </el-switch>
        <el-button type="primary" @click="addNewWork()">新增</el-button>
        <el-button type="primary" @click="newAdd()">新窗口</el-button>
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
            this.$store.commit('addID');
            this.$store.commit('addNewWork', {
                name: this.name,
                content: this.content,
                ID: this.$store.getters.getID,
                isTop: this.isTop
            });
        },
        newAdd() {
            ipc.send('eyeProtection');
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
    }
}
</style>

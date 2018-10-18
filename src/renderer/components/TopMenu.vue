<template>
    <div class="top-menu-bg">
        <div class="top-menu">
            <div class="left-side">
                <i class="el-icon-document right-corner"></i>
                <span>never forget</span>
            </div>
        </div>
        <div class="right-side">
            <!-- <i class="el-icon-upload2 right-corner"></i> -->
            <i class="el-icon-minus right-corner" @click="minApp()"></i>
            <i class="el-icon-sort right-corner" @click="maxApp()"></i>
            <i class="el-icon-close right-corner" @click="closeApp()"></i>
        </div>
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
        // 关闭app
        closeApp() {
            ipc.send('close-app');
        },
        // 最小化app
        minApp() {
            ipc.send('min-app');
        },
        // 最大化app
        maxApp() {
            ipc.send('max-app');
        }
    }
}
</script>

<style lang="scss" scoped>
.top-menu {
    position: absolute;
    top: 0px;
    right: 88px;
    left: 65px;
    height: 30px;
    line-height: 30px;
    -webkit-app-region: drag;
    border-bottom: 1px solid #f5f5f5;
    background-color: #E6E5E6;
    .left-side {
        float: left;
    }
}
.right-side {
    float: right;
    background-color: #E6E5E6;
}
.right-corner {
    cursor: pointer;
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 7px;
}
.el-icon-close:hover {
    color: #F56C6C;
}
.el-icon-sort:hover, .el-icon-minus:hover {
    color: #409EFF;
}
</style>

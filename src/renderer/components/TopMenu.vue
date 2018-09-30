<template>
    <div class="top-menu">
        <div class="left-side">
            <i class="el-icon-upload2"></i>
            <span>never forget</span>
        </div>
        <div class="right-side">
            <i class="el-icon-upload2"></i>
            <i class="el-icon-minus" @click="minApp()"></i>
            <i class="el-icon-upload2"></i>
            <i class="el-icon-close" @click="closeApp()"></i>
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
        }
    }
}
</script>

<style lang="scss" scoped>
.top-menu {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 65px;
    height: 30px;
    line-height: 30px;
    -webkit-app-region: drag;
    border-bottom: 1px solid #f5f5f5;
    .left-side {
        float: left;
    }
    .right-side {
        float: right;
    }
}
</style>

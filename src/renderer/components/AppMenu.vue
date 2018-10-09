<template>
    <el-menu default-active="memo" class="el-menu-vertical-demo left-app-menu" :collapse="true" background-color="#222831" @select="indexChange">
        <el-menu-item index="memo" @click="toWork()">
            <i class="el-icon-tickets"></i>
            <span slot="title">备忘录</span>
        </el-menu-item>
         <el-menu-item index="eyeProtection" @click="toEye()">
            <i class="el-icon-view"></i>
            <span slot="title">眼保</span>
        </el-menu-item>
        <el-menu-item index="setting" @click="toSetting()">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
const ipc = require('electron').ipcRenderer;
let me = null;

export default {
    data() {
        return {
            nowIndex: '',       // 当前在哪个菜单栏下
            lastIndex: ''       // 前一次index
        };
    },
    methods: {
        indexChange(index) {
            if ('memo' === this.nowIndex && 'memo' !== index) {
                // 切离memo，触发保存到缓存数据中
                this.$store.commit('writeCache');
            } else if ('memo' !== this.nowIndex && 'memo' === index) {
                // 切回memo，加载缓存
                this.$store.commit('readCache');
            }
            // 修改记录值
            this.lastIndex = this.nowIndex;
            this.nowIndex = index;
        },
        toWork() {
            this.$router.push('/');
        },
        toEye() {
            this.$router.push('/eyeProtection');
        },
        toSetting() {
            this.$router.push('/setting');
        }
    },
    mounted() {
        me = this;
        this.indexChange('memo');
        this.nowIndex = 'memo';
    },
    watch: {
        nowIndex() {
            if ('setting' === this.lastIndex) {
                // 从setting中切出
                this.$store.commit('saveTrayCache');
            }
        }
    }
};
ipc.on('app-close', (e) => {
    let flag = me.$store.state.setting.all.alwaysTray;
    me.$store.commit('writeCache');
    // 判断下是否要最小化到托盘
    if (flag) {
        // 最小化
        ipc.send('open-tray');
    } else {
        // 直接通知关闭
        ipc.send('close-app-ok');
    }
});
</script>

<style lang="scss" scoped>
.left-app-menu {
    height: 100%;
    float: left;
}
</style>

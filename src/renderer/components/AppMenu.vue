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
        <!--<el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
        </el-menu-item> -->
    </el-menu>
</template>

<script>
const ipc = require('electron').ipcRenderer;
let me = null;

export default {
    data() {
        return {
            nowIndex: ''        // 当前在哪个菜单栏下
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
            this.nowIndex = index;
        },
        toWork() {
            this.$router.push('/');
        },
        toEye() {
            this.$router.push('/eyeProtection');
        }
    },
    mounted() {
        me = this;
        this.indexChange('memo');
        this.nowIndex = 'memo';
    }
}
ipc.on('app-close', (e) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
    me.$store.commit('writeCache');
    ipc.send('close-app-ok');
})
</script>

<style lang="scss" scoped>
.left-app-menu {
    height: 100%;
    float: left;
}
</style>

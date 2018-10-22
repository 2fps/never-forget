<template>
    <div id="app">
        <app-menu></app-menu>
        <top-menu></top-menu>
        <div class="right-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppMenu from './components/AppMenu';
import TopMenu from './components/TopMenu';

export default {
    name: 'never-forget',
    components: {
        AppMenu,
        TopMenu
    },
    methods: {
        // 检测版本信息
        checkVersion () {

        }
    },
    mounted() {
        this.checkVersion();
    }
}
</script>


<style>
html, body, p, ul, li {
    padding: 0px;
    margin: 0px;
}
html, body {
    height: 100%;
}
#app {
    height: 100%;
}
.right-content {
    position: absolute;
    top: 30px;
    right: 0px;
    bottom: 0px;
    left: 65px;
    background-color: #F5F5F5;
}
.align-center {
    text-align: center;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    border-radius: 10px;
    width: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #bbb;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: #eee;
}
</style>

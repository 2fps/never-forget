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
    }
}
</script>

<style>
html, body {
    padding: 0px;
    margin: 0px;
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
}
</style>

<template>
    <div id="app">
        <app-menu></app-menu>
        <div class="right-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppMenu from './components/AppMenu';

export default {
    name: 'never-forget',
    components: {
        AppMenu
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
    margin-left: 65px;
}
</style>

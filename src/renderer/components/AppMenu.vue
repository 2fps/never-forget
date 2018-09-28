<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo left-app-menu" :collapse="true" background-color="#222831">
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.left-app-menu {
    height: 100%;
    float: left;
}
</style>

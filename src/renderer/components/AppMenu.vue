<template>
    <el-menu default-active="1" class="el-menu-vertical-demo left-app-menu" :collapse="true" background-color="#222831">
        <el-menu-item index="1" @click="toWork()">
            <i class="el-icon-tickets"></i>
            <span slot="title">备忘录</span>
        </el-menu-item>
         <el-menu-item index="2" @click="toEye()">
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
export default {
    methods: {
        toWork() {
            this.$router.push('/');
        },
        toEye() {
            this.$router.push('/eyeProtection');
        }
    }
}
</script>

<style lang="scss" scoped>
.left-app-menu {
    height: 100%;
    float: left;
}
</style>

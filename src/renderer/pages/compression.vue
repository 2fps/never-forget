<template>
    <div class="compression-box">
        <el-button type="primary" :native-type="btnType">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            btnType: 'file'
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.compression-box {
    padding: 20px 40px;
}
</style>

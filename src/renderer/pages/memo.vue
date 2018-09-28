<template>
    <el-row :gutter="0" class="">
        <el-col :span="6">
            此处可添加
        </el-col>
        <el-col :span="9">
            <unfinish-work></unfinish-work>
        </el-col>
        <el-col :span="9">
            已完成认为
        </el-col>
    </el-row>
</template>

<script>
import UnfinishWork from '../components/UnfinishWork'

export default {
    components: {
        UnfinishWork
    }
}
</script>


<style lang="scss" scoped>

</style>

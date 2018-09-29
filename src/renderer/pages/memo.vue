<template>
    <el-row :gutter="0" class="">
        <el-col :span="6">
            <main-work></main-work>
        </el-col>
        <el-col :span="9">
            <unfinish-work></unfinish-work>
        </el-col>
        <el-col :span="9">
            <finish-work></finish-work>
        </el-col>
    </el-row>
</template>

<script>
import MainWork from '../components/MainWork'
import UnfinishWork from '../components/UnfinishWork'
import FinishWork from '../components/FinishWork'

export default {
    components: {
        MainWork,
        UnfinishWork,
        FinishWork
    }
}
</script>


<style lang="scss" scoped>

</style>

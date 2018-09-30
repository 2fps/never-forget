<template>
    <el-row :gutter="0" style="height:100%">
        <el-col :span="6">
            <main-work></main-work>
        </el-col>
        <el-col :span="9" style="height:100%">
            <unfinish-work></unfinish-work>
        </el-col>
        <el-col :span="9">
            <finished-work></finished-work>
        </el-col>
    </el-row>
</template>

<script>
import MainWork from '../components/MainWork'
import UnfinishWork from '../components/UnfinishWork'
import FinishedWork from '../components/FinishedWork'

export default {
    components: {
        MainWork,
        UnfinishWork,
        FinishedWork
    }
}
</script>


<style lang="scss" scoped>

</style>

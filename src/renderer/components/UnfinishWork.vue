<template>
    <div>
        <el-time-picker
            v-model="startTime"
            class="unfinish-time-input"
            size="mini"
            placeholder="开始时间">
        </el-time-picker>
        -
        <el-time-picker
            arrow-control
            v-model="endTime"
            class="unfinish-time-input"
            size="mini"
            placeholder="结束时间">
        </el-time-picker>
        <el-card class="box-card">
            <div v-for="(work, index) in unfinishWork" :key="index" class="text item one-work">
                <p class="finish-main">
                    <span>任务名称：</span>
                    <span v-text="work.name"></span>
                </p>
                <p class="finish-extend">
                    <span>任务时间：</span>
                    <span>{{ work.startTime + '-' + work.endTime }}</span>
                </p>
                <el-button type="danger" class="delete-work" size="mini" icon="el-icon-delete" circle></el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startTime: '',
            endTime: '',
            unfinishWork: [{
                name: '111',
                startTime: '12:23:23',
                endTime: '12:23:44'
            },{
                name: '111',
                startTime: '12:23:23',
                endTime: '12:23:44'
            }, {
                name: '111',
                startTime: '12:23:23',
                endTime: '12:23:44'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.unfinish-time-input {
    width: 40%;
}
.box-card {
    margin: 10px 20px;
}
.one-work {
    margin-bottom: 8px;
    position: relative;
    .finish-main {
        color: #606266;
        font-size: 14px;
        margin-bottom: 0px;
    }
    .finish-extend {
        color: #909399;
        font-size: 12px;
        margin-top: 0px;
    }
    .delete-work {
        position: absolute;
        top: 0px;
        right: 0px;
    }
}
</style>

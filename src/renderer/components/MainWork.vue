<template>
    <div>
        活动名称
        <el-input v-model="name" size="small"></el-input>
        细节内容
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="content">
        </el-input>
        <el-button type="primary" @click="addNewWork()">成功按钮</el-button>
    </div>
</template>

<script>
let ID = 0;

export default {
    data() {
        return {
            startTime: '',
            content: ''
        }
    },
    methods: {
        addNewWork() {
            this.$store.commit('addNewWork', {
                workName: this.workName,
                content: this.content,
                id: ID
            });
            ID++;
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

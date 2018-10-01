<template>
    <div class="eye-protection">
        <el-switch
            v-model="enable"
            active-color="#409EFF"
            active-text="打开"
            @change="switchChange"
            inactive-color="#909399">
        </el-switch>
        <el-input-number v-model="last" :step="5" @change="changeValue"></el-input-number>
        <el-input-number v-model="duration" :step="1" @change="changeValue"></el-input-number>
        <el-button type="primary" @click="confirm()">确认</el-button>
    </div>
</template>

<script>
let worker = null;

export default {
    data() {
        return {
            enable: false,
            last: 45,
            duration: 3
        };
    },
    methods: {
        changeValue() {},
        switchChange(val) {

        },
        confirm() {
            worker.postMessage({
                enable: true,
                time: 0.1
            });
        }
    },
    mounted () {
        worker = new Worker('/src/renderer/assets/eyeWorker.js');

        worker.onmessage = function(e) {
            if (e.data) {
                alert();
            }
        };
    }
}
</script>


<style lang="scss" scoped>
.eye-protection {
    padding: 20px;
}
</style>

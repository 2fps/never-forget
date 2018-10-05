<template>
    <div class="eye-protection">
        <el-switch
            v-model="enable"
            active-color="#409EFF"
            active-text="开关"
            @change="switchChange"
            inactive-color="#909399">
        </el-switch>
        <p>
            <span>间隔时间：</span>
            <el-input-number v-model="last" :step="5" @change="changeValue"></el-input-number>
        </p>
        <!-- <el-input-number v-model="duration" :step="1" @change="changeValue"></el-input-number> -->
        <el-button type="primary" @click="confirm()">确认</el-button>
    </div>
</template>

<script>
const ipc = require('electron').ipcRenderer;
let worker = null,
    me = null;

export default {
    data() {
        return {
            enable: false,
            last: 45,
            duration: 1
        };
    },
    methods: {
        changeValue() {},
        switchChange(val) {

        },
        confirm() {
            worker.postMessage({
                enable: this.enable,
                time: this.last * 60
            });
        }
    },
    mounted () {
        me = this;
        worker = new Worker('/src/renderer/assets/eyeWorker.js');

        worker.onmessage = function(e) {
            debugger;
            if (e.data > 0) {
                // 开启弹窗提示，要有眼保了
            } else {
                // 0秒，开启眼保
                ipc.send('eyeProtection-start', me.duration * 60);
            }
        };

        ipc.on('eyeProtection-restart', (e) => {
            me.confirm();
        });
    }
}
</script>


<style lang="scss" scoped>
.eye-protection {
    padding: 40px;
    & > p {
        margin: 20px 0;
    }
}
</style>

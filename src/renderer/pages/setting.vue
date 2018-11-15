<template>
    <div class="setting-box">
        <el-tabs>
            <el-tab-pane label="设置">
                <div>
                    <el-checkbox v-model="tray">关闭时最小化到托盘</el-checkbox>
                </div>
                <div class="bottom-btn">
                    <el-button type="primary" @click="confirmSetting">保存</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="聊天机器人">
                <div>
                    <div class="form-row">
                        <p>apiKey:</p>
                        <el-input
                            v-model="newApiKey"
                            :placeholder="oldApiKey"
                            size="small">
                        </el-input>
                    </div>
                    <el-button type="primary" @click="confirmRobot">保存</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <audio controls autoplay></audio>
    </div>
</template>

<script>
var recorder;
var audio = document.querySelector('audio');
import settingMemo from './settingMemo';

export default {
    components: {
        settingMemo
    },
    data() {
        return {
            tray: false,        // 关闭时是否最小化到托盘
            inheritWork: false, // 第二天是否显示前一天未完成的任务
            newApiKey: '',      // 用户自己有apikey的，请自己添加
            oldApiKey: ''
        };
    },
    methods: {
        // 保存设置的配置
        confirmSetting() {
            this.$store.commit('saveTray', this.tray);
        },
        confirmMemo() {
            
        },
        confirmRobot() {
            this.$store.commit('setApi', this.newApiKey);
        },
        // 获取老的apikey显示成placeholder
        getRobotOldApiKey() {
            this.$store.commit('getApi');
            this.oldApiKey = this.$store.state.robot.apikey;
            this.newApiKey = this.oldApiKey;
        }
    },
    mounted() {
        this.$store.commit('getAllConfig');
        this.tray = this.$store.state.setting.all.alwaysTray;
    },
    created() {
        this.getRobotOldApiKey();
    }
};
</script>


<style lang="scss" scoped>
.setting-box {
    margin: 10px 40px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
}
.bottom-btn {
    margin-top: 100px;
}
.form-row {
    margin-bottom: 20px;
    & > p {
        margin-bottom: 10px;
    }
}
</style>

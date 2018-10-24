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
        </el-tabs>
<!--         <el-tabs>
            <el-tab-pane label="备忘录">
                <div>
                    <el-checkbox v-model="inheritWork">第二天默认显示前一天未完成的</el-checkbox>
                    <el-button type="primary" @click="confirmMemo">保存</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-tabs>
            <el-tab-pane label="聊天机器人">
                <div>
                    <div class="form-row">
                        <p>apiKey:</p>
                        <el-input
                            v-model="apiKey"
                            placeholder="36bff4dc43fe4f10af5d4501a32875bb"
                            size="small">
                        </el-input>
                    </div>
                    <el-button type="primary" @click="confirmRobot">保存</el-button>
                </div>
            </el-tab-pane>
        </el-tabs> -->
        <audio controls autoplay></audio>
    </div>
</template>

<script>
import settingMemo from './settingMemo';

export default {
    components: {
        settingMemo
    },
    data() {
        return {
            tray: false,        // 关闭时是否最小化到托盘
            inheritWork: false, // 第二天是否显示前一天未完成的任务
            apiKey: '36bff4dc43fe4f10af5d4501a32875bb'  // 俺的，用户有的，请自己添加
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
            
        }
    },
    mounted() {
        this.$store.commit('getAllConfig');
        this.tray = this.$store.state.setting.all.alwaysTray;
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

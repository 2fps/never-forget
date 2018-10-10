<template>
    <div class="setting-box">
        <el-tabs>
            <el-tab-pane label="设置">
                <div>
                    <el-checkbox v-model="tray">关闭时最小化到托盘</el-checkbox>
                </div>
                <div class="bottom-btn">
                    <el-button type="primary" @click="confirm">保存</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
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
            tray: true
        };
    },
    methods: {
        confirm() {
            this.$store.commit('saveTray', this.tray);
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
    margin: 10px 20px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
}
.bottom-btn {
    margin-top: 100px;
}
</style>

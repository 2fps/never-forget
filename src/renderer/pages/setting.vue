<template>
    <div class="setting-box">
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane label="设置">
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import settingMemo from './settingMemo';

export default {
    components: {
        settingMemo
    }
};
</script>


<style lang="scss" scoped>
.setting-box {
    padding: 10px 20px;
}
</style>

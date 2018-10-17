<template>
    <div>
        <div class="content-box">
            <div class="content-msg-box" ref="messageInfo" v-for="(mg, index) in talk" :key="index">
                <p :class="[
                mg.beloneTo + '-msg'
                ]">
                {{ mg.content }}
                </p>
            </div>
        </div>
        <div class="message-input-box">
            <input type="text" v-model="msg" class="message-input" placeholder="input message here" />
            <button class="message-button" @click="sendToRobot">send</button>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
let info = {
    "reqType": 0,
    "perception": {
            "inputText": {
            "text": ''
        }
    },
    "userInfo": {
        "apiKey": "36bff4dc43fe4f10af5d4501a32875bb",
        "userId": ~~(Math.random() * 99999)
    }
},
    me = null;
export default {
    data () {
        return {
            msg: '',    // 当前用户要问的
            talk: [],   // 所有的聊天记录
            index: 1    // 谈话的id
        }
    },
    methods: {
        sendToRobot () {
            this.talk.push({
                index: this.index,
                content: this.msg,
                beloneTo: 'me'
            });
            ++this.index;
            info.perception.inputText.text = this.msg;
            // 置空
            this.msg = '';

            // 请求配置
            this.$http.post('http://openapi.tuling123.com/openapi/api/v2', qs.stringify(info)).then((info) => {
                let returnMsg = JSON.parse(info.data).results[0].values.text;
                me.talk.push({
                    index: me.index,
                    content: returnMsg,
                    beloneTo: 'robot'
                });
                ++me.index;
            });
        },
        mounted() {
            this.talk.push({
                index: 0,
                content: '1',
                beloneTo: 'robot'
            });
            me = this;
        },
        created () {

        }
    }
}
</script>

<style scoped>
.content-box {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 3em;
    left: 0px;
    padding: 5px;
    overflow: scroll;
}
.content-msg-box {
    overflow:hidden;
    width: 100%;
    margin-bottom: 1em;
}
.content-box p {
    max-width: 60%;
    padding: 5px 10px;
    border-radius: 5px;
    word-break:break-all;
    word-wrap:break-word;
}
.content-box .robot-msg {
    float: left;
    background-color: #67C23A;
}
.content-box .me-msg {
    float: right;
    background-color: #DCDFE6;
}
.message-input-box {
    padding: 5px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    left: 0px;
    height: 2em;
    line-height: 2em;
    border-top: 1px solid #DCDFE6;
    background-color: #EBEEF5;
}
.message-input-box > .message-input {
    position: absolute;
    border: 1px solid #ccc;
    display: inline-block;
    margin: 2px;
    height: 1.5em;
    right: 4.5em;
    left: 0.5px;
    padding: 0px 10px;
    border-radius: 6px;
}
.message-button {
    background-color: #67C23A;
    width: 3.6em;
    height: 1.6em;
    position: absolute;
    top: 0.2em;
    right: 0.2em;
    bottom: 0.2px;
}
</style>

let time = 0,       // 单位秒
    timer = null,   // 定时器
    enable = false; // 功能否开启

onmessage = function (event) {
    var params = event.data,
        enableChange = false,
        timeChange = false;

    // enable检测
    if (params.enable) {
        // 有通知使能，检测是否有改变
        if (enable !== params.enable) {
            enableChange = true;
            enable = params.enable;
        }

    }

    // time检测
    if (params.time) {
        if (time !== params.time) {
            timeChange = true;
            time = params.time;
        }
    }

    changeEnable(enableChange, timeChange);
};

function changeEnable(bEnable, bTime) {
    if (bEnable || bTime) {
        // 使能或时间有改变时，都要开始重新计时
        countdown();
    }
}

// 开始倒计时
function countdown() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(function() {
        postMessage(true);
        timer = null;
    }, time * 60 * 1000);
}
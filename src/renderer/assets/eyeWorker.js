let time = 0,       // 单位秒
    timer = null,   // 定时器
    enable = false, // 功能否开启
    seconds = 0;    // 总体剩余时间

onmessage = function (event) {
    var params = event.data;

    // enable检测
    if (undefined !== params.enable) {
        enable = params.enable;
    }

    // time检测
    if (undefined !== params.time) {
        time = params.time;
        seconds = time;
    }

    if (!enable) {
        clearInterval(timer);
        timer = null;
    } else {
        countdown();
    }
};

// 开始倒计时
function countdown() {
    if (timer) {
        setInterval(timer);
        timer = null;
    }
    // 逐秒走，为1min内的倒计时
    timer = setInterval(function() {
        seconds--;

        if (seconds < 60) {
            // 1min内需要提示有弹窗
            if (0 === seconds) {
                // 该停了。。。
                clearInterval(timer);
                timer = null;
            }
            postMessage(seconds);
        }
    }, 1000);
}
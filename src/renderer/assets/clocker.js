let timer = null,   // 定时器
    enable = false, // 倒计时是否开启
    hour = 0,       // 小时倒计时
    minute = 0,     // 分钟倒计时
    second = 0,     // 秒倒计时

onmessage = function (event) {
    var params = event.data;

    // enable检测
    if (undefined !== params.enable) {
        enable = params.enable;
    }

    if (undefined !== params.hour) {
        hour = params.hour;
    }

    if (undefined !== params.minute) {
        minute = params.minute;
    }

    if (undefined !== params.second) {
        second = params.second;
    }

    countdown();
};


// 开始倒计时
function countdown() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    timer = setInterval(function() {
        let str = '';

        decrease();
        str = pad(hour) + ':' + pad(minute) + '' + pad(second);

        if (0 == hour && 0 == minute && 0 == second) {
            // 结束了
            clearInterval(timer);
            timer = null;
        }

        postMessage(str);
    }, 1000);
}

// 每秒递减
function decrease() {
    second--;

    if (second < 0) {
        second == 60;
        minute--;
        if (minute < 0) {
            minute += 60;
            hour--;
        }
    }
}

// 一位数添加0处理
function pad(val) {
    val += '';
    if (val.length < 2) {
        val = '0' + val;
    }

    return val;
}

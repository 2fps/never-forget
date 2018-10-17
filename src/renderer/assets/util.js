// 时间不足两位数的十位做补零处理
function doubleDigit (val) {
    let str = val + '';
    // 检查长度
    if (str.length < 2) {
        str = '0' + str;
    }

    return str;
}

// 获取当前的年月日
exports.getNowDate = () => {
    let date = new Date(),
        str = '';
    // 时间拼装
    str += date.getFullYear() + '-' + doubleDigit(date.getMonth() + 1) + '-' + doubleDigit(date.getDate());

    return str;
}

function doubleDigit (val) {
    let str = val + '';

    if (str.length < 2) {
        str = '0' + str;
    }

    return str;
}

// 获取当前的年月日
exports.getNowDate = () => {
    let date = new Date(),
        str = '';

    str += date.getFullYear() + '-' + doubleDigit(date.getMonth() + 1) + '-' + doubleDigit(date.getDate());

    return str;
}

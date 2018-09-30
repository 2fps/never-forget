// 保存work数据
let saveWorkData = (data) => {
    let workData = JSON.parse(localStorage.getItem('work') || '{}'),
        dayKey = getToday();

    workData[dayKey] = data;

    localStorage.setItem('work', JSON.stringify(workData));
};

// 获取work数据
let getWorkData = () => {
    let workData = JSON.parse(localStorage.getItem('work') || '{}'),
        dayKey = getToday();

    return workData[dayKey] || {};
};

// 获取当前的年月日
function getToday() {
    let date = new Date(),
        str = '';

    str += date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return str;
}


export default {
    saveWorkData,
    getWorkData
}
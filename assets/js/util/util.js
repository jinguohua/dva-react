import { message } from 'antd';
import { fetch } from 'assets/js/axios/axios';

// 身份证
export function isId(id) {
    return !(/(^\d{17}([0-9]|X)$)/.test(id));
}

// 手机号码
export function isTel(mobile) {
    return !/^1\d{10}$/.test(mobile);
}

// 数字
export function isNumber(number) {
    return !/^\d+(\.\d+)?$/.test(number);
}

// 大于0正整数
export function isToNumber(value) {
    return !/^[1-9]\d*$/.test(value);
}

// 邮箱
export function isEmail(email) {
    return !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email);
}

// url参数截取
export function queryCode(name) {
    let url = window.location.href, name2 = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name2 + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 不重复随机数
export function random() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5);
}

// 根据日期返回对应周
export function getWeek(date) {
    let t;
    if (date === null || typeof date === 'undefined') {
        t = new Date();
    } else {
        let dateArray = date.split('-');
        t = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    return '日一二三四五六'.charAt(t.getDay());
}

// 时间格式化
const timer = {
    timestamp: function () {
        let date = new Date();
        return {
            year: date.getFullYear(),
            month: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            hour: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            minute: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds(),
            week: date.getDay()
        };
    }(),
    ymd: function () {   // 获取当前年月日格式化时间
        return `${timer.timestamp.year}-${timer.timestamp.month}-${timer.timestamp.day}`;
    },
    ym: function () {   // 获取当前年月
        return `${timer.timestamp.year}-${timer.timestamp.month}`;
    },
    hm: function () {   // 获取时分
        return `${timer.timestamp.hour}:${timer.timestamp.minute}`;
    },
    compare(start, end) {
        let startH = new Date(start).getTime(), endH = new Date(end).getTime();
        let time = 0;
        if (startH > endH) {
            time = startH - endH;
        } else {
            time = endH - startH;
        }
        return Math.floor(time / 86400000);
    },
    prevMonth: function (date, c) {
        let [year, month] = date.split('-');
        let year2 = year, month2 = parseInt(month) - 1;
        if (month2 === 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        if (c) {
            return `${year2}-${month2}-01`;
        } else {
            return `${year2}-${month2}`;
        }
    },
    nextMonth: function (date, c) {
        let [year, month] = date.split('-');
        let year2 = year, month2 = parseInt(month) + 1;
        if (month2 === 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        if (c) {
            return `${year2}-${month2}-01`;
        } else {
            return `${year2}-${month2}`;
        }
    }
};

export { timer };

// 上传图片
export function uploadFile(that, options) {
    if (that) {
        options.unload = options.unload || false;
        let files = that.target.files[0];
        if (that.target.files.length > 1) { // 单选
            message.info('只能选择单张图片', 2);
            return false;
        }
        if (files.type.indexOf('image') === -1) {
            message.warning('请上传图片文件', 1);
            that.target.value = '';
            return false;
        }
        if ((files.size / 1024 / 1024) > 20) {
            message.warning('图片应小于20M', 1);
            that.target.value = '';
            return false;
        }
        if (options.before && typeof options.before === 'function') {   // 开始上传之前
            options.before();
        }

        let upFormData = new FormData();   // FormData
        upFormData.append(options.data || 'uploadFile', files);
        that.target.value = '';

        if (options.unload) {   // 是否显示load
            loadStart();
        }

        if (options.complete && typeof options.complete === 'function') {
            options.complete();
        }
        if (options.unload) {
            loadEnd();
        }

        fetch({
            url: options.url || '/crm/ajax/upload/image.html',
            type: 'post',
            data: upFormData
        }).then(response => {
            if (options.success && typeof options.success === 'function') {
                options.success(data);
            }
        }).catch(err => {
            console.log(err);
        });
    }
}

export function aLink(url) {
    url ? location.href = url : null;
}

export function openLink(url) {
    url ? window.open(url) : null;
}

export function isNoGIF(url) {
    return `${url}@!w750m`
}

export function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
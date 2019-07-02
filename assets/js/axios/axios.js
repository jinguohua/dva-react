import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import Address from './../../../location';
import { loadStart, loadEnd } from 'assets/js/ui/index';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // 登录检测
        if (response && response.data) {
            if (response.data.code === 201) {
                location.href = `${Address.path}${Address.originPath}/login.html`;
            }
        } else {
            message.error('服务系统异常')
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    message.error('服务系统异常')
            }
        }
        return Promise.reject(error.response);
    }
);

// 封装请求
export function fetch(options) {
    let opt = options || {};
    let unLoad = opt.unload ? 1 : 0;
    let stringify = opt.stringify || false;
    let data = stringify ? qs.stringify(opt.data || {}) : opt.data,
        params = stringify ? qs.stringify(opt.params || {}) : opt.params;

    let headers = Object.assign({}, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, opt.headers || {});
    unLoad ? loadStart() : null;

    return new Promise((resolve, reject) => {

        axios({
            method: opt.type || 'post',
            url: options.url,
            data,
            params,
            responseType: opt.dataType || 'json',
            // 设置默认请求头
            headers: headers,
            baseURL: ''
        }).then(response => {
            resolve(response.data);
            unLoad ? loadEnd() : null;
        }).catch(err => {
            reject(err);
            unLoad ? loadEnd() : null;
        });

    });
    
}

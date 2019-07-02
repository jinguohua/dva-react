import Address from '../../../../location'
import { fetch } from './../../../../assets/js/axios/axios';

/**
 @method   获取令牌 调试
 @return   {json}
 */

export function getToken(data, callback) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/ajax/authorize/getToken.html',
        type: 'post',
        data,
        // stringify: true,
    }).then(response => {
        callback(response);
    }).catch(err => {
        callback({ message: err.statusText || '服务系统异常' });
    });
}

/**
 @method   dispatchLogin
 @return   {json}
 */

export function dispatchLogin(data, callback) {
    return fetch({
        unload: true,
        stringify: true,
        url: Address.ajaxPath + '/ajax/login/submit.html',
        type: 'post',
        data: data,
    }).then(response => {
        callback(response);
    }).catch(err => {
        callback({ message: err.statusText || '服务系统异常' });
    });
}

/**
 * 获取内容ID
 * @param data.url 跳转路径
 * @param data.token 当前登录人token
 * @return {json}
 */
export function dispatchAuthorize(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/teop/authorize/login.html',
        type: 'post',
        data: data,
        stringify: true,
    });
}

/**
 @method   getHomeMenus
 @return   {json}
 */
export function getHomeMenus(data, callback) {
    return fetch({
        unload: false,
        url: Address.ajaxPath + '/ajax/common/home/menus.html',
        type: 'post',
        data: data
    }).then(response => {
        callback(response);
    }).catch(err => {
        callback({ message: err.statusText || '服务系统异常' });
    });
}

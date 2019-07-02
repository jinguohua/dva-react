import Address from '@base/location';
import {fetch} from 'assets/js/axios/axios';

/**
 @method   queryCities 查询城市
 @return   {json}
 */

export function queryCities(data,callback) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/ajax/groupon/cities.html',
        type: 'post',
        stringify: true,
        data
    }).then(response => {
        callback(response);
    }).catch(err => {
        callback({message: err.statusText || '服务系统异常'});
    });
}

/**
 @method   queryBds 查询BD
 @return   {json}
 */

export function queryBds(data,callback) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/ajax/groupon/bds.html',
        type: 'post',
        stringify: true,
        data
    }).then(response => {
        callback(response);
    }).catch(err => {
        callback({message: err.statusText || '服务系统异常'});
    });
}

import Address from '../../../../location'
import { fetch } from './../../../../assets/js/axios/axios';

/**
 @method   dispatchLoginOut
 @return   {json}
 */

export function dispatchLoginOut(data, callback) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/ajax/logout.html',
        type: 'post',
        data: data,
    }).then(response => {
        callback(response);
    }).catch(err => {
        callback({ message: err.statusText || '服务系统异常' });
    });
}


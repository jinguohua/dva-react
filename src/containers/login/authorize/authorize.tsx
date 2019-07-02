import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './authorize.less';
import { queryCode } from '../../../../assets/js/util/util';
import Address from './../../../../location';
import { message } from 'antd';
import { dispatchAuthorize } from '../action/action';

function Authorize(props) {
    const [token] = useState(queryCode('token'));
    const [url] = useState(queryCode('url'));
    function authorize() {
        dispatchAuthorize({ token, menu: '' }).then((res) => {
            let accountInfo = res.data;
            if (res.code !== 200) {
                handleAuthorizeFail();
            } else {
                // 设置用户信息
                localStorage.setItem('userName', accountInfo.nickName || '');
                sessionStorage.setItem('accountInfo', JSON.stringify(Object.assign({}, res.data)));
                url && props.history.push(url);
            }
        });
    }

    useEffect(() => {
        authorize();
    }, [url]);

    function handleAuthorizeFail() {
        message.error('授权失败,请重新授权', 2, () => {
            location.href = `${Address.path}${Address.originPath}/login.html`;
        });
    };

    return (
        <div className="authorize-container" >
        </div>
    );

}

export default withRouter(Authorize);

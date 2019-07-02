import React from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
// import { dispatchLogin, dispatchAuthorize, getHomeMenus } from '../action/action';
import './login.less';
// import { queryCode } from './../../../../assets/js/util/util';

// @withRouter
class UserLogin extends React.Component<any, any>{
    state = {
        username: '',
        password: ''
    }
    // 确认登录
    handleSubmitLogin = () => {
        const { username, password } = this.state;
        if (!username) {
            message.warn('请填写帐号', 1.5);
            return false;
        }
        if (!password) {
            message.warn('请填写密码', 1.5);
            return false;
        }
        //const data = { username: 'admin', password: 'a123456789', rememberMe: true };
        // return dispatchLogin(data, (res) => {
        //     if (res.code === 200) {
        //         dispatchAuthorize({ token: '585d2f5444a6d4e11fe70b81c20aa584fd023ff6ab96c8a5f29ebe509b5f3f5d61c8ffee7ecec673b50feba561674972' }).then((authorizeRes) => {
        //             let accountInfo = authorizeRes.data;
        //             if (authorizeRes.code === 200) {
        //                 // 设置用户信息
        //                 localStorage.setItem('userName', accountInfo.nickName || '');
        //                 // 菜单信息
        //                 getHomeMenus({}, (menuRes) => {
        //                     sessionStorage.setItem('accountInfo', JSON.stringify(Object.assign({}, menuRes.data)));
        //                     queryCode('url') ? this.props.history.push(`${queryCode('url')}`) : this.props.history.push('/ops/p/shopcard/list');
        //                 });
        //             } else {
        //                 message.warn(authorizeRes.message, 1.2);
        //             }
        //         });
        //     } else {
        //         message.warn(res.message, 1.2);
        //     }
        // });
        if (username === 'admin' && password === 'a123456789') {
            localStorage.setItem('userName', username);
            return this.props.history.push('/rms/usermanagement')
        } else {
            return message.warn('账号密码不正确！')
        }
    };
    render() {
        const { username, password } = this.state;
        return (
            <div className="login-container">
                <div className="login-bg">&nbsp;</div>
                <div className="login-header">
                    <h1 className="title">
                        <span className="logo">彩贝壳</span>
                        <span className="crm">RMS</span>
                    </h1>
                    <p className="subTitle">© caibeike.com</p>
                </div>
                <div className="login-content">
                    <div className="login-signup-fields">
                        <div className="item-fields">
                            <span className="item-fields-label name">&nbsp;</span>
                            <input className="item-fields-input"
                                value={username}
                                autoComplete="no"
                                onChange={(e) => this.setState({ username: e.target.value })}
                                type="text"
                                placeholder="帐号" />
                        </div>
                        <div className="item-fields">
                            <span className="item-fields-label password">&nbsp;</span>
                            <input className="item-fields-input"
                                value={password}
                                autoComplete="no"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                type="password"
                                placeholder="密码" />
                        </div>
                        <div className="tips">忘记密码请联系管理员</div>
                        <div className="item-submit">
                            <button onClick={this.handleSubmitLogin} className="submit">登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(UserLogin);

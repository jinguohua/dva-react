import React from 'react';
import { Route } from 'react-router-dom';
import { random } from './../../../assets/js/util/util'
import Header from './header/header';
// import Address from './../../../location';
import Siderbar from './siderbar/siderbar';
import './index.less';
import './reset_antd.less';

export default function Index(props) {
    // let [accountInfo, setAccountInfo] = useState([]);
    //
    // useEffect(() => {
    //     accountInfo = sessionStorage.getItem('accountInfo') ? JSON.parse(sessionStorage.getItem('accountInfo')) : [];
    //     if (!sessionStorage.getItem('accountInfo') || !accountInfo || !accountInfo.leftMenus || !accountInfo.leftMenus.length) {
    //         location.href = `${Address.path}/login.html`;
    //     } else {
    //         accountInfo ? setAccountInfo() : message.error('授权失败', 2, () => {
    //             location.href = `${Address.path}/login.html`;
    //         });
    //     }
    // }, []);

    return (
        <div className="ops-body">
            <div className="ops-header">
                <Header history={props.history} />
            </div>
            <div className="ops-main">
                <div className="ops-nav">
                    <Siderbar />
                </div>
                <div className="ops-container">
                    {props.routes.map((route) => (
                        <Route
                            key={random()}
                            path={route.path}
                            exact={route.exact}
                            render={() => (
                                <route.component {...props.routes} routes={route.routes} />
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



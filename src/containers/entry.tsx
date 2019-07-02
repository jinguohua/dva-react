import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// 容器
import { LoginRoutes } from './login/routes/index'
import { AppRoutes } from './app/routes/index'

const routes = [
    ...LoginRoutes,
    ...AppRoutes
];

// 最外层容器组件
export default function EntryApp() {
    return (
        <Router>
            <Switch>
                {routes.map((route: any, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <route.component {...props} routes={route.routes} />
                        )}
                    />
                ))}
            </Switch>
        </Router>
    )
}

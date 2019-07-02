import React from 'react';
import { Route } from 'react-router-dom';

export default function Users(props) {
    return (
        <div>
            {
                props.routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <route.component {...props} routes={route.routes} />
                        )}
                    />
                ))
            }
        </div>
    )
}


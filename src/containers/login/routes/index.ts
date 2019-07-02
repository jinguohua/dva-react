import Loadable from 'react-loadable';
import { Loading } from './../../../components/loading/index.js';

export const LoginRoutes = [
    {
        path: '/rms/login',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmslogin' */'./../login/login'),
            loading: Loading,
            timeout: 10000
        })
    },
    {
        path: '/rms/authorize',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsauthorize' */'./../authorize/authorize'),
            loading: Loading,
            timeout: 10000
        })
    }
];


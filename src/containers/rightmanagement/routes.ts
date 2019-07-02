import Loadable from 'react-loadable';
import { Loading } from '../../components/loading/index';

export const oputilRoutes = [
    /**
     * 用户管理列表
     */
    {
        path: '/rms/usermanagement',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsusermanagement' */'./usermanagement/index'),
            loading: Loading,
            timeout: 10000
        })
    },
    /**
     * 角色管理列表
     */
    {
        path: '/rms/rolemanagement',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsrolemanagement' */'./rolemanagement/index'),
            loading: Loading,
            timeout: 10000
        })
    },
    /**
     * 权限管理列表
     */
    {
        path: '/rms/authmanagement',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsauthmanagement' */'./rightmanagement/index'),
            loading: Loading,
            timeout: 10000
        })
    },
    /**
     * 查看用户角色列表
     */
    {
        path: '/rms/userrole',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsuserrole' */'./usermanagement/userrole/index'),
            loading: Loading,
            timeout: 10000
        })
    },
    /**
     * 查看用户权限列表
     */
    {
        path: '/rms/userright',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsuserright' */'./usermanagement/userright/index'),
            loading: Loading,
            timeout: 10000
        })
    },
    /**
     * 在角色管理中 查看用户
     */
    {
        path: '/rms/roleuser',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsroleuser' */'./rolemanagement/roleuser/index'),
            loading: Loading,
            timeout: 10000
        })
    },
    /**
     * 在角色管理中 查看权限
     */
    {
        path: '/rms/roleright',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: 'rmsroleright' */'./rolemanagement/roleright/index'),
            loading: Loading,
            timeout: 10000
        })
    },
];

import React from 'react';
import PBreadcrumb from '../../../components/breadcrumb';
import { userBreadcrumb } from '../const';
import UserManagement from './usermanage/index';
import './index.less';

class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <PBreadcrumb list={userBreadcrumb} />
                <UserManagement />
            </div>
        )
    }
}
export default UserInfo
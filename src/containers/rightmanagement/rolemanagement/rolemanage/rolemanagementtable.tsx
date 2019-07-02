import React from 'react';
import { Table, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
class RoleManagementTable extends React.Component<any, any> {
    render() {
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
                render: (text, record) => {
                    return (
                        <div>
                            <a onClick={() => this.props.editRoleInfo(record)}>{text}</a>
                        </div>
                    )
                }
            },
            {
                title: '角色key',
                dataIndex: 'roleKey',
                key: 'roleKey',
            },
            {
                title: '角色描述',
                dataIndex: 'roleDesc',
                key: 'roleDesc',
            },
            {
                title: '所属系统',
                dataIndex: 'systemDes',
                key: 'systemDes',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    return (
                        <div>
                            <a onClick={() => this.props.history.push({ pathname: '/rms/roleuser', state: record })}>查看用户</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.props.history.push({ pathname: '/rms/roleright', state: record })}>查看/添加权限</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.props.deleteRoleInfo([record.id])}>删除</a>
                        </div>
                    )
                }
            },
        ];
        let { dataSource, rowSelection, pagination } = this.props;
        return (
            <div className='rms-row-margin'>
                <Table
                    columns={columns}
                    pagination={pagination}
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                    size="small"
                />
            </div>
        )
    }
}
export default withRouter(RoleManagementTable) 
import React from 'react';
import { Table, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
class ManagementTable extends React.Component<any, any> {
    render() {
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'ID',
            },
            {
                title: '用户名称',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text) => !text ? '可用' : '禁用'
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    return (
                        <div>
                            {record.status
                                ? '--'
                                : <span><a onClick={() => this.props.history.push({ pathname: '/rms/userrole', state: record })}>查看角色</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => this.props.history.push({ pathname: '/rms/userright', state: record })}>查看权限</a>
                                </span>
                            }

                        </div>
                    )
                }
            },
        ];
        const { dataSource, pagination } = this.props;
        return (
            <div className='rms-row-margin'>
                <Table
                    columns={columns}
                    pagination={pagination}
                    dataSource={dataSource}
                    size="small"
                />
            </div>
        )
    }
}
export default withRouter(ManagementTable) 
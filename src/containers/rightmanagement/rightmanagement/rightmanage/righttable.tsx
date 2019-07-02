import React from 'react';
import { Table, Divider } from 'antd';
import ShowRightModal from './showRightModal';
import { withRouter } from 'react-router-dom';
import { resTypeObj } from '../../const';
function RightTable(props) {
    const columns = [
        {
            title: '权限名称',
            dataIndex: 'resName',
            key: 'resName',
            render: (text, record) => {
                return <a onClick={() => {
                    props.editResInfo(record)
                }}>{text}</a>
            }
        },
        {
            title: '权限key',
            dataIndex: 'resKey',
            key: 'resKey',
        },
        {
            title: '权限url',
            dataIndex: 'resUrl',
            key: 'resUrl',
        },
        {
            title: '父权限',
            dataIndex: 'parentName',
            key: 'parentName',
            render: (text) => text || '--'
        },
        {
            title: '所属系统',
            dataIndex: 'systemDes',
            key: 'systemDes',
        },
        {
            title: '权限级别',
            dataIndex: 'resLevel',
            key: 'resLevel',
            render: (text) => resTypeObj[text]
        },
        {
            title: '权限类型',
            dataIndex: 'resType',
            key: 'resType',
            render: (text) => {
                if (text === 1) {
                    return '菜单'
                } else if (text === 2) {
                    return '页面'
                } else {
                    return '按钮'
                }
            }
        },
        {
            title: '权限Icon',
            dataIndex: 'resIcon',
            key: 'resIcon',
        },
        {
            title: '排序',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: '权限描述',
            dataIndex: 'resDesc',
            key: 'resDesc',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        {(record.isChildHave === 1)
                            && <span>
                                <ShowRightModal
                                    record={record}
                                    refreshData={() => {
                                        props.refreshData()
                                    }
                                    }
                                />
                                <Divider type="vertical" />
                            </span>
                        }
                        <a onClick={() => props.deleteResInfo([record.id])}>删除</a>
                    </div>
                )
            }
        },
    ];
    let { dataSource, rowSelection, pagination } = props;
    return (
        <div style={{ marginTop: '10px' }}>
            <Table
                columns={columns}
                pagination={pagination}
                dataSource={dataSource}
                rowSelection={rowSelection}
                size="small"
                bordered
            />
        </div>
    )
}
export default withRouter(RightTable) 
import React from 'react';
import { Row, Col, Input, Select, message, Modal, Button } from 'antd';
import RoleManagementTable from './rolemanage/rolemanagementtable';
import AddRoleModal from './rolemanage/addrolemodal';
import PBreadcrumb from '../../../components/breadcrumb';
import { roleBreadcrumb, systemOption } from '../const';
import { Trim } from './../../../../assets/js/util/util';
import './index.less';
//action
import {
    queryRoleList,
    roleAddOrUpdate,
    roleDeleteById
} from './../action/action';

class RoleInfo extends React.Component<any, any>{
    state = {
        roleKey: '',
        roleName: '',
        system: '',
        dataSource: [],
        total: 0,
        limit: 10,
        roleDesc: '',
        record: {},
        current: 1,
        visible: false,
        selectedRowKeys: []
    }

    /**
     * 删除操作
     */
    deleteRoleInfo = (data) => {
        Modal.confirm({
            title: '角色可能存在关联用户与权限，是否确认删除？',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                roleDeleteById({ roleIds: JSON.stringify(data) }).then(res => {
                    if (res.code === 200) {
                        message.success(res.message)
                        this.queryRoleListAction()
                    } else {
                        message.warn(res.message)
                    }
                })
            }
        });
    }

    /**
     * getFormConfirmData
     */
    getFormConfirmData = (value) => {
        const { record }: any = this.state;
        value.ID = record.id;
        roleAddOrUpdate(value).then(res => {
            res.code === 200
                ? message.success(res.message,
                    () => {
                        this.setState({ visible: false },
                            () => this.queryRoleListAction())
                    })
                : message.warn(res.message)
        })
    }

    /**
     * 渲染条件搜索
     */
    renderSearchBar = () => {
        const { roleKey, roleName, system, record, visible } = this.state;
        return (
            <div>
                <Row>
                    <Col span={2} className='rms-col-padding'>
                        角色Key
                    </Col>
                    <Col span={3}>
                        <Input
                            value={roleKey}
                            onChange={e => this.setState({ roleKey: e.target.value })}
                            onKeyUp={e => e.keyCode === 13 && this.setState({ current: 1 }, () => this.queryRoleListAction())}
                        />
                    </Col>
                    <Col span={2} offset={1} className='rms-col-padding'>
                        角色名称
                    </Col>
                    <Col span={3}>
                        <Input
                            value={roleName}
                            onChange={e => this.setState({ roleName: e.target.value })}
                            onKeyUp={e => e.keyCode === 13 && this.setState({ current: 1 }, () => this.queryRoleListAction())}
                        />
                    </Col>
                    <Col span={1} offset={1} className='rms-col-padding'>
                        系统
                    </Col>
                    <Col span={3}>
                        <Select
                            value={system}
                            onChange={
                                e => this.setState({ system: e, current: 1 },
                                    () => this.queryRoleListAction())}
                            style={{ width: '100%' }}>
                            {systemOption.map(item =>
                                <Select.Option
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                </Select.Option>)}
                        </Select>
                    </Col>
                    <Col span={7} offset={1}>
                        {/* <Button style={{ marginRight: '10px' }} onClick={() => this.queryRoleListAction()} >搜索</Button> */}
                        <AddRoleModal
                            record={record}
                            visible={visible}
                            toggleModalShow={(visible) =>
                                this.setState({ visible, record: {} })
                            }
                            getFormConfirmData={this.getFormConfirmData}
                        />
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => this.setState({ current: 1 }, () => this.queryRoleListAction())}>
                            搜索
                        </Button>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={
                                () => this.setState({ roleKey: '', roleName: '', system: '', current: 1 },
                                    () => this.queryRoleListAction())}>重置
                        </Button>
                    </Col>
                </Row>
            </div >
        )
    }

    /**
     * 查询列表 queryRoleList
     */
    queryRoleListAction = () => {
        const { roleKey, roleName, system, current, limit } = this.state, offset = (current - 1) * limit;
        queryRoleList({ roleKey: Trim(roleKey), roleName: Trim(roleName), system, offset, limit }).then(res => {
            const result = res.data && res.data.result.map(item => Object.assign({}, item, { key: item.id }))
            res.code === 200 ? this.setState({ dataSource: result || [], total: res.data.total }) : message.warn(res.message)
        })
    }

    componentDidMount() {
        this.queryRoleListAction()
    }

    render() {
        const { dataSource, current, total, limit } = this.state;
        const pagination = {
            current,
            total,
            pageSize: limit,
            onChange: (current) => {
                this.setState({ current },
                    () => this.queryRoleListAction())
            }
        };
        return (
            <div>
                <PBreadcrumb list={roleBreadcrumb} />
                {this.renderSearchBar()}
                <RoleManagementTable
                    dataSource={dataSource}
                    pagination={pagination}
                    // rowSelection={rowSelection}
                    deleteRoleInfo={this.deleteRoleInfo}
                    editRoleInfo={(record) => { this.setState({ record, visible: true }) }}
                />
            </div>)
    }
}
export default RoleInfo
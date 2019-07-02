import React from 'react';
import { Table, Row, Col, Input, Select, message, Button } from 'antd';
import PBreadcrumb from '../../../../components/breadcrumb';
import { withRouter } from 'react-router-dom';
import { userRoleBreadcrumb, systemOption } from '../../const';
import { Trim } from '../../../../../assets/js/util/util';
import './../../index.less';
//action
import {
    accountRoleList,
    modifyByAccountId
} from '../../action/action';
class AddUserRoleModel extends React.Component<any, any> {
    state = {
        acccountId: '',
        roleKey: '',
        system: '',
        limit: 8,
        total: 0,
        roleName: '',
        record: {},
        current: 1,
        dataSource: [],
        unSelectRoleIds: [],
        selectedRowKeys: []
    }

    /**
     * 查询用户角色信息
     */
    accountRoleListAction = () => {
        let { limit, current, roleKey, system, roleName, record }: any = this.state, offset = (current - 1) * limit;
        accountRoleList({ limit, offset, userId: record.userId, roleKey: Trim(roleKey), system, roleName: Trim(roleName) }).then(res => {
            let selectArr: any = [];
            let result = res.data && res.data.result.map((item): any => {
                item.isHave && selectArr.push(item.id)
                return Object.assign({}, item, { key: item.id })
            })
            res.code === 200 ? this.setState({ dataSource: result || [], selectedRowKeys: selectArr, total: res.data.total }) : message.warn(res.message)
        })
    }

    /**
     * 添加角色
     */
    handleOkAddRole = (data: any) => {
        const { record, selectedRowKeys }: any = this.state;
        modifyByAccountId({ userId: record.userId, system: data.system, roleId: data.id }).then(res => {
            if (res.code === 200) {
                message.success(res.message)
            } else {
                selectedRowKeys.push(data.key)
                this.setState({ selectedRowKeys }, () => {
                    message.warn(res.message)
                })
            }
        })
    }

    /**
     * 渲染 搜索条件
     */
    renderSearchBar = () => {
        const { roleName, roleKey, system, record }: any = this.state;
        return (
            <div >
                <PBreadcrumb list={userRoleBreadcrumb} />
                <Row style={{ marginBottom: '10px' }}>
                    <Col span={2} className='rms-col-padding'>用户名称</Col>
                    <Col span={2} className='rms-col-padding'>
                        {record.userName}
                    </Col>
                </Row>
                <Row>
                    <Col span={2} className='rms-col-padding'>角色名称</Col>
                    <Col span={3}>
                        <Input
                            value={roleName}
                            onChange={(e) => { this.setState({ roleName: e.target.value }) }}
                            onKeyUp={e => { e.keyCode === 13 && this.setState({ current: 1 }, () => this.accountRoleListAction()) }}
                        />
                    </Col>
                    <Col span={2} offset={1} className='rms-col-padding'>角色key</Col>
                    <Col span={3}>
                        <Input
                            value={roleKey}
                            onChange={(e) => { this.setState({ roleKey: e.target.value }) }}
                            onKeyUp={e => { e.keyCode === 13 && this.setState({ current: 1 }, () => this.accountRoleListAction()) }}
                        />
                    </Col>
                    <Col span={2} offset={1} className='rms-col-padding'>所属系统</Col>
                    <Col span={3}>
                        <Select
                            value={system}
                            onChange={
                                (e) => {
                                    this.setState({ system: e, current: 1 },
                                        () => { this.accountRoleListAction() })
                                }}
                            style={{ width: '100%' }} >
                            {systemOption.map(item =>
                                <Select.Option
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                </Select.Option>)}
                        </Select>
                    </Col>
                    <Col span={2} offset={1}>
                        <Button
                            type='primary'
                            onClick={
                                () => this.setState({ current: 1 },
                                    () => this.accountRoleListAction())
                            }>搜索</Button>
                    </Col>
                    <Col span={2} style={{ marginLeft: '10px' }} >
                        <Button onClick={
                            () => this.setState({ roleName: '', system: '', roleKey: '', current: 1 },
                                () => this.accountRoleListAction())}>
                            重置
                        </Button>
                    </Col>
                </Row>
            </div >
        )
    }

    /**
     * 渲染弹窗
     */
    renderModel = () => {
        const { dataSource, current, total, limit, selectedRowKeys } = this.state;
        const pagination = {
            current,
            total,
            pageSize: limit,
            onChange: (current) => {
                this.setState({ current }, () => this.accountRoleListAction())
            }
        };
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
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
        ];
        const rowSelection = {
            selectedRowKeys,
            hideDefaultSelections: true,
            columnTitle: () => {
                return <div />
            },
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys })
            },
            onSelect: (record, selected, selectedRows) => {
                this.handleOkAddRole(record)
            },
        };
        return (
            <div
                className='rms-row-margin'
            >
                <Table
                    size="small"
                    pagination={pagination}
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={dataSource} />
            </div>
        )
    }

    /**
    * 初始化数据
    */
    initData = () => {
        const { state } = this.props.location;
        this.setState({ record: state }, () => this.accountRoleListAction())
    }

    componentDidMount() {
        this.initData()
    }

    render() {
        return (
            < div >
                {this.renderSearchBar()}
                {this.renderModel()}
            </div >
        )
    }
}
export default withRouter(AddUserRoleModel)
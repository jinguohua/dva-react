import React from 'react';
import { Row, Col, Input, Select, message, Modal, Button } from 'antd';
import PBreadcrumb from '../../../components/breadcrumb';
import AddRightModal from './rightmanage/addrightmodal';
import { rightBreadcrumb, systemOption, resOption } from '../const';
import RightTable from './rightmanage/righttable';
import { Trim } from './../../../../assets/js/util/util';
import './index.less';

//action
import {
    addRightRes,
    resListPage,
    deleteResInfo
} from './../action/action';
class RightInfo extends React.Component<any, any> {
    node: any
    state = {
        resKey: '',
        resName: '',
        system: '',
        resId: '',
        resType: '',
        offset: 0,
        limit: 10,
        current: 1,
        dataSource: [],
        total: 0,
        visible: false,
        record: {},
    }
    /**
     * 获取新增权限数据
     */
    getFormConfirmData = (value) => {
        const { record }: any = this.state;
        value.ID = record.id;
        addRightRes(value).then(res => {
            if (res.code === 200) {
                this.resListPageAction()
                this.setState({ visible: false })
            }
            else {
                message.success(res.message)
            }
        })
    }

    /**
     * 查询权限列表
     */
    resListPageAction = () => {
        let { resKey, resName, system, resId, resType, offset, limit, current
        }: any = this.state, { resTypeChildren, record } = this.props;
        offset = (current - 1) * limit;
        if (record) {
            resId = record.id;
        }
        if (resTypeChildren === 'Children') {
            resType = ''
        }
        resListPage({ resKey: Trim(resKey), resName: Trim(resName), system, parentId: resId, resType, offset, limit }).then(res => {
            let result = res.data && res.data.result.map(item => Object.assign({}, item, { key: item.id }))
            if (res.code === 200) {
                if (resId) {
                    this.setState({ dataSource: result || [], total: res.data.total, resTypeChildren: result.length > 0 && result[0].resType || '' })
                } else {
                    this.setState({ dataSource: result || [], total: res.data.total })
                }
            } else {
                message.warn(res.message)
            }
        })
    }

    /**
     * 删除
     */
    deleteResInfo = (data) => {
        Modal.confirm({
            title: '角色可能存在关联角色与子权限，是否确认删除？',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deleteResInfo({ resIds: JSON.stringify(data) }).then(res => {
                    if (res.code === 200) {
                        message.success(res.message);
                        this.resListPageAction()
                    } else {
                        message.warn(res.message)
                    }
                })
            }
        });
    }

    /**
     * 渲染条件搜索
     */
    renderSearchBar = () => {
        const { resKey, resName, system, resType, visible, record } = this.state;
        return (
            <div>
                <Row>
                    <Col span={2} className='rms-col-padding'>
                        权限Key
                    </Col>
                    <Col span={3}>
                        <Input
                            value={resKey}
                            onChange={e => this.setState({ resKey: e.target.value })}
                            onKeyUp={e => { e.keyCode === 13 && this.setState({ current: 1 }, () => this.resListPageAction()) }}
                        />
                    </Col>
                    <Col span={2} offset={1} className='rms-col-padding'>
                        权限名称
                    </Col>
                    <Col span={3}>
                        <Input
                            value={resName}
                            onChange={e => this.setState({ resName: e.target.value })}
                            onKeyUp={e => { e.keyCode === 13 && this.setState({ current: 1 }, () => this.resListPageAction()) }}
                        />
                    </Col>
                    <Col span={2} offset={1} className='rms-col-padding'>
                        权限类型
                    </Col>
                    <Col span={3}>
                        <Select
                            value={resType}
                            onChange={e => this.setState({ resType: e, current: 1 },
                                () => this.resListPageAction())}
                            style={{ width: '100%' }}>
                            {resOption.map(item =>
                                <Select.Option
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                </Select.Option>)}
                        </Select>
                    </Col>
                    <Col span={1} offset={1} className='rms-col-padding'>
                        系统
                    </Col>
                    <Col span={3}>
                        <Select
                            value={system}
                            onChange={
                                e => this.setState({ system: e, current: 1 },
                                    () => this.resListPageAction())}
                            style={{ width: '100%' }}>
                            {systemOption.map(item =>
                                <Select.Option
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                </Select.Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col
                        style={{ width: '80px' }}
                        span={2}
                        offset={18}>
                        <AddRightModal
                            onRef={(ref) => this.node = ref}
                            visible={visible}
                            record={record}
                            getFormConfirmData={this.getFormConfirmData}
                            toggleRightModle={(visible, record) => this.setState({ visible, record })}
                        />
                    </Col>
                    <Col
                        span={2}
                        style={{ width: '80px' }}
                    >
                        <Button
                            onClick={() => this.setState({ current: 1 }, () => this.resListPageAction())}>
                            搜索
                        </Button>
                    </Col >
                    <Col
                        span={2}
                        style={{ width: '80px' }}
                    >
                        <Button
                            onClick={
                                () => this.setState({ resKey: '', resName: '', resType: '', system: '', current: 1 },
                                    () => this.resListPageAction())}>重置
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        this.resListPageAction()
    }

    render() {
        const { dataSource, current, total, limit } = this.state, { record } = this.props;
        const pagination = {
            current,
            total,
            pageSize: limit,
            onChange: (current) => {
                this.setState({ current },
                    () => this.resListPageAction())
            }
        };
        return (
            <div>
                {!record && <PBreadcrumb list={rightBreadcrumb} />}
                {this.renderSearchBar()}
                <RightTable
                    dataSource={dataSource}
                    pagination={pagination}
                    deleteResInfo={this.deleteResInfo}
                    refreshData={() => { this.resListPageAction() }}
                    record={record}
                    editResInfo={(record) => this.setState({ record, visible: true }, () => {
                        this.node.resParentListAction(record)
                    })}
                />
            </div>
        )
    }
}

export default RightInfo
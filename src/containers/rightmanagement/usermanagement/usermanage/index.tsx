import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import ManagementTable from './managetable';
import { Trim } from './../../../../../assets/js/util/util';
import { connect } from 'dva';
import './../index.less';

//action

class UserManagement extends React.Component {
    state = {
        total: 0,
        limit: 10,
        userName: '',
        status: -1,
        current: 1,
        dataSource: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { userList } = nextProps;
        console.log(userList, 'userList-static');
        if (userList) {
            return {
                dataSource: userList.result,
                total: userList.total
            };
        }
        return null;
    }


    /**
     * 查询列表
     */
    accountListAction = () => {
        let { userName, status, limit, current } = this.state, offset = (current - 1) * limit;
        console.log(this, 'this.props')
        const { dispatch }: any = this.props;
        dispatch({
            type: 'rms/queryAccountList',
            payload: { userName: Trim(userName), status, offset, limit }
        }).then(res => {
            console.log(res, 'resres');

        })
    }

    /**
     * 渲染搜索条
     */
    renderSearchBar = () => {
        const { userName, status } = this.state
        return (
            <div>
                <Row>
                    <Col
                        style={{ width: '60px' }}
                        span={2}
                        className='rms-col-padding'>
                        <label>用户名</label>
                    </Col>
                    <Col span={3}>
                        <Input
                            value={userName}
                            onChange={(e) => this.setState({ userName: e.target.value })}
                            onKeyUp={e => e.keyCode === 13
                                && this.setState({ current: 1 },
                                    () => this.accountListAction())}
                        />
                    </Col>
                    <Col
                        style={{ width: '60px' }}
                        span={2}
                        offset={1}
                        className='rms-col-padding'>
                        <label>状态</label>
                    </Col>
                    <Col span={3}>
                        <Select
                            style={{ width: '100%' }}
                            value={status}
                            onChange={(status) => {
                                this.setState({ status, current: 1 },
                                    () => this.accountListAction())
                            }}>
                            <Select.Option value={-1}>全部状态</Select.Option>
                            <Select.Option value={1}>禁用</Select.Option>
                            <Select.Option value={0}>可用</Select.Option>
                        </Select>
                    </Col>
                    <Col
                        span={2}
                        offset={1}
                        style={{ marginRight: '10px' }}
                    >
                        <Button
                            type='primary'
                            onClick={() => this.setState({ current: 1 }, () => this.accountListAction())}>搜索</Button>
                    </Col>
                    <Col span={2} >
                        <Button onClick={
                            () => this.setState({ userName: '', status: -1, current: 1 },
                                () => this.accountListAction())}>重置</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        this.accountListAction()
    }

    render() {
        const { dataSource, current, total, limit } = this.state;
        const pagination = {
            current,
            total,
            pageSize: limit,
            onChange: (current) => {
                this.setState({ current }, () => this.accountListAction())
            }
        };
        return (
            <div>
                {this.renderSearchBar()}
                <ManagementTable
                    dataSource={dataSource}
                    pagination={pagination}
                />
            </div>
        )
    }
}

function mapStateToProps({ rms: { userList } }: any) {
    console.log(userList, 'connect data')
    return ({ userList })
}
export default connect(mapStateToProps)(UserManagement) 
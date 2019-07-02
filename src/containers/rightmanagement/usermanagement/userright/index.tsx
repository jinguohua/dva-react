import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Select, message } from 'antd';
import PBreadcrumb from '../../../../components/breadcrumb';
import { userRightBreadcrumb, systemOptionNoAll } from '../../const';
import UserRightTree from './userrighttree';
import './../index.less';

//action
import { accountResQueryByAccountId } from '../../action/action'
class UserRight extends React.Component<any, any> {
    state = {
        checkedKeys: [],
        selectedKeys: [],
        system: 'caibeike-tps',
        record: {},
        treeData: []
    }

    /**
     * 渲染顶部搜索栏
     */
    renderSearchBar = () => {
        const { system, record }: any = this.state;
        return (
            <div>
                <Row>
                    <Col
                        span={2}
                        className='rms-col-padding'
                        style={{ width: '58px' }}
                    >
                        用户名</Col>
                    <Col
                        span={2}
                        className='rms-col-padding'
                    >
                        {record.userName}</Col>
                    <Col
                        span={2}
                        className='rms-col-padding'
                        style={{ width: '58px' }}
                    >
                        系统名</Col>
                    <Col span={3}>
                        <Select
                            style={{ width: '100%' }}
                            value={system} onChange={e => {
                                this.setState({ system: e },
                                    () => this.accountRoleQueryByAccountIdAction())
                            }}>
                            {systemOptionNoAll.map(item =>
                                <Select.Option
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                </Select.Option>)}
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }

    /**
     * 请洗数据
     */
    filterTreeData = (data) => {
        let children = [];
        return data.map((item): any => {
            if (item.resources) {
                children = this.filterTreeData(item.resources)
            } else {
                children = []
            }
            return { title: item.resName, key: item.id, children }
        })
    }

    /**
     * 查询展示数据
     */
    accountRoleQueryByAccountIdAction = () => {
        const { record: { userId }, system }: any = this.state;
        accountResQueryByAccountId({ userId, system }).then(res => {
            res.code === 200 ? this.setState({ treeData: this.filterTreeData(res.data && res.data.result || []) }) : message.warn(res.message)
        })
    }

    /**
     * 初始化数据
     */
    initData = () => {
        const { state } = this.props.location;
        this.setState({ record: state }, () => this.accountRoleQueryByAccountIdAction())
    }
    componentDidMount() {
        this.initData()
    }
    render() {
        const { treeData, checkedKeys, selectedKeys } = this.state;
        return (<div>
            <PBreadcrumb list={userRightBreadcrumb} />
            {this.renderSearchBar()}
            <UserRightTree
                checkable={false}
                treeData={treeData}
                checkedKeys={checkedKeys}
                selectedKeys={selectedKeys}
                getSelectedKeys={(selectedKeys) => this.setState({ selectedKeys })}
                getCheckedKeys={(checkedKeys) => this.setState({ checkedKeys })}
            />
        </div>)
    }
}
export default withRouter(UserRight)
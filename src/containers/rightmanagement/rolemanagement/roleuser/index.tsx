import React from 'react';
import { Row, Col, Table, } from 'antd';
import { withRouter } from 'react-router-dom';
import PBreadcrumb from '../../../../components/breadcrumb';
import { roleBreadcrumb } from '../../const';
import './../index.less';

//action
import { accountQueryByRoleId } from '../../action/action';

class UserManagement extends React.Component<any, any> {
    state = {
        total: 0,
        limit: 10,
        record: {},
        current: 1,
        dataSource: [],
    }

    /**
     * 根据账户查询角色
     */
    AccountQueryByRoleIdAction = () => {
        const { limit, record, current }: any = this.state, offset = (current - 1) * limit;
        accountQueryByRoleId({ offset, limit, roleId: record.id }).then(res => {
            let result = res.data.result.map(item => Object.assign({}, item, { key: item.userId }))
            this.setState({ dataSource: res.data && result || [], total: res.data.total })
        })
    }

    /**
     * 渲染搜索条
     */
    renderSearchBar = () => {
        const { record }: any = this.state
        return (
            <div>
                <Row>
                    <Col span={1}  >
                        <label>角色</label>
                    </Col>
                    <Col span={3}>
                        <span>{record.roleName}</span>
                    </Col>
                    <Col span={2} offset={1}  >
                        <label>角色Key</label>
                    </Col>
                    <Col span={3}>
                        <span>{record.roleKey}</span>
                    </Col>
                </Row>
            </div>
        )
    }

    /**
    * 初始化数据
    */
    initData = () => {
        const { state } = this.props.location;
        this.setState({ record: state }, () => this.AccountQueryByRoleIdAction())
    }

    componentDidMount() {
        this.initData();
    }

    render() {
        const { dataSource, current, total, limit } = this.state;
        const pagination = {
            current,
            total,
            pageSize: limit,
            onChange: (current) => {
                this.setState({ current }, () => {
                    this.AccountQueryByRoleIdAction()
                })
            }
        };
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'userId',
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

        ];
        return (
            <div>
                <PBreadcrumb list={roleBreadcrumb} />
                {this.renderSearchBar()}
                <Table
                    style={{ marginTop: '10px' }}
                    size='small'
                    columns={columns}
                    pagination={pagination}
                    dataSource={dataSource}
                />
            </div>
        )
    }
}
export default withRouter(UserManagement)
import React from 'react';
import { Row, Col, message } from 'antd';
import { withRouter } from 'react-router-dom';
import PBreadcrumb from '../../../../components/breadcrumb';
import { userRightBreadcrumb } from '../../const';
import UserRightTree from '../../usermanagement/userright/userrighttree';
import './../index.less';

//action
import {
    roleResQueryByRoleId,
    modifyByRoleId
} from '../../action/action';

class UserRight extends React.Component<any, any> {
    state = {
        checkedKeys: [],
        selectedKeys: [],
        treeData: [],
        record: {}
    }

    /**
     * 渲染顶部搜索栏
     */
    renderSearchBar = () => {
        const { record }: any = this.state;
        return (
            <div>
                <Row>
                    <Col span={2}  >角色名称</Col>
                    <Col span={5}  >{record.roleName}</Col>
                    <Col span={2}  >系统名</Col>
                    <Col span={3}>
                        <span>{record.systemDes}</span>
                    </Col>
                </Row>
            </div>
        )
    }

    /**
    * 请洗数据
    */
    filterTreeData = (data, checkedKeys, fn) => {
        let children: any = [];
        return data.map((item): any => {
            if (item.isHave) {
                checkedKeys.push(item.id)
            }
            if (item.resources) {
                children = this.filterTreeData(item.resources, checkedKeys, fn)
            } else {
                children = []
            }
            fn(checkedKeys);
            return { title: item.resName, key: item.id, children, }
        })
    }

    /**
     * 查询展示数据
     */
    accountRoleQueryByAccountIdAction = () => {
        const { record }: any = this.state;
        roleResQueryByRoleId({ roleId: record.id, system: record.system }).then(res => {
            if (res.code === 200) {
                let checkedKeys = [];
                let treeData = this.filterTreeData(res.data && res.data.result || [], checkedKeys, (e) => {
                    checkedKeys = e
                });
                this.setState({ treeData: treeData, checkedKeys: [...[], ...checkedKeys] })
            } else {
                message.warn(res.message)
            }
        })
    }

    /**
     * 初始化数据
     */
    initData = () => {
        const { state } = this.props.location;
        this.setState({ record: state }, () => {
            this.accountRoleQueryByAccountIdAction();
        })
    }

    componentDidMount() {
        this.initData()
    }
    render() {
        const { treeData, checkedKeys, selectedKeys, record }: any = this.state;
        return (<div>
            <PBreadcrumb list={userRightBreadcrumb} />
            {this.renderSearchBar()}
            <UserRightTree
                checkable={true}
                checkStrictly={true}
                treeData={treeData}
                checkedKeys={checkedKeys}
                selectedKeys={selectedKeys}
                getSelectedKeys={(selectedKeys) => this.setState({ selectedKeys })}
                getCheckedKeys={(checkedKeys, info) => this.setState({ checkedKeys: checkedKeys.checked }, () => {
                    const checkedId = info.node.props.dataRef.key;
                    modifyByRoleId({ roleId: record.id, resId: checkedId }).then(res => {
                        if (res.code === 200) {
                            this.accountRoleQueryByAccountIdAction();
                            message.success(res.message);
                        } else {
                            this.accountRoleQueryByAccountIdAction();
                            message.warn(res.message);
                        }
                    })
                })
                }
            />
        </div>)
    }
}
export default withRouter(UserRight)
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tree, Divider } from 'antd';
const { TreeNode } = Tree;
class UserRightTable extends React.Component<any, any> {

    /**
     * 渲染树结点
     */
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });

    render() {
        const { treeData, checkable, checkedKeys, checkStrictly, selectedKeys } = this.props;
        return (
            <div className='rms-col-padding'>
                {treeData.length > 0
                    ? <Tree
                        checkable={checkable}
                        onCheck={(checkedKeys, e) => this.props.getCheckedKeys(checkedKeys, e)}
                        checkedKeys={checkedKeys}
                        checkStrictly={checkStrictly}
                        onSelect={(selectedKeys, e) => this.props.getSelectedKeys(selectedKeys, e)}
                        selectedKeys={selectedKeys}
                    >
                        {this.renderTreeNodes(treeData)}
                    </Tree>
                    : <div>
                        <Divider />
                        暂无数据
                    </div>
                }
            </div>
        )
    }
}
export default withRouter(UserRightTable) 
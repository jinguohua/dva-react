import React from 'react';
import { Modal, Form, Button } from 'antd';
import RightTable from '../index';
import './../index.less'
class AddRightModal extends React.Component<any, any> {
    state = {
        visible: false,
    }

    /**
     * 点击确认关闭模态框，传参数
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.getFormConfirmData(values)
            }
        });
    };

    /**
     * 渲染弹窗
     */
    renderModel = () => {
        let { record } = this.props, { visible } = this.state, title = `${record.parentName ? record.parentName + '->' : ''}${record.resName}->子权限列表`;
        return (
            <div>
                {visible && <Modal
                    className='showRightModal'
                    title={title}
                    visible={visible}
                    onOk={(e) => this.handleSubmit(e)}
                    onCancel={() => this.setState({ visible: false }, () => {
                        this.props.refreshData()
                    })}
                    footer={[
                        <Button key="back" onClick={() => this.setState({ visible: false }, () => {
                            this.props.refreshData()
                        })}>
                            返回
                        </Button>,
                    ]}
                >
                    <RightTable
                        record={record}
                        resTypeChildren='Children'
                    />
                </Modal>}
            </div>
        )
    }

    render() {
        return (
            <span style={{ display: 'inline-block' }}>
                <a type="primary" onClick={() => {
                    this.setState({
                        visible: true,
                    });
                }}>
                    查看子权限
                </a>
                {this.renderModel()}
            </span>
        )
    }
}
const AddRightForm = Form.create<any>()(AddRightModal)
export default AddRightForm
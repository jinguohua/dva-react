import React from 'react';
import { Modal, Input, Button, Form, Select } from 'antd';
import { systemOption } from '../../const';
class AddRoleModal extends React.Component<any, any> {
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
     * 渲染 搜索条件
     */
    renderSearchBar = () => {
        const { record }: any = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className='rms-col-padding'>
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    className="login-form">
                    <Form.Item label="角色名称">
                        {getFieldDecorator('roleName', {
                            initialValue: record && record.roleName || '',
                            rules: [{ required: true, message: '请输入角色名称!' }],
                        })(
                            <Input placeholder='请输入角色名称' />,
                        )}
                    </Form.Item>
                    <Form.Item label="角色key">
                        {getFieldDecorator('roleKey', {
                            initialValue: record && record.roleKey || '',
                            rules: [{ required: true, message: '请输入角色key!' }],
                        })(
                            <Input placeholder='请输入角色key' />,
                        )}
                    </Form.Item>
                    <Form.Item label="所属系统">
                        {getFieldDecorator('system', {
                            initialValue: record && record.system || '',
                            rules: [{ required: true, message: '请输入所属系统!' }],
                        })(<Select
                            disabled={!!record.id}
                            style={{ width: '100%' }}>
                            {systemOption.map(item =>
                                <Select.Option
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                </Select.Option>)}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="描述">
                        {getFieldDecorator('roleDesc', {
                            initialValue: record && record.roleDesc || '',
                            rules: [{ required: true, message: '请输入角色描述' }],
                        })(<Input placeholder='请输入角色描述' />)}
                    </Form.Item>
                </Form>
            </div>
        )
    }

    /**
     * 渲染弹窗
     */
    renderModel = () => {
        let { visible, record } = this.props,
            title = record.id ? '修改角色信息' : '新增角色信息';
        return (
            <div>
                <Modal
                    className='addRoleModal'
                    title={title}
                    visible={visible}
                    destroyOnClose={true}
                    onOk={(e) => this.handleSubmit(e)}
                    onCancel={() => this.props.toggleModalShow(false)}
                >
                    {this.renderSearchBar()}
                </Modal>
            </div>
        )
    }

    render() {
        return (
            <span style={{ display: 'inline-block' }}>
                <Button type="primary" onClick={
                    () => this.props.toggleModalShow(true)
                }>
                    新增
                </Button>
                {this.renderModel()}
            </span>
        )
    }
}
const AddRoleForm = Form.create<any>()(AddRoleModal)
export default AddRoleForm
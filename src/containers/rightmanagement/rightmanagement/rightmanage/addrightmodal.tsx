import React from 'react';
import { Modal, Input, InputNumber, Button, Form, Select, Row, Col, message } from 'antd';
import { systemOption, resOption, resTypeOption } from '../../const';

//action
import {
    resParentList
} from '../../action/action'
class AddRightModal extends React.Component<any, any> {
    state = {
        system: '',
        resType: '',
        resName: '',
        resKey: '',
        parentList: []
    }

    /**
     * 点击确认关闭模态框，传参数
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ system: '', resType: '' })
                this.props.getFormConfirmData(values)
            }
        });
    };

    /**
     * 获取父权限
     */
    resParentListAction = (data) => {
        let { system, resType, resName, resKey } = this.state;
        if (data.system && data.resType) {
            system = data.system;
            resType = data.resType;
            this.setState({ system: data.system, resType: data.resType })
        }
        resParentList({ system, resType, resName, resKey }).then(res => {
            if (res.code === 200) {
                this.setState({ parentList: res.data && res.data.result || [] })
            } else if (res.code === 202) {
                this.setState({ parentList: [] })
                message.warn(res.message)
            }
        })
    }

    /**
     * 渲染 搜索条件
     */
    renderSearchBar = () => {
        const { record }: any = this.props, { parentList }: any = this.state;
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
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
                    <Row>
                        <Col span={12}>
                            <Form.Item label="系统">
                                {getFieldDecorator('system', {
                                    initialValue: record && record.system || '',
                                    rules: [{ required: true, message: '请选择系统!' }],
                                })(<Select
                                    disabled={!!record.id}
                                    onChange={
                                        system => this.setState({ system },
                                            () => {
                                                if (this.state.resType) {
                                                    this.resParentListAction({});
                                                    setFieldsValue({ parentId: '' })
                                                }
                                            })} >
                                    {systemOption.map(item =>
                                        <Select.Option
                                            key={item.key}
                                            value={item.key}>
                                            {item.value}
                                        </Select.Option>)}
                                </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="权限类型">
                                {getFieldDecorator('resType', {
                                    initialValue: record && record.resType || '',
                                    rules: [{ required: true, message: '请选择权限类型!' }],
                                })(
                                    <Select
                                        disabled={!!record.id}
                                        onChange={resType => this.setState({ resType },
                                            () => {
                                                if (this.state.system) {
                                                    this.resParentListAction({})
                                                    setFieldsValue({ parentId: '' })
                                                }
                                            })}>
                                        {resOption.map(item =>
                                            <Select.Option
                                                key={item.key}
                                                value={item.key}>
                                                {item.value}
                                            </Select.Option>)}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="父权限">
                                {getFieldDecorator('parentId', {
                                    initialValue: record && record.parentId || '',
                                    rules: [{ required: false, message: '请选择父权限!' }],
                                })(<Select
                                    showSearch
                                    filterOption={(input, option): any => {
                                        let { props: { children } }: any = option;
                                        return children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }}
                                >
                                    {parentList.map((item): any =>
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.resName}
                                        </Select.Option>
                                    )}
                                </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="权限排序">
                                {getFieldDecorator('score', {
                                    initialValue: record && record.score,
                                    rules: [{ required: true, message: '请选择权限排序!' }],
                                })(<InputNumber style={{ width: '100%' }} min={0} max={999999999} />)}
                            </Form.Item>
                            <Form.Item label="权限Icon">
                                {getFieldDecorator('resIcon', {
                                    initialValue: record && record.resIcon || '',
                                    rules: [{ required: false, message: '请选择权限Icon!' }],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="权限名称">
                                {getFieldDecorator('resName', {
                                    initialValue: record && record.resName || '',
                                    rules: [{ required: true, message: '请输入权限名称!' }],
                                })(
                                    <Input />,
                                )}
                            </Form.Item>
                            <Form.Item label="权限key">
                                {getFieldDecorator('resKey', {
                                    initialValue: record && record.resKey || '',
                                    rules: [{ required: true, message: '请输入权限key!' }],
                                })(
                                    <Input placeholder='权限类型-业务模块-权限名' />,
                                )}
                            </Form.Item>
                            <Form.Item label="权限url">
                                {getFieldDecorator('resUrl', {
                                    initialValue: record && record.resUrl || '',
                                    rules: [{ required: false, message: '请输入权限url!' }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="权限级别">
                                {getFieldDecorator('resLevel', {
                                    initialValue: record && record.resLevel || '',
                                    rules: [{ required: true, message: '请选择系统!' }],
                                })(<Select>
                                    {resTypeOption.map(item =>
                                        <Select.Option
                                            key={item.key}
                                            value={item.key}>
                                            {item.value}
                                        </Select.Option>
                                    )}
                                </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="描述">
                                {getFieldDecorator('resDesc', {
                                    initialValue: record && record.resDesc || '',
                                    rules: [{ required: false, message: '请输入角色描述' }],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div >
        )
    }

    /**
     * 渲染弹窗
     */
    renderModel = () => {
        let { visible, record } = this.props,
            title = record.id ? '修改权限信息' : '新增权限信息';
        return (
            <div>
                <Modal
                    destroyOnClose={true}
                    className='AddRightModal'
                    title={title}
                    visible={visible}
                    onOk={(e) => this.handleSubmit(e)}
                    onCancel={() => {
                        this.setState({ resType: '', system: '' });
                        this.props.toggleRightModle(false, {})
                    }}
                >
                    {this.renderSearchBar()}
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        return (
            <span style={{ display: 'inline-block' }}>
                <Button
                    type="primary"
                    onClick={() => {
                        this.setState({ parentList: [] }, () => {
                            this.props.toggleRightModle(true, {})
                        })
                    }}>
                    新增
                </Button>
                {this.renderModel()}
            </span>
        )
    }
}
const AddRightForm = Form.create<any>()(AddRightModal)
export default AddRightForm
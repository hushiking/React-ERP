import React from 'react'
import Moment from 'moment'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
const PropTypes = require('prop-types');

const formatTime = Moment(Date.now());

class UserTemplate extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {
        getFormVal: PropTypes.func,
        renderObj: PropTypes.object
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        renderObj: this.context.renderObj
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
                }
                this.context.getFormVal(values)
                // console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
            );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        const time = this.state.renderObj["date-time-picker"] ? Date.parse(this.state.renderObj["date-time-picker"]) : Date.now();
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }]
            , initialValue: Moment(time) || formatTime
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            用户名&nbsp;
                            <Tooltip title="please input the username of your expect ">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }]
                        , initialValue: this.state.renderObj.username || ''
                    })(
                        <Input placeholder="请使用手机号作为用户名" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!', whitespace: true }]
                        , initialValue: this.state.renderObj.name || ''
                    })(
                        <Input placeholder="姓名" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Email"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                        initialValue: this.state.renderObj.email || ''
                    })(
                        <Input placeholder="demo@example.com" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" placeholder="请输入密码" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次输入密码" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="状态"
                >
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: 'Please choose the status' }],
                        initialValue: this.state.renderObj.status || '1'
                    })(
                        <RadioGroup>
                            <Radio value="0" >无效</Radio>
                            <Radio value="1" >有效</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属组织"
                    hasFeedback
                >
                    {getFieldDecorator('group', {
                        rules: [
                            { required: true, message: 'Please select your group!' },
                        ], initialValue: this.state.renderObj.group || 'customer'
                    })(
                        <Select>
                            <Option value="yun">云和互动</Option>
                            <Option value="customer">客户群</Option>
                            <Option value="call">呼叫中心</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属角色"
                    hasFeedback
                >
                    {getFieldDecorator('role', {
                        rules: [
                            { required: true, message: 'Please select your role!' },
                        ], initialValue: this.state.renderObj.group || 'advance'
                    })(
                        <Select>
                            <Option value="admin">超级管理员</Option>
                            <Option value="operate">运营管理员</Option>
                            <Option value="advance">高级账号</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="有效期"
                >
                    {getFieldDecorator('date-time-picker', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginTop: '70px' }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const UserComponents = Form.create()(UserTemplate);

module.exports = UserComponents;
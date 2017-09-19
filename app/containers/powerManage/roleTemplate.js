import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import PropTypes from 'prop-types';
// 引入树形组件
import ManageTree from '../../components/manageTree' 


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class RoleTemplate extends React.Component {
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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                 console.log(values)
                this.context.getFormVal(values)
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="角色名称"
                    hasFeedback
                >
                    {getFieldDecorator('rolename', {
                        rules: [{ required: true, message: 'Please input your rolename!' }],
                        initialValue: this.state.renderObj.rolename || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="状态"
                >
                    {getFieldDecorator('status',{
                         rules: [{ required: true, message: 'Please choose the status' }],
                         initialValue: this.state.renderObj.status || '0'
                    })(
                        <RadioGroup >
                            <Radio value="0" >无效</Radio>
                            <Radio value="1">有效</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
               <FormItem
                    {...formItemLayout}
                    label="权限规则"
                >
                    {getFieldDecorator('rule_competence')(
                        <ManageTree/>
                    )}
                </FormItem>
                

                <FormItem {...tailFormItemLayout} style={{ marginTop: '70px' }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const RoleComponents = Form.create()(RoleTemplate);

module.exports = RoleComponents;
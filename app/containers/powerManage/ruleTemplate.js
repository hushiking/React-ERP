import React from 'react'
import {   Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
// 单选组件
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import PropTypes from 'prop-types';
class RuleTemplate extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {
         getFormVal : PropTypes.func,
         renderObj: PropTypes.object
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        renderObj : this.context.renderObj
    };
      

    handleSubmit = (e) => {
        e.preventDefault(); 
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.context.getFormVal(values)

                // (values)
                // console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const parentsArr = ['顶级', '设置', '权限管理', '规则管理', '角色管理']
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

        return (
         
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label='规则名称'
                    hasFeedback
                >
                    {getFieldDecorator('rule_name', {
                        rules: [{ required: true, message: 'Please input your rule_name!'}],
                        initialValue:this.state.renderObj.rule_name || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            规则&nbsp;
              <Tooltip title='分组名/控制器名/方法名;控制器类名不带"Controller;方法名不带"Action";末尾不带"/";无需权限认证则不填. '>
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('rule_url', {
                        rules: [{ required: true, message: 'Please input your rule_url!', whitespace: true }]
                        ,initialValue:this.state.renderObj.rule_url || ''})(
                        <Input />
                        )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label='附加条件'
                    hasFeedback
                >
                    {getFieldDecorator('additional', {
                        rules: [{ required: true, message: 'Please input your additional!'}],
                        initialValue:this.state.renderObj.additional || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="父级"
                    hasFeedback
                >
                    {getFieldDecorator('parent_level', {
                        rules: [
                            { required: true, message: 'Please select your parent level!' },
                        ],initialValue:this.state.renderObj.parent_level || ''
                    })(
                        <Select placeholder="Please select a country">
                        {parentsArr.map((item,  index)=>{
                          return (  <Option key={index} value= {item} >{item}</Option>)
                        })
                        }
                        </Select>
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
                    label="显示"
                >
                    {getFieldDecorator('isshow',{
                         rules: [{ required: true, message: 'Please decide it what is  waited to choose' }],
                         initialValue: this.state.renderObj.isshow || '0'
                    })(
                        <RadioGroup >
                            <Radio value="0" >显示</Radio>
                            <Radio value="1">不显示</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label='图标'
                    hasFeedback
                >
                    {getFieldDecorator('icon', {
                        rules: [{ required: true, message: 'Please input your icon!'}],
                        initialValue:this.state.renderObj.icon || ''
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{marginTop:'70px'}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const RuleComponents = Form.create()(RuleTemplate);

module.exports = RuleComponents;
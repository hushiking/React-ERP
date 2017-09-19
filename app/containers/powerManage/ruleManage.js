import React from 'react'
import { Row, Col, Button } from 'antd';

import PropTypes from 'prop-types';
//引入组件
import FlexBox from '../../components/flexbox'
import SelectSearch from '../../components/select'
import InputCompontent from '../../components/input'
import Tables from '../../components/table'

import RuleTemplate from './ruleTemplate'

class RuleManage extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    static childContextTypes = {
        getFormVal: PropTypes.func,
        renderObj: PropTypes.object
    }
    state = {
        ruleTemplate: <RuleTemplate />,
        formObj: {},
        shadeProps: true,
        renderObj: {}
    }
    getChildContext() {
        return {
            getFormVal: (obj) => {
                this.setState({ formObj: obj, shadeProps: !this.state.shadeProps })
            },
            renderObj: this.state.renderObj
        }
    }
    changeFormObj(obj) {
        this.setState({ renderObj: obj });
    }
    getTableData = () => {
        return [
                {
                    key: '1',
                    rule_url: "/index/rolemanage",
                    rule_name: "角色管理",
                    parent_level: "顶级",
                    icon: "plus",
                    additional: '加鸡腿',
                    status: '0',
                    isshow: '0'
                },
                {
                    key: '2',
                    rule_url: "/index/rulemanage",
                    rule_name: "规则管理",
                    parent_level: "顶级",
                    icon: "plus",
                    additional: '加鸡腿',
                    status: '0',
                    isshow: '0'
                },
                {
                    key: '3',
                    rule_url: "/index/manage",
                    rule_name: "权限管理",
                    parent_level: "顶级",
                    icon: "plus",
                    additional: '加蛋',
                    status: '1',
                    isshow: '0'
                },
            ] 
    }
    render() {
        let roleTableData;
        roleTableData = this.getTableData();
        console.log(roleTableData);
        let tableTitle = ['ID', '规则Url', '规则名称', '父级', '图标', '附加条件', '状态', '显示'];
        let keys = ['key', 'rule_url', 'rule_name', 'parent_level', 'icon', 'additional', 'status', 'isshow'];
        let flexContent =
            <div style={felxContent}>
                <Row gutter={25} type="flex" align="middle">
                    <Col span={6}><InputCompontent label={'规则名称'} /></Col>
                    <Col span={6}><SelectSearch label={'状态'} /></Col>
                    <Col span={6}><SelectSearch label={'显示'} /></Col>
                    <Col span={6} style={{ paddingLeft: '40px' }}> <Button className='btnSearch' icon="search">Search</Button></Col>
                </Row>
            </div>
        const container = {
            width: '100%',
        }
        const conditionSearch = {
            width: '100%',
            background: 'white',
        }
        return (
            <div style={container}>
                <FlexBox content={flexContent} />
                <Tables data={roleTableData} tableTitle={tableTitle} keys={keys} renderObject={(obj) => this.changeFormObj(obj)} shadeProps={this.state.shadeProps} formObj={this.state.formObj} template={this.state.ruleTemplate}></Tables>
            </div>
        )
    }
}
module.exports = RuleManage 
const felxContent = {
    width: '100%',
    background: 'white',
    padding: '20px'

}
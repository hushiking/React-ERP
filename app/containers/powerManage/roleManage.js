import React from 'react'

import { Link } from 'react-router'
import { Row, Col, Button } from 'antd';

import PropTypes from 'prop-types';
//引入组件
import FlexBox from '../../components/flexbox'
import SelectSearch from '../../components/select'
import InputCompontent from '../../components/input'
import Tables from '../../components/table'

import RoleTemplate from './roleTemplate'
class RuleManage extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    static childContextTypes = {
        getFormVal: PropTypes.func,
        renderObj: PropTypes.object
    }
    state = {
        roleTemplate: <RoleTemplate />,
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
                    rolename: "小红",
                    status: '0',
                    rule_competence: []
                },
                {
                    key: '2',
                    rolename: "玲玲",
                    status: '1',
                    rule_competence: []
                },
                {
                    key: '3',
                    rolename: "大明",
                    status: '1',
                    rule_competence: []
                }] 
    }
    render() {
        let roleTableData;
        roleTableData = this.getTableData();
        console.log(roleTableData);
        let tableTitle = ['ID', '角色名称', '状态'];
        let keys = ['key', 'rolename', 'status'];
        let flexContent =
            <div style={felxContent}>
                <Row gutter={25} type="flex" align="middle">
                    <Col span={6}><InputCompontent label={'姓名'} /></Col>
                    <Col span={6}><SelectSearch label={'状态'} /></Col>
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
                <Tables data={roleTableData} tableTitle={tableTitle} keys={keys} renderObject={(obj) => this.changeFormObj(obj)} shadeProps={this.state.shadeProps} formObj={this.state.formObj} template={this.state.roleTemplate}></Tables>
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
import React from 'react'
import { Row, Col, Button } from 'antd'

const PropTypes = require('prop-types');
//引入组件
import FlexBox from '../../components/flexbox'
import SelectSearch from '../../components/select'
import Tables from '../../components/table'

import UserTemplate from './userTemplate'

class UserManage extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    static childContextTypes = {
        getFormVal: PropTypes.func,
        renderObj: PropTypes.object
    }
    state = {
        userTemplate: <UserTemplate />,
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
        console.log(obj);
        this.setState({ renderObj: obj });
    }
    getTableData = () => {
        return [
            {
                key: '1',
                name: "班长",
                username: "123456789",
                group: "云和互动",
                role: "高级账号",
                email: '333@qq.com',
                status: '0',
                "date-time-picker": ''
            },
            {
                key: '2',
                name: "小河",
                username: "987654321",
                group: "客户群",
                role: "超级管理员",
                email: 'admin@admin.com',
                status: '1',
                "date-time-picker": ''
            },
            {
                key: '3',
                name: "大树",
                username: "13141269888",
                group: "呼叫中心",
                role: "运营管理员",
                email: 'operation@126.com',
                status: '1',
                "date-time-picker": ''
            },
        ]
    }
    render() {
        let userTableData;
        userTableData = this.getTableData();
        let tableTitle = ['ID', '姓名', '手机', '组织', '权限角色', 'Email', '最后登录时间', '最后登录IP', '有效'];
        let keys = ['key', 'name', 'username', 'group', 'role', 'email', 'date-time-picker', 'ip', 'status'];
        let flexContent =
            <div style={felxContent}>
                <Row gutter={24} type="flex" align="middle">
                    <Col span={6}><SelectSearch label={'姓名'} /></Col>
                    <Col span={6}><SelectSearch label={'组织'} /></Col>
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
                <Tables data={userTableData} tableTitle={tableTitle} keys={keys} renderObject={(obj) => this.changeFormObj(obj)} shadeProps={this.state.shadeProps} formObj={this.state.formObj} template={this.state.userTemplate}></Tables>
            </div>
        )
    }
}
module.exports = UserManage

const felxContent = {
    width: '100%',
    background: 'white',
    padding: '20px'
}
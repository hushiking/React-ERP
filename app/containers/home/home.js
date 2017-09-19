import React from 'react'
import { Link } from 'react-router'
import '../../static/css/home.css'

import { Layout, Menu, Icon } from 'antd'


// 引入遮罩层

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const { Header, Content, Footer, Sider } = Layout

class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            title: '数据运营中心',
            powermanage: {
                title: '权限管理',
                powerArr: [
                    { title: '组织管理', id: 1, link: '/home' },
                    { title: '账号管理', id: 2, link: '/home/usermanage' },
                    { title: '角色管理', id: 3, link: '/home/rolemanage' },
                    { title: '规则管理', id: 4, link: '/home/rulemanage' },
                ]
            }
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    shadeTemplate = (template) => {
        this.setState({
            shadeTemplate: template
        }); 
    }
    render() {
        return (
            <Layout className="layout" style={{ height: '100%', background: this.context.color }}>
                <Header className="header">
                    <span>{this.state.title}<i></i></span>
                </Header>

                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                        width='250'
                        style={{ background: '#575048', fontSize: '14px' }}
                    >
                        <Menu
                            style={{ background: '#575048' }}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub0']}
                            inlineCollapsed={this.state.collapsed}
                        >
                            <SubMenu key="sub0" title={this.state.powermanage.title}>
                                {this.state.powermanage.powerArr.map(function (item) {
                                    return (
                                        <Menu.Item style={{ fontSize: '14px', bacground: '#575048' }} key={item.id}>
                                            <Link style={{ display: 'block' }} to={item.link}>{item.title}</Link>
                                        </Menu.Item>
                                    )
                                })
                                }
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ padding: '30px', overflow: 'auto' }}>
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: 'center', background: 'white' }}>
                            yunhe ©2016 Created by zening
			             </Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
module.exports = Home  
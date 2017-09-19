import React, { Component } from 'react'
import { Router, Route, Link, Redirect, hashHistory, browserHistory, IndexRoute } from 'react-router'

import Login from '../containers/login/LoginForm'
import Home from '../containers/home/home'


import GroupManage from '../containers/powerManage/groupManage'
import RoleManage from '../containers/powerManage/roleManage'
import RuleManage from '../containers/powerManage/ruleManage'
import UserManage from '../containers/powerManage/userManage'


export default class Routers extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Login}
                    onLeave={({ params }) => {
                        console.log('离开了登录页 我们去首页');
                    }}>
                </Route>
                <Route path='/home' component={Home}>
                    <IndexRoute component={GroupManage} />
                    <Route path='rolemanage' component={RoleManage} />
                    <Route path='rulemanage' component={RuleManage} />
                    <Route path='usermanage' component={UserManage} />
                </Route>
            </Router>
        )
    }
}
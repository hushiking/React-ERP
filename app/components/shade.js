import React from 'react'
import { Row, Col, Icon } from 'antd';
import $ from 'jquery'

class Shade extends React.Component {
    static defaultProps = {
        title: '我是遮罩层',
        template: <div>我是遮罩层 还没有传入模板哦</div>
    }

    constructor(props, context) {
        super(props, context)
    }
    state = {
        shadeContent: normalShade,
        ismaxScreen: false
    }
    closeShade = (e) => {
        if ($(e.target).attr('id') == 'shadeContainer') {
            this.props.shadeChange();
            return;
        } else if ($(e.target).attr('id') == 'closeShade') {
            this.props.shadeChange();
            return;
        }
    }
    maxScreen = () => {
        this.setState({
            shadeContent: maxShade,
            ismaxScreen: true
        });

    }
    normalScreen = () => {
        this.setState({
            shadeContent: normalShade,
            ismaxScreen: false
        });
    }
    render() {
        let { ismaxScreen } = this.state
        let IconScreen;
        ismaxScreen ? IconScreen = <Icon onClick={this.normalScreen} className='shadeIcon' style={{ marginRight: '2px' }} type="shrink" />
            : IconScreen = <Icon onClick={this.maxScreen} className='shadeIcon' style={{ marginRight: '2px' }} type="arrows-alt" />
        let banClickShade 
        this.props.banClick ? banClickShade =  <div style={banClick}></div> : <div></div>
        return (
            <div style={shadeContainer} onClick={this.closeShade}>
                <Row id="shadeContainer" style={{ width: '100%', height: '100%' }} type="flex" justify="center" align="middle">
                    <div style={this.state.shadeContent}>
                        <div style={{ width: '100%', height: '48px', background: '#c3a279', color: 'white', lineHeight: '48px' }}>
                            <span style={shadeTitleText}>{this.props.title}</span>
                            <Icon id="closeShade" onClick={this.closeShade} className='shadeIcon' type="close" />
                            {IconScreen}
                        </div>
                        <div style={shadePropsContent}>
                        {this.props.template}
                        {banClickShade}
                          
                        </div>
                       
                    </div>   
                                   
                </Row>
            </div>
        )
    }
}
module.exports = Shade

const shadeContainer = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    background: 'rgba(0,0,0,.4)',
    zIndex: '99'
}
const normalShade = {
    marginRight: '-15px',
    width: '46%',
    height: '600px',
    background: 'white',
    borderRadius: '6px',
    boxShadow: '1px 1px 50px rgba(0,0,0,.3)',   
}
const maxShade = {
    marginRight: '-15px',
    width: '100%',
    height: '100%',
    background: 'white',
    borderRadius: '6px',
   
}
const shadeTitleText = {
    paddingLeft: '24px',
    borderLeft: '4px solid #fff',
    fontSize: '14px',
    cursor: 'pointer'
}
const shadePropsContent = {
    width: '100%',
    height:'552px',
    background: 'white',
    overflow: 'auto',
    paddingTop:'42px'
}
const banClick = {
    width: '46%',
    height: '100%',
    background: 'transparent',
    zIndex: '999',
    position: 'fixed',
    top: '0',
}
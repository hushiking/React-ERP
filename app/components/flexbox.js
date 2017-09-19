import React from 'react'
import { Row, Col, Icon } from 'antd';


class FlexBox extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            icon: 'minus-circle',
            boxState: true
        }
    }
    static defaultProps = {
        title: '按条件搜索'
    }
    flexContentToggle() {
        this.setState({ boxState: !this.state.boxState });
        if (this.state.icon === 'plus-circle') {
            this.setState({ icon: 'minus-circle' });
            console.log(this.state.icon);
        } else {
            this.setState({ icon: 'plus-circle' });
        }
    }
    render() {
        let flexBox;
        if (this.state.boxState) {
            flexBox = this.props.content
        } else {
            flexBox = <div></div>
        }
        return (
            <div style={container}>
                <Row>
                    <Col span={24}>
                        <div style={flexBoxTitle}>
                            <span style={{ marginLeft: '25px' }}>{this.props.title}</span>
                            <Icon type={this.state.icon} onClick={this.flexContentToggle.bind(this)} style={{ fontSize: 16, color: '#c3a279', marginLeft: '10px', cursor: 'pointer' }} />
                        </div>
                        {flexBox}
                    </Col>
                </Row>
            </div>
        )
    }
}
module.exports = FlexBox



const container = {
    width: '100%',
}
const flexBoxTitle = {
    width: '100%',
    background: 'white',
    height: '48px',
    font: '14px "微软雅黑" ',
    lineHeight: '48px'
}

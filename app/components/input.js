
import React from 'react'
import { Row, Col,Input } from 'antd';


class InputCom extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
    }
    static defaultProps = {
        placeInput: '请输入',
        label: '我是label'
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        return (
            <Row gutter={0} type="flex" justify="center" align="middle" style={{height:'48px'}}>
                <Col span={12}><span style={{display:'inline-block',width:'100%',textAlign:'center',fontSize:'14px',color:'#929aab'}}>{this.props.label}</span></Col>
                <Col span={12} >
                   <Input placeholder={this.props.placeInput} />
                </Col>
            </Row>

        )
    }
}
module.exports = InputCom

import React from 'react';
import { Table, Button, Icon, Row, Popconfirm } from 'antd';

// 引入遮罩层
import ShadePage from './shade'
class Tables extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data: this.props.data,
        tableTitle: this.props.tableTitle,
        keys: this.props.keys,
        shadeStatues: false,
        editItem : -1
    };
    componentWillReceiveProps(nextProps) {
        console.log('props改变了')
        if (nextProps.formObj !== this.props.formObj) {
            let { data } = this.state;
            console.log(this.state.editItem);
            if(this.state.editItem === -1){
               let lastKey = data.length - 1 >= 0 ? Number((data[data.length - 1])['key']) + 1 : 1;
                nextProps.formObj['key'] = lastKey;
                data.push(nextProps.formObj) 
            }else{
                let currKey = data[this.state.editItem]['key'];
                nextProps.formObj['key'] =  currKey ;
                data[this.state.editItem] = nextProps.formObj
            }
            this.setState({ data: data })
        }
        if (nextProps.shadeProps !== this.props.shadeProps) {
            this.shadeStatuesAction();
        }
    }
    static defaultProps = {
        data: [{
            key: '1',
            nickname: "二位哇若",
            category: "china",
            adress: "爱笑的",
            phone: "13717879138",
            email: "2@qq.com",
            remark: "dada",
            website: "web.c.com",
        }, {
            key: '2',
            nickname: "dxxc",
            category: "china",
            adress: "北京",
            phone: "13888888888",
            email: "752671125@qq.com",
            remark: "dada",
            website: "baidu.com",
        }, {
            key: '3',
            nickname: "新浪",
            category: "U.S.A",
            adress: "香港",
            phone: "1507891313",
            remark: "这是备注信息",
            website: "xinlang.com",
            email: "ls@xinlang.com",
        }],
        tableTitle: ['组织名称', '类型', '地址', '电话', 'E-mail'],
        template: <div>遮罩层模板内容</div>,
        keys: ['nickname', 'category', 'adress', 'phone', 'email']
    }
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter,
            selectedRowKeys: [],
            banClick: false
        });
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    }
    addShade = () => {
        this.props.renderObject({});   
        this.setState({
            shadeStatues: !this.state.shadeStatues,
            editItem : -1,
            banClick: false
        });
    }
    editShade = (index) => {        
        let formSelectObj =  this.state.data[index];
        this.props.renderObject(formSelectObj);
        this.setState({
            shadeStatues: !this.state.shadeStatues,
            editItem : index,
            banClick: false
        });
    }
    viewShade = (index) => {
        let formSelectObj =  this.state.data[index] ;
        this.props.renderObject(formSelectObj);    
        this.setState({
            shadeStatues: !this.state.shadeStatues,
            banClick: true
        });
    }
    delRow = (index) => {
        let { data } = this.state;
        data.splice(index, 1)
        this.setState({ data: data })
    }
    delCouple = () => {
        let surviveArr = [];
        let { data, selectedRowKeys } = this.state;
        data.forEach((item, index) => {
            if (selectedRowKeys.indexOf(item['key']) == -1) surviveArr.push(item);
        })
        selectedRowKeys = []
        this.setState({ data: surviveArr, selectedRowKeys: selectedRowKeys })

    }

    shadeStatuesAction = () => {
        this.setState({
            shadeStatues: !this.state.shadeStatues
        });
    };

    render() {
        let { shadeStatues } = this.state;
        let shadeEle;
        shadeStatues ? shadeEle = <ShadePage banClick = {this.state.banClick}  shadeChange={this.shadeStatuesAction} template={this.props.template} /> : shadeEle = <div></div>
        let { sortedInfo, selectedRowKeys, data } = this.state;
        sortedInfo = sortedInfo || {};
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: '奇数行选择',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: '偶数行选择',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };
        let columns = [];
        let columnsTitle = this.state.tableTitle;
        let columnsKey = [];

        columnsKey = this.state.keys;
        columnsKey.forEach((item, index) => {
            columns.push({
                title: columnsTitle[index],
                dataIndex: item,
                key: item,
                sorter: (a, b) => a[item].length - b[item].length
            })
        })
        let actionObj = {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return <div>
                    <span style={{ cursor: 'pointer', color: '#575048' }} onClick={() => this.editShade(index)}>
                        <Icon type="edit" /> 修改
                    </span>
                    <span style={{ cursor: 'pointer', color: '#fdb241', marginLeft: '8px' }} onClick={() => this.viewShade(index)}>
                        <Icon type="search" /> 查看
                    </span>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.delRow(index)}>
                        <Icon style={{ cursor: 'pointer', color: '#eb6c4b', marginLeft: '10px' }} type="delete" /><span style={{ cursor: 'pointer', color: '#eb6c4b' }}>&nbsp;删除</span>
                    </Popconfirm>
                </div>
            }
        }
        columns.push(actionObj);
        return (
            <div>
                <div className="table-operations" style={{ marginTop: '25px', height: '50px', background: 'white', lineHeight: '50px' }}>
                    <Button className='btnNew' style={{ marginLeft: '24px' }} icon="plus" onClick={this.addShade}>新建</Button>
                    <Button className='btnDle' style={{ marginLeft: '15px' }} icon="delete" onClick={this.delCouple.bind(this)}>删除</Button>
                </div>
                <Table style={{ background: 'white' }} columns={columns} rowSelection={rowSelection} dataSource={this.state.data} onChange={this.handleChange} />
                {shadeEle} 
            </div>
        );
    }
}
module.exports = Tables



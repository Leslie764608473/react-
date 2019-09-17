import React,{} from 'react';
import {Card, Select, Table, Input, Button, Icon} from "antd";
import './index.less'
import {reqProductList} from '../../api'
import {withRouter} from 'react-router-dom'


const {Option} = Select
@withRouter
class Product extends React.Component {

  state = {
    result: {}
  }

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => {
        return <div>
          <Button type='primary'>下架</Button>
          <span>已上架</span>
        </div>
      }
    },
    {
      title: '操作',
      render: () => {
        return <div>
          <Button type='link'>修改</Button>
          <Button type='link'>删除</Button>

        </div>
      }
    }

  ]

  componentDidMount() {
    this.getProducts(1, 1,)

  }
  changeComponent = ()=>{
    this.props.history.push('/product/saveupdate')
  }


  render() {

    const {list, total} = this.state.result

    return (
      <div>
        <Card title={<div>
          <Select defaultValue='1'>
            <Option key='1' value='1'>根据商品名称</Option>
            <Option key='2' value='2'>根据商品描述</Option>
          </Select>
          <Input placeholder='关键字' className='product-input'/>
          <Button type="primary">搜索</Button>
        </div>
        } extra={
          <Button onClick={this.changeComponent} type="primary"><Icon type='plus'/>添加商品</Button>
        }>
          <Table
            columns={this.columns}
            dataSource={list}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['3', '6', '9', '12'],
              defaultPageSize: 3,
              total,
              onChange: this.getProducts,
              onShowSizeChange: this.getProducts
            }}
          />
        </Card>
      </div>
    );
  }

  getProducts = async (pageNum, pageSize) => {
    let result = await reqProductList(pageNum, pageSize)
    this.setState({
      result
    })
  }
}

export default Product
import React from 'react';
import { Card,Table,Form,Icon,Input,Select,InputNumber,Button } from 'antd'
import { connect } from 'react-redux'
import { getCategories } from '../../../redux/action-creators'
import RichTextEditor from '../rich-text-editor'


const { Option } = Select
@Form.create()
@connect(
  (state)=>({categories:state.categories}),
  {getCategories}
)
class Saveupdate extends React.Component {

  componentDidMount() {
    if (this.props.categories.length) return
    this.props.getCategories()
  }

  addProduct = (e)=>{
    e.preventDefault()
    this.props.form.validateFields((err,value)=>{
      if (!err){
        //如果校验成功发送请求


      } else {
        console.log('校验失败')
      }
    })
  }



  render() {
    const { getFieldDecorator } = this.props.form
    const {categories} = this.props
    return (
      <div>
        <Card title={
          <div><Icon type="arrow-left"/><span>  添加商品</span></div>
        }>
        <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onSubmit={this.addProduct}>
          <Form.Item label='商品名称:'>
            {getFieldDecorator(
              'name', {
                rules:[
                  {required:true,message:'请输入商品名称'}
                ]
              }
            )(
              <Input placeholder='请输入商品名称'/>
            )}
          </Form.Item>
          <Form.Item label='商品描述:'>
            {getFieldDecorator(
              'desc', {
                rules:[
                  {required:true,message:'请输入商品描述'}
                ]
              }
            )(
              <Input placeholder='请输入商品描述'/>
            )}
          </Form.Item>
          <Form.Item label='商品分类:'>
            {getFieldDecorator(
              'categoryId',{
                rules:[{
                  required:true,message:'请选择商品分类'
                }]
              }
            )(
              <Select placeholder="请选择商品分类">
                {
                  categories.map((category)=>{
                    return <Option key={category._id} value={category.name}>{category.name}</Option>
                  })
                }
                {/*<Option value="bbb">bbb</Option>*/}
              </Select>
            )}

          </Form.Item>
          <Form.Item label='商品价格:'>
            {getFieldDecorator(
              'price',{
                rules:[{
                  required:true,message:'请输入商品价格'
                }]
              }
            )(
              <InputNumber
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                style={{width: 150}}
              />
            )}

          </Form.Item>

          <Form.Item label="商品详情" wrapperCol={{span: 20}}>
            <RichTextEditor/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
        </Card>
      </div>
    );
  }

}

export default Saveupdate
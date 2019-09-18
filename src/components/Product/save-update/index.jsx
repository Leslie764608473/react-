import React from 'react';
import { Card,Table,Form,Icon,Input,Select,InputNumber,Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../../../redux/action-creators'
import RichTextEditor from '../rich-text-editor'
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { reqAddProduct,reqUpdateProduct } from '../../../api'


const { Option } = Select
@withRouter
@Form.create()
@connect(
  (state)=>({categories:state.categories}),
  {getCategories}
)
class Saveupdate extends React.Component {

  RichTextEditor = React.createRef()

  componentDidMount() {
    if (this.props.categories.length) return
    this.props.getCategories()
  }

  addProduct = (e)=>{
    e.preventDefault()
    this.props.form.validateFields(async (err,value)=>{

      if (!err){
        const product = this.props.location.state
        //如果校验成功发送请求
        const { editorState } = this.RichTextEditor.current.state
        const a = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        const { name, desc, price, categoryId } = value;
        if (product){
          const productId = product._id;
          //如果product有就发送更新请求
          await reqUpdateProduct({productId,name, desc, price, categoryId})
        } else {
          //如果product没有就直接发送添加请求
          await reqAddProduct({name, desc, price, categoryId,a})
        }
        this.props.history.push('/product')



      } else {
        console.log('校验失败')
      }
    })
  }

  goback = ()=>{
    this.props.history.goBack()
  }



  render() {
    const { getFieldDecorator } = this.props.form
    const {categories} = this.props
    const product = this.props.location.state
    return (
      <div>
        <Card title={
          <div><Icon onClick={this.goback} type="arrow-left"/><span>  {product?'修改':'添加'}商品</span></div>
        }>
        <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onSubmit={this.addProduct}>
          <Form.Item label='商品名称:'>
            {getFieldDecorator(
              'name', {
                rules:[
                  {required:true,message:'请输入商品名称'},
                ],
                initialValue:product?product.name:''
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
                ],
                initialValue:product?product.desc:''
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
                }],
                initialValue:product?product.categoryId:''
              }
            )(
              <Select placeholder="请选择商品分类">
                {
                  categories.map((category)=>{
                    return <Option key={category._id} value={category._id}>{category.name}</Option>
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
                }],
                initialValue:product?product.price:''
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
            <RichTextEditor detail={product ? product.detail : ''} ref={this.RichTextEditor} />
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
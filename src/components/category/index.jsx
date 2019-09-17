import React from 'react';
import { Card,Button,Icon,Table,Modal } from 'antd';
import { connect } from 'react-redux'
import { getCategories,addCategories,updateCategory,deleteCategory } from '../../redux/action-creators'
import Myform from './Myform'
import MyUpdateForm from './MyUpdateForm'
import {reqDeleteCategory} from '../../api'





@connect(
    (state)=>({categories:state.categories}),
    { getCategories,addCategories,updateCategory,deleteCategory }
)
class Category extends React.Component{

    state = {
        isShowDelete:false,
        isVisible:false,
        isShowUpdate:false,
        category:{}
    }

    addCategoryForm = React.createRef();
    updateCategoryForm = React.createRef();


    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
            key: 'name',
            //render: text => <a>{text}</a>,
        },
        {
            title: '操作',
            render: (category) => {
                return <div>
                    <Button onClick={this.updateCategory('isShowUpdate',category)} type="link">修改分类</Button>
                    <Button onClick={this.updateCategory('isShowDelete',category)} type="link">删除分类</Button>
                </div>
            }
        }

    ];



    updateCategory = (key,category)=>{
        return ()=>{
            this.setState({
                [key]:true,
                category
            })
        }
    }


    changeModal = (key,value)=>{
        return ()=>{
            this.setState({
                [key]:value
            })
        }

    }

    deleteCategories = ()=>{
        this.setState({
            isShowDelete:false
        })
        const categoryId = this.state.category._id
        console.log(categoryId)
        //请求删除分类
        this.props.deleteCategory(categoryId)

    }

    addCategory =  ()=>{

        //点击确认时进行表单校验
        const form = this.addCategoryForm.current
        form.validateFields((err,value)=>{
            if (!err){
                const { categoryName } = value
                //请求数据把数据添加到categories上
                this.props.addCategories(categoryName)
                //清除输入框
                form.resetFields()


            }else {
                console.log('校验没通过')
            }
        })


        this.setState({
            isVisible:false
        })
    }

    componentDidMount() {
        //在组件挂载完成时请求数据
        this.props.getCategories()
    }

    updateCategories = ()=>{
        //校验表单
        const form = this.updateCategoryForm.current
        form.validateFields(async (err,value)=>{
            if (!err){

                const categoryId = this.state.category._id
                const categoryName = value.categoryName

                //发送请求
                this.props.updateCategory(categoryId,categoryName)
            }
        })


        //关闭对话框
        this.setState({
            isShowUpdate:false
        })
    }


    render() {

        const { isVisible,isShowUpdate,isShowDelete } = this.state
        const { categories } =this.props

        return (
            <div>
                <Card title="分类列表" extra={<Button onClick={this.changeModal("isVisible",true)} type='primary'><Icon type='plus'/>分类列表</Button>} style={{ width: 1101 }}>
                    <Table
                        columns={this.columns}
                        dataSource={categories}
                        bordered
                        rowKey="_id"
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            pageSizeOptions: ['3', '6', '9', '12'],
                            defaultPageSize: 3
                        }}
                    />
                    <Modal
                        visible={isVisible}
                        title="添加分类"
                        onCancel={this.changeModal('isVisible',false)}
                        onOk={this.addCategory}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <Myform ref={this.addCategoryForm}/>
                    </Modal>



                    <Modal
                        visible={isShowUpdate}
                        title="修改分类"
                        onCancel={this.changeModal('isShowUpdate',false)}
                        width={300}
                        onOk={this.updateCategories}
                    >
                        <MyUpdateForm ref={this.updateCategoryForm} categoryName={this.state.category.name}/>
                    </Modal>


                    <Modal
                        visible={isShowDelete}
                        title="删除分类"
                        onCancel={this.changeModal('isShowDelete',false)}
                        onOk={this.deleteCategories}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                    是否确认删除此分类
                    </Modal>


                    </Card>

            </div>
        );
    }

}
export default Category
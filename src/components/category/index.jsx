import React from 'react';
import { Card,Button,Icon,Table,Modal,Form,Input } from 'antd';
import { connect } from 'react-redux'
import { getCategories,addCategories } from '../../redux/action-creators'
import Myform from './Myform'




@connect(
    (state)=>({categories:state.categories}),
    { getCategories,addCategories }
)
class Category extends React.Component{

    state = {
        isVisible:false
    }

    addCategoryForm = React.createRef();


    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
            key: 'name',
            //render: text => <a>{text}</a>,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: () => {
                return <div>
                    <Button type="link">修改分类</Button>
                    <Button type="link">删除分类</Button>
                </div>
            }
        }

    ];


    changeModal = (value)=>{
        return ()=>{
            this.setState({
                isVisible:value
            })
        }

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

    render() {

        const { isVisible } = this.state
        const { categories } =this.props

        return (
            <div>
                <Card title="分类列表" extra={<Button onClick={this.changeModal(true)} type='primary'><Icon type='plus'/>分类列表</Button>} style={{ width: 1101 }}>
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
                        onCancel={this.changeModal(false)}
                        onOk={this.addCategory}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <Myform ref={this.addCategoryForm}/>
                    </Modal>
                    </Card>

            </div>
        );
    }

}
export default Category
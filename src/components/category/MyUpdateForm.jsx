import React from 'react';
import {Form, Input} from "antd";
@Form.create()
class MyUpdateForm extends React.Component{


    render() {
        const { getFieldDecorator } = this.props.form
        const {categoryName} = this.props

        return (
            <Form>
                <Form.Item label="分类名称">
                    {getFieldDecorator(
                        'categoryName', {
                            rules: [
                                { required: true, message: '请输入分类名称~' }
                            ],
                            initialValue:categoryName
                        }
                    )(<Input placeholder='请输入分类名称'/>)}

                </Form.Item>
            </Form>
        );
    }

}
export default MyUpdateForm
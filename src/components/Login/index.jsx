import React from 'react';
import {Form, Icon, Input, Button, Checkbox,message } from 'antd'
// import axios from 'axios'
import { reqUser } from '../../api/index'
import { connect } from 'react-redux'
import logo from './logo.png'
import { saveUser } from '../../redux/action-creators'

import './index.less'

//这个高阶组件是要把redux里的属性和方法
//放到这个组件的props属性上
@connect(
    null,
    { saveUser }
)
//这个高阶组件是让login组件加上form这个方法
@Form.create()
class Login extends React.Component {
    /*
     * 自定义表单校验的方法
     * @param rule 包含getFieldDecorator第一个参数
     * @param value 输入框的值
     * @param callback 当callback传参时，说明校验失败，并提示传入参数。 当callback没有参数，说明校验成功
     */
    validator = (rule,value,callback)=>{
        let name = ''
        if (rule.field === 'username') {
            name = '用户名'
        }else {
            name = '密码'
        }


        if (!value){
            return callback(`请输入${name}`)
        }
        if (value.length<3){
            return callback(`${name}长度必须大于3位`)
        }
        if (value.length>13){
            return callback(`${name}长度必须小于13位`)
        }
        const reg = /^[a-zA-Z0-9_]{3,13}$/
        if (!reg.test(value)){
            return callback(`${name}只能包含英文、数字和下划线`)
        }
        //callback必须调用
        callback();
    }


    login = (e)=>{
        e.preventDefault()
        //校验表单login中有一个方法就是进行表单验证的
        this.props.form.validateFields((error,value)=>{
            /*
            * 如果验证通过error为null
            * 验证失败为一个对象
            * value是表单数据
            * */
            console.log(error,value)
            if (!error){
                //表单验证成功，发送请求
                //收集表单数据
                const { username,password } = value;
                /*
                * 如果直接向服务器请求数据会产生跨域问题
                * 解决跨域问题的几种方式：
                * 1.jsonp，因为这种方式要结合后端该代码，所以不适用
                * 2.cors，也要修改服务器代码
                * 3.proxy  服务器代理模式（正向代理）
                *
                * 正向代理：因为浏览器向服务器请求数据时会产生跨域问题
                *         但是服务器向服务器请求数据就不会产生跨域问题
                *         正向代理就正是用了这一特性
                *         在浏览器端包了一层服务器
                * 缺点：这只能在开发环境中应用
                * */
                reqUser(
                    username,
                    password
                ).then((data)=>{
                    console.log(data)
                    //如果请求下来的status是0说明用户名密码正确

                        message.success('登陆成功');

                        //因为以后其他组件也要用token
                        //所以要把token存到store的state中
                        this.props.saveUser(data)

                        //跳转到localhost：3000/
                        this.props.history.replace('/')

                }).catch((err)=>{
                    //请求数据出错
                    console.log(err)
                    message.error('未知错误，请稍后重试');
                })
            }else {
                //表单验证失败
                //不用做处理因为下面代码操作了，就提示了
            }
        })

    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>

                <section className='login-section'>
                    <h3>用户登陆</h3>
                    <Form onSubmit={this.login}>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'username',
                                    {
                                        rules:[
                                            /*{ required:true, message: 'xxxxx'},
                                            { min:3,message:'用户名长度必须大于3位'},
                                            { max:13,message:'用户名长度必须小于13位'},
                                            { pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户名只能包含英文、数字和下划线' }*/
                                            { validator: this.validator}
                                            ]
                                    }
                                )(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Username"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            { validator: this.validator}
                                        ]
                                    }
                                )(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                           type="password"
                                                           placeholder="Password"/>)
                            }


                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>

            </div>
        );
    }

}
export default Login
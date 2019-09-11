import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import logo from './logo.png'
import './index.less'
export default class Login extends React.Component{
    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>

                <section className='login-section'>
                <h3>用户登陆</h3>
                    <Form>
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="Username"/>
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   type="password"
                                   placeholder="Password"/>
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
import React from 'react';
import { Layout } from 'antd';
import logo from '../../assets/imges/logo.png'
import HeaderMain from './header-main/index'
import './index.less'
import Leftnav from './left-nav/index'
import withCheckLogin from '../../containers/with-check-login/index'


const { Content, Footer, Sider } = Layout;

@withCheckLogin
class BasicLayout extends React.Component {
    state = {
        collapsed: false,

    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});

    };



    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className='basic-layout-logo'>
                        <img src={logo} alt="logo"/>
                        <h1 style={this.state.collapsed?{display:'none'}:{display:'block'}}>硅谷后台</h1>
                    </div>


                    <Leftnav />
                </Sider>
                <Layout>
                    <HeaderMain/>
                    <Content style={{margin: '25px 16px 0 16px'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 450 }}>
                            {
                                this.props.children
                            }
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }

}

export default BasicLayout
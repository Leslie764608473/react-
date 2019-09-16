/*
* 高阶组件
* 功能：用来做登陆验证的
* */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
function withCheckLogin(WrappedComponent) {


    return connect(
        (state)=>({token:state.user.token})
    )(
        class extends React.Component{
            render(){
                /*
                * 登陆校验
                * 1.如果当前地址是login
                * 如果用户登陆过跳转到/
                * 如果用户没登陆过，不变
                * 2.如果当前地址是/
                * 如果登陆过不变
                * 如果没登陆过跳转到login
                * */
                const { token, location, history, match, children } = this.props;
                const { pathname } = location;
                if (pathname === '/login' && token) return <Redirect to="/"/>;
                if (pathname !== '/login' && !token) return <Redirect to="/login"/>;
                return <WrappedComponent location={location} history={history} match={match} children={children}/>;


            }
        }
    )
}
                export default withCheckLogin
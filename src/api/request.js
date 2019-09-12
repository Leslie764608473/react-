/*
* 这里对axios进行封装
* 设置拦截器：1.发送之前加上请求头参数
*             2.如果请求成功对请求的数据进行处理
*             如果status=0就返回一个状态为reject的Promise对象
*             如果status=1就返回一个状态为resolve的Promise对象
*             3.如果请求失败也返回一个状态为reject的Promise对象
*             并且打印错误
* */

import store from '../redux/store'
import axios from 'axios'
import { message } from 'antd'
//创建一个axios实例
const instance = axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:5000
});

//请求拦截器，在发送请求时触发的函数
instance.interceptors.request.use(
    (config)=>{
        //config是请求地址方法、请求头、请求体。。。。等
        console.log(config)
        const { token } = store.getState().user
        //如果token不是空的就在请求头上加上一个authorization属性
        if (token){
            config.headers.authorization = token
        }

        return config

    }
)

//响应拦截器
instance.interceptors.response.use(
    (response)=>{
        console.log(111111111111)
        const result = response.data
        if (result.status === 0 ){
            //登陆成功
            return result.data;
        } else {
            message.error(result.msg)
            return Promise.reject(result.msg)
        }
    },
    (error)=>{
        console.log(
            error
        )
        message.error('请求出错')
        return Promise.reject('位置错误请联系管理员')
    }
)


export default instance





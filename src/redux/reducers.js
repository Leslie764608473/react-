/*
* 根据prevState和action来生成新的newState
*
* 这个文件时用来更新store中的state的
* */
//对处理数据的方法进行整合
import { combineReducers } from 'redux'
import { setItem,getItem,removeItem } from '../utils/storage'
import { SAVE_USER } from './action-types'

//初始化状态数据
const state = {
    token:getItem("token")|| '',
    user:getItem('user')||{}
}

function user(prevState = state,action) {
    switch (action.type) {
        case SAVE_USER:
            setItem('user',action.data.user)
            setItem('token',action.data.token)
            return action.data
        default:
            return prevState
    }
}
export default combineReducers({
    user:user
})
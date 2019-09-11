/*
* 根据prevState和action来生成新的newState
*
* 这个文件时用来更新store中的state的
* */
//对处理数据的方法进行整合
import { combineReducers } from 'redux'

import { SAVE_USER } from './action-types'

//初始化状态数据
const state = {
    token:'',
    user:{}
}

function user(prevState = state,action) {
    switch (action.type) {
        case SAVE_USER:
            return action.data
        default:
            return prevState
    }
}
export default combineReducers({
    user:user
})
/*
* 根据prevState和action来生成新的newState
*
* 这个文件时用来更新store中的state的
* */
//对处理数据的方法进行整合
import { combineReducers } from 'redux'
import { setItem,getItem,removeItem } from '../utils/storage'
import { SAVE_USER,SET_TITLE,INIT_USER,GET_CATEGORIES_SUCCESS,ADD_CATEGORY } from './action-types'

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
        case INIT_USER:
            removeItem('user')
            removeItem('token')
            return {token: '',user:{}}
        default:
            return prevState
    }
}

function title(prevState = '',action) {
    switch (action.type) {
        case SET_TITLE:
            return action.data
        default:
            return prevState
    }
}

function categories(prevState = [],action) {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return action.data
        case ADD_CATEGORY:
            return [...prevState,action.data]
        default:
            return prevState
    }
}


export default combineReducers({
    user:user,
    title,
    categories
})
/*
* 根据prevState和action来生成新的newState
*
* 这个文件时用来更新store中的state的
* */
//对处理数据的方法进行整合
import { combineReducers } from 'redux'

function xxx(prevState = {},action) {
    switch (action.type) {
        default:
            return prevState
    }
}
export default combineReducers({
    xxx
})
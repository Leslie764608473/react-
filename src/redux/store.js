/*
这个问价基本时不会变的
* 这个文件里写创建store对象;
* 用来管理公共的状态
* */
//创建store对象和应用中甲件的方法
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers'
//处理异步操作的包
import thunk from 'redux-thunk'
//可以在控制台看到redux的插件
import { composeWithDevTools } from 'redux-devtools-extension'

let store

if (process.env.NODE_ENV === 'development'){
 store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
}else{
 store = createStore(reducers,applyMiddleware(thunk))
}
export default store


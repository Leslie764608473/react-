/*
* 用来创建生产action对象工厂函数的模块
* */

import { SAVE_USER } from './action-types'

export const saveUser = (user)=>({type:SAVE_USER,data:user})

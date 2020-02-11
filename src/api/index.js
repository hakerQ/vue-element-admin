/**
 * 接口管理
 */
import {get, post} from './axios'

export function register(params){
  return get('/register',params)
}

export function login(params){
  return post('/login',params)
}
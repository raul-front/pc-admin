import { _post } from 'utils/request'

// 登录、登出
export const login = body => _post('login', body)

import { _get, _post, _put, _delete } from 'utils/request'

// 部门管理
export const listDepartment = query => _get('/account/department', query)
export const addDepartment = body => _post('/account/department', body)
export const updateDepartment = (id, body) => _put(`/account/department/${id}`, body)
export const deleteDepartment = id => _delete(`/account/department/${id}`)

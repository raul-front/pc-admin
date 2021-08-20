import { _get, _post, _put, _delete } from 'utils/request'

// 部门管理
export const listDepartment = query => _get('api/departments', query)
export const addDepartment = body => _post('api/departments', body)
export const updateDepartment = (id, body) => _put(`api/departments/${id}`, body)
export const deleteDepartment = id => _delete(`api/departments/${id}`)

// 封装新增部门负责人
import request from '@/utils/request'
export const getEmployeeSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的列表数据
 * ***/
export function getEmployeeList(params) {
// 可以和后端进行约定
// 联调：联合调试接口，调试接口能否跑通，有什么报错，返回的数据是否符和要求
// 分页接口 如果不传参数，后端返回所有数据
  return request({
    url: '/sys/user',
    params
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** *
 *  封装批量导入员工的接口
 * ***/
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

import { fetch } from './../../../../assets/js/axios/axios';
import Address from '../../../../location'

/**
 * 查询用户信息
 * @param  data.userName	string	 用户名
 * @param  data.status	number	 状态
 * @param  data.offset	number	 分页开始数
 * @param  data.limit	number	 分页数量
 * @return {json}
 */

export function accountList(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/account/list.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 添加用户角色列表查询
 * @param data.acccountId	是	用户ID
 * @param data.roleName	  否	角色名称
 * @param data.roleKey	  否	角色key
 * @param data.system	  否	系统
 * @param data.offset	  是	分页参数
 * @param data.limit	  是	分页参数
 * @return {json}
 */
export function accountRoleList(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/account/role/list.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 根据账户查询账户角色
 * @param data.userId	是	用户ID
 * @param data.operate	integer	必须 操作 0=删除 1=添加
 * @param data.roleIds	integer []	必须 角色Id列表
 * @return {json}
 */
export function accountRoleQueryByAccountId(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/account/role/queryByAccountId.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 根据用户查询权限
 * @param data.userId	是	用户ID
 * @param data.operate	integer	必须 操作 0=删除 1=添加
 * @param data.roleIds	integer []	必须 角色Id列表
 * @return {json}
 */
export function accountResQueryByAccountId(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/account/res/queryByAccountId.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 添加或者删除 用户角色 
 * @param data.userId	是	用户ID
 * @param data.operate	integer	必须 操作 0=删除 1=添加
 * @param data.roleIds	integer []	必须 角色Id列表
 * @return {json}
 */
export function modifyByAccountId(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/account/accountRole/modifyByAccountId.html',
        type: 'post',
        stringify: true,
        data: data,
        // headers: {
        //     'Content-Type': 'application/json; charset=UTF-8'
        // },
    })
}

/**
 * 展示角色列表
 * @param data.roleKey	否	角色key
 * @param data.roleName	否	角色名称
 * @param data.system	否	tps-web 系统
 * @param data.offset	是	0 分页参数
 * @param data.limit	是	10分页参数
 * @return {json}
 */
export function queryRoleList(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/role/list.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 新增/修改角色信息
 * @param data.roleKey	否	角色key
 * @param data.roleName	否	角色名称
 * @param data.system	否	tps-web 系统
 * @param data.roleDesc	string	非必须角色描述
 * @return {json}
 */
export function roleAddOrUpdate(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/role/addOrUpdate.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 删除角色信息
 * @param data.roleKey	否	角色key
 * @param data.roleName	否	角色名称
 * @param data.system	否	tps-web 系统
 * @param data.roleDesc	string	非必须角色描述
 * @return {json}
 */
export function roleDeleteById(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/role/delete.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 根据角色查看用户
 * @param data.roleKey	否	角色key
 * @param data.roleName	否	角色名称
 * @param data.system	否	tps-web 系统
 * @param data.roleDesc	string	非必须角色描述
 * @return {json}
 */
export function accountQueryByRoleId(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/role/account/queryByRoleId.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 根据角色查询权限
 * @param data.userId	是	用户ID
 * @param data.operate	integer	必须 操作 0=删除 1=添加
 * @param data.roleIds	integer []	必须 角色Id列表
 * @return {json}
 */
export function roleResQueryByRoleId(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/role/res/queryByRoleId.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 新增权限
 * @param data.userId	是	用户ID
 * @param data.operate	integer	必须 操作 0=删除 1=添加
 * @param data.roleIds	integer []	必须 角色Id列表
 * @return {json}
 */
export function addRightRes(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/res/add.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 查询权限列表
 * @param data.resId	是	权限Id
 * @param data.resKey	否	权限key
 * @param data.resName	否	权限名称
 * @param data.resType	否	权限类型 1=菜单 2=页面 3=按钮
 * @param data.system	否	系统
 * @param data.offset	是	0 分页参数
 * @param data.limit	是  10 分页参数
 * @return {json}
 */
export function resListPage(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/res/list/page.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 修改权限
 * @param data.roleId	integer	必须 角色Id	
 * @param data.resIds	integer []	非必须 权限ID列表
 * @return {json}
 */
export function modifyByRoleId(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/role/res/modifyByRoleId.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 修改权限
 * @param data.resName String , 
 * @param data.resKey String,
 * @param data.resType Integer, 
 * @param data.system String
 * @return {json}
 */
export function resParentList(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/res/parent/list.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}

/**
 * 修改权限
 * @param data.resName String , 
 * @param data.resKey String,
 * @param data.resType Integer, 
 * @param data.system String
 * @return {json}
 */
export function deleteResInfo(data) {
    return fetch({
        unload: true,
        url: Address.ajaxPath + '/res/delete.html',
        type: 'post',
        stringify: true,
        data: data,
    })
}



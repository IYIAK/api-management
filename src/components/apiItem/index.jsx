import React from 'react'
import myAxios from '../../utils/myaxios'


export default function ApiItem() {

  console.log('render');

  async function test() {
    var res = await myAxios.post('/project/info', {
      name: '项目4',
      group: 'default',
      baseUrl: 'http://localhost:8000',
      apiList: [
        {
          name: '查询用户',
          path: '/user/info',
          class: '用户相关接口',
          method: 'POST'
        },
        {
          name: '用户登录',
          path: '/user/login',
          class: '用户相关接口',
          method: 'POST'
        },
        {
          name: '用户注册',
          path: '/user/info',
          class: '用户相关接口',
          method: 'POST'
        },
        {
          name: '查询项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'POST'
        },
        {
          name: '查询单个项目',
          path: '/project/info',
          class: '项目相关接口',
          method: 'GET'
        },
        {
          name: '创建项目',
          path: '/project/info',
          class: '项目相关接口',
          method: 'POST'
        },
        {
          name: '更新项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'PUT'
        },
        {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        }, {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        },
        {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        },
        {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        },
        {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        },
        {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        },
        {
          name: '删除项目',
          path: '/project/query',
          class: '项目相关接口',
          method: 'DELETE'
        },

      ]
    })

    console.log(res);
  }

  return (
    <div>
      <button onClick={test}>send</button>
    </div>
  )
}

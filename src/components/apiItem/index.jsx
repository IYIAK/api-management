import React from 'react'
import myAxios from '../../utils/myaxios'


export default function ApiItem() {

  console.log('render');

  async function test() {
    var res = await myAxios.post('/project/info', {
      name: 'test2',
      group: 'default',
      baseUrl: 'http://localhost:8000',
      apiList: [
        {
          name: '查询用户',
          path: '/user/info',
          class: '用户相关接口',
          method: 'GET',
          status: '已完成',
          creator: '未知',
          parameter: {
            params: [
              {
                name: ` userId`,
                required: true,
                example: '无',
                discription: 'string'
              }
            ]
          },
          returnType: {
            name: '123',
            type: 'Object',
            required: true
          }
        },
        {
          name: '用户登录',
          path: '/user/login',
          class: '用户相关接口',
          method: 'POST',
          status: '开发中',
          creator: '未知',
          parameter: {
            body: [
              {
                name: ` userName`,
                required: true,
                example: '123',
                discription: 'string'
              },
              {
                name: 'password',
                required: true,
                example: '123',
                discription: 'string'

              }
            ]
          },
          returnType: {
            name: '123',
            type: 'Object',
            required: true
          }
        }

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

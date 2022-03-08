import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import myAxios from '../../utils/myaxios'
import './index.scss'

export default function Login({ changeAuth }) {
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const res = await myAxios.post('/user/login', {
            userName: values.username,
            password: values.password
        })

        console.log(res.data.body);

        // if (values.username === '123' && values.password === '123') {
        //     message.success('登录成功！')
        //     changeAuth(true)
        // } else {
        //     message.error('用户名或密码错误！')
        // }

    };



    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues=''
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>

                </Form.Item>

                <Link to='/register'>立即注册</Link>
            </Form>

        </div>

    );
}

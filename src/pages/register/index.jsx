import React from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd';
import styled from 'styled-components';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 5,
        },
    },
};


// 尝试一下styled-components
const RegisterStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(247, 247, 247);
    display: flex;
    justify-content: center;

    .register-form{
        padding: 50px;
        padding-left: 0;
        margin-top: 30vh;
        width: 500px;
        height: 290px;
        box-shadow: 0px 10px 25px #b1b1b1;
        border-radius: 8px;
        background-color: #fff;
    }
`

export default function Register() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        message.success('注册成功！')
    };


    return (
        <RegisterStyle>
            <Form
                {...formItemLayout}
                form={form}
                className='register-form'
                name="register"
                onFinish={onFinish}
                initialValues=''
                scrollToFirstError
            >

                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '用户名不能为空！',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空！',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认密码！',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('两次输入的密码不一致！'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </RegisterStyle>

    );
}

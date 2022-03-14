import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModifyParams from "../modifyParams";
import ModifyBody from '../modifyBody'
import ModifyReturnType from '../modifyReturnType'

const { Option } = Select;
export default function CreateApi({ visible, onClose, projectInfo, modifyApi }) {
    console.log(projectInfo);

    // var data = { ...apiData }
    // var changeData = (newData) => {
    //     data = { ...newData }

    // } 

    const [data, setData] = useState({
        class: "",
        creator: "",
        method: "",
        name: "",
        parameter: { params: [], body: [] },
        path: "",
        returnType: [],
        status: "",
    })
    // console.log(data);

    function handleSave() {
        // console.log('save', data);
        modifyApi(data, '添加')
        onClose()
    }

    function handleCancle() {
        onClose()
    }

    // function valueChange(changedVal, allVal) {
    //     console.log(changedVal, allVal);
    //     setData({...data,changedVal})
    // }

    // 添加防抖，防止过于频繁的更新state
    function valueChangePro() {
        var timer
        return (changedVal) => {
            if (timer !== null) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                // 这里的changedVal也要解构赋值
                // console.log({ ...data, ...changedVal });
                setData({ ...data, ...changedVal })
            }, 300);
        }
    }

    return (
        <>
            <Drawer
                title="修改接口信息"
                width={820}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={handleCancle}>取消</Button>
                        <Button onClick={handleSave} type="primary">
                            保存
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout="vertical"
                    hideRequiredMark
                    onValuesChange={valueChangePro()}
                >
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="name"
                                label="接口名称"
                                rules={[{ required: true, message: '接口名称不能为空' }]}
                            // initialValue='123'
                            >
                                <Input placeholder='接口名称不能为空' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="status"
                                label="接口状态"
                                rules={[{ required: true, message: '请选择接口状态' }]}
                            >
                                <Select placeholder='请选择接口状态'>
                                    <Option value="已完成">已完成</Option>
                                    <Option value="开发中">开发中</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="class"
                                label="接口分类"
                                rules={[{ required: true, message: '请输入接口分类' }]}
                            >
                                <Input placeholder='请输入接口分类' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="method"
                                label="请求方法"
                                rules={[{ required: true, message: '请选择请求方法' }]}
                            >
                                <Select placeholder='请选择请求方法'>
                                    <Option value="GET">GET</Option>
                                    <Option value="POST">POST</Option>
                                    <Option value="PUT">PUT</Option>
                                    <Option value="DELETE">DELETE</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="path"
                                label="接口路径"
                                rules={[{ required: true, message: '路径不能为空！' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    addonBefore={projectInfo.baseUrl}
                                    placeholder="请输入接口路径"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="接口描述"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入接口描述',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder='请输入接口描述' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="request"
                                label="请求参数"
                            >
                                <ModifyParams data={data} setData={setData} ></ModifyParams>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="body"
                                label="请求内容"
                            >
                                <ModifyBody data={data} setData={setData}></ModifyBody>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="returnType"
                                label="返回数据"
                            >
                                <ModifyReturnType data={data} setData={setData}></ModifyReturnType>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </>
    );


}

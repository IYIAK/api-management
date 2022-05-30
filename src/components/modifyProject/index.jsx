import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModifyParams from "../modifyParams";
import ModifyBody from '../modifyBody'
import ModifyReturnType from '../modifyReturnType'

const { Option } = Select;
export default function ModifyProject({ visible, onClose, projectInfo, modifyProject}) {

    const [data, setData] = useState(projectInfo)
    function handleSave() {
        // console.log('save', data);
        
        modifyProject(data, '修改')
        onClose()
    }

    function handleCancle() {
        setData(projectInfo)
        onClose()
    }

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
                title="修改项目信息"
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
                                label="项目名称"
                                rules={[{ required: true, message: '项目名称不能为空' }]}
                            // initialValue='123'
                            >
                                <Input placeholder={data.name} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="permission"
                                label="权限"
                                rules={[{ required: true, message: '请选择权限' }]}
                            >
                                <Select placeholder={data.permission}>
                                    <Option value="public">public</Option>
                                    <Option value="private">private</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="baseUrl"
                                label="基本路径"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder={data.baseUrl} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="description"
                                label="描述"
                                rules={[{ required: true}]}
                            >
                                <Input placeholder={data.description} />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </>
    );

}
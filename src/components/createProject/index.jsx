import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid'
import myAxios from '../../utils/myaxios'
import myaxios from '../../utils/myaxios';

const { Option } = Select;
export default function CreateProject({ visible, onClose,setProjects}) {

    const [data, setData] = useState({
        name: "",
        projectId:"",
        baseUrl: "C://",        
        user: "",
        group:"TEST",
        permission: "",
        description:"",
        
    })
    // console.log(data);

    function handleCancle() {
        onClose()
    }


    function handleSave() {
        if (!data.name || !data.user|| !data.permission ) {
            message.warning('项目信息未填写完整！')
            return
        }
        createProject(data)
        onClose()
    }


    async function createProject(data){
        console.log(data.name)
        const res =  await myAxios.post('/project/info',{
                //projectId:data.projectId,
                userId: data.user, //参与此项目的用户
                name: data.name, //项目名
                group: data.group, // 所属分组
                baseUrl: data.baseUrl, //基本路径
                description: data.description, //描述
                permission: data.permission //权限
            
        })
        if (res.status === 200 || res.status === 201) {
            message.success('项目创建成功！')
            var res2 = await myaxios.post('/project/query')
            setProjects(res2.data)
       }else{
           message.error('项目创建失败！')
       }
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
                title="创建项目"
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
                            >
                                <Input placeholder='项目名称不能为空' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="projectId"
                                label="项目编号"
                                rules={[{ required: true,message: '项目编号不能为空' }]}
                            >
                                <Input placeholder='项目编号不能为空' />
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
                                <Input placeholder='请输入项目路径' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="user"
                                label="创建用户"
                                rules={[{ required: true, message: '创建用户不能为空' }]}
                            >
                                <Input placeholder='创建用户不能为空' />
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
                                <Input placeholder='请输入项目描述' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="permission"
                                label="权限"
                                rules={[{ required: true, message: '请选择权限' }]}
                            >
                                <Select placeholder='权限'>
                                    <Option value="public">public</Option>
                                    <Option value="private">private</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );


}

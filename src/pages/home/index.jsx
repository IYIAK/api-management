import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './index.scss'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function Home({ changeAuth }) {

    function handleLogOut() {

        window.localStorage.setItem('auth', false)
        changeAuth(false)
    }

    return (
        <Layout className='home'>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className='menu'>
                    <Menu.Item key="1">接口</Menu.Item>
                    <Menu.Item key="2">操作记录</Menu.Item>
                    <Menu.Item key="3">用户管理</Menu.Item>
                </Menu>
                <span className='logout' onClick={handleLogOut}>退出登录</span>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Projects</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0', minHeight: '90%' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="项目 1">
                                <Menu.Item key="1">所有接口</Menu.Item>
                                <Menu.Item key="2">分组1</Menu.Item>
                                <Menu.Item key="3">分组2</Menu.Item>
                                <Menu.Item key="4">分组3</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="项目 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="项目 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                </Layout>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>API管理平台 - 工程实践项目</Footer> */}
        </Layout>
    )
}

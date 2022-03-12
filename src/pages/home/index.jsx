import React, { memo, useEffect, useState, useCallback } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, Link, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid';
import ApiItem from '../../components/apiItem'
import './index.scss'
import myaxios from '../../utils/myaxios';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function Home({ changeAuth }) {
    console.log('render!');

    const [projects, setProjects] = useState([])

    const navigate = useNavigate();
    const { projectId, apiClassName } = useParams()

    useEffect(() => {
        async function getProjects() {
            var res = await myaxios.post('/project/query')
            console.log(res.data);
            setProjects(res.data)
        }

        getProjects()


    }, [])


    function handleLogOut() {

        window.localStorage.setItem('auth', false)
        changeAuth(false)
    }


    //菜单的key千万不能用nanoid随机生成，必须得保证每次的key都一样，菜单才能知道下次更新后的展开及高亮状态
    function renderMenu() {
        var menus = new Map()
        for (let p of projects) {
            let classes = new Set()
            for (let i of p.apiList) {
                classes.add(i.class)
            }
            menus[p] = Array.from(classes)
        }
        return projects.map((val, i) => (
            <SubMenu key={'sub' + i} title={val.name} >
                <Menu.Item key={'all' + i} onClick={() => navigate('/home/' + val.projectId + '/所有接口')}>所有接口</Menu.Item>
                {
                    menus[val].map((v) => (
                        <Menu.Item key={i + v} onClick={() => navigate('/home/' + val.projectId + '/' + v)}>{v}</Menu.Item>
                    ))
                }
            </SubMenu >
        ))
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
                    <Breadcrumb.Item>{projectId ? projects.filter(v => v.projectId === projectId)[0].name : ''}</Breadcrumb.Item>
                    <Breadcrumb.Item>{apiClassName ? apiClassName : ''}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0', minHeight: '90%' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={['0']}
                            // defaultOpenKeys={['sub0']}
                            style={{ height: '100%' }}
                        >
                            {renderMenu()}

                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>API管理平台 - 工程实践项目</Footer> */}
        </Layout>
    )
}

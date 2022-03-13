import React, { memo, useEffect, useState, useCallback } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, Link, useParams, Routes, Route } from 'react-router-dom'
import { nanoid } from 'nanoid';
import ApiItem from '../../components/apiItem'
import Interfaces from '../interfaces'
import ApiList from '../../components/apiList'
import User from '../user'
import './index.scss'
import myaxios from '../../utils/myaxios';
import Projects from '../projects';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function Home({ changeAuth }) {
    // console.log('render!');

    const [projects, setProjects] = useState([])

    const navigate = useNavigate();

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



    return (
        <Layout className='home'>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className='menu'>
                    <Menu.Item key="1" onClick={() => navigate('/home/interfaces')}>接口管理</Menu.Item>
                    <Menu.Item key="2" onClick={() => navigate('/home/projects')}>项目管理</Menu.Item>
                    <Menu.Item key="3" onClick={() => navigate('/home/user')}>用户管理</Menu.Item>
                </Menu>
                <span className='logout' onClick={handleLogOut}>退出登录</span>
            </Header>
            <Routes>
                <Route path='interfaces' element={<Interfaces projects={projects}></Interfaces>}>
                    <Route path=':projectId/:apiClassName' element={<ApiList></ApiList>}></Route>
                </Route>
                <Route path='projects' element={<Projects projects={projects}></Projects>}>
                    <Route path=':projectId' element={<ApiList project={projects}></ApiList>}></Route>
                </Route>
                <Route path='user' element={<User></User>}></Route>
            </Routes>
            {/* <Footer style={{ textAlign: 'center' }}>API管理平台 - 工程实践项目</Footer> */}
        </Layout>
    )
}

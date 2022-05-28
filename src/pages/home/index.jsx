import React, { useEffect, useState, useCallback } from 'react'
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, Link, useParams, Routes, Route } from 'react-router-dom'

import ApiItem from '../../components/testAddProject'
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

    //挂载home时就请求所有项目的数据，存入上面的projects里面
    useEffect(() => {
        async function getProjects() {
            var res = await myaxios.post('/project/query')
            // console.log(res.data);
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
                {/* 接口管理 */}
                <Route path='interfaces' element={<Interfaces projects={projects} setProjects={setProjects}></Interfaces>}>
                    <Route path=':projectId/:apiClassName' element={<ApiList projects={projects} setProjects={setProjects}></ApiList>}></Route>
                </Route>

                {/* 项目管理 */}
                <Route path='projects' element={<Projects projects={projects} setProjects={setProjects}></Projects>}>
                    {/* 在这里写嵌套路由 */}
                </Route>

                {/* 用户管理 */}
                <Route path='user' element={<User></User>}></Route>
            </Routes>
            {/* <Footer style={{ textAlign: 'center' }}>API管理平台 - 工程实践项目</Footer> */}
        </Layout>
    )
}

import React from 'react'
import { Outlet, useNavigate, Link, useParams } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 项目管理页面
export default function Projects({ projects, setProjects }) {

    // 项目的数据可以重新发请求获取，也可以直接用home传进来的projects
    // 因为在interfaces页面挂载时会重新请求一次数据，所以不用担心接口管理和项目管理的数据同步问题。
    // 只需要将修改同步给后端就行

    const { projectId } = useParams()
    const navigate = useNavigate();

    function renderList() {

    }

    return (
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{projectId ? projects.filter(v => v.projectId === projectId)[0].name : ''}</Breadcrumb.Item>

            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px', minHeight: '90%' }}>

            </Layout>
        </Content>
    )
}

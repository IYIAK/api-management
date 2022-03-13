import React from 'react'
import { Outlet, useNavigate, Link, useParams } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Projects({ projects }) {


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

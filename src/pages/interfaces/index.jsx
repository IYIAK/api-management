import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Outlet, useNavigate, Link, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid';
import ApiItem from '../../components/apiItem'
import myaxios from '../../utils/myaxios';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default function Interfaces({ projects }) {

    const { projectId, apiClassName } = useParams()
    const navigate = useNavigate();

    // 菜单的key千万不能用nanoid随机生成，必须得保证每次的key都一样，菜单才能知道下次更新后的展开及高亮状态
    // 要注意map的用法和对象还是有区别的
    function renderMenu() {
        var menus = new Map()
        for (let p of projects) {
            let classes = new Set()
            for (let i of p.apiList) {
                classes.add(i.class)
            }
            // menus[p] = Array.from(classes)
            menus.set(p, Array.from(classes))
        }
        console.log(menus);
        return projects.map((val, i) => (
            <SubMenu key={'sub' + i} title={val.name} >
                <Menu.Item key={'all' + i} onClick={() => navigate('/home/interfaces/' + val.projectId + '/所有接口')}>所有接口</Menu.Item>
                {
                    menus.get(val).map((v) => (
                        <Menu.Item key={i + v} onClick={() => navigate('/home/interfaces/' + val.projectId + '/' + v)}>{v}</Menu.Item>
                    ))
                }
            </SubMenu >
        ))
    }

    return (
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
                        {projects ? renderMenu() : ''}

                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {projectId ? '' : <div style={{ textAlign: 'center', fontSize: 30, color: 'rgb(197 197 197)', marginTop: 50 }}>请在左侧菜单选择项目</div>}
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Content>
    )
}

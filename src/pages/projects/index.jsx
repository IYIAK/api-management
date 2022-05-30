import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate, Link, useParams } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Button,message} from 'antd';
import myaxios from '../../utils/myaxios';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateProject from '../../components/createProject'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 项目管理页面
export default function Projects({ projects, setProjects }) {

    // 项目的数据可以重新发请求获取，也可以直接用home传进来的projects
    // 因为在interfaces页面挂载时会重新请求一次数据，所以不用担心接口管理和项目管理的数据同步问题。
    // 只需要将修改同步给后端就行

    const { projectId,projectMes} = useParams()
    const navigate = useNavigate();
    const [createVisible, setCreateVisible] = useState(false)
    var showDrawer = () => {
        setCreateVisible(true);
    };
    var onClose = () => {
        setCreateVisible(false);
    };

    useEffect(() => {
        async function getProjects() {
            var res = await myaxios.post('/project/query')
            // console.log(res.data);
            setProjects(res.data)
        }

        getProjects()


    }, [setProjects])

    function renderList() {
        var menus = new Map()

        for (let p of projects) {
            menus.set(p)
        }
        // console.log(menus);
        return projects.map((val, i) => (
           
            <Menu.Item key={'all' + i} onClick={() => navigate('/home/projects/' + val.projectId + '/项目信息')}>{val.name}</Menu.Item>
        ))
    }

    return (
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{projectId ? projects.filter(v => v.projectId === projectId)[0].name : ''}</Breadcrumb.Item>
                <Breadcrumb.Item>{projectMes ? projectMes : ''}</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px', minHeight: '90%' }}>
            <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        // defaultSelectedKeys={['0']}
                        // defaultOpenKeys={['sub0']}
                        style={{ height: '100%' }}
                    >
                        {projects ? renderList() : ''}

                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {projectId ? '' : <div style={{ textAlign: 'center', fontSize: 30, color: 'rgb(197 197 197)', marginTop: 50 }}>请在左侧菜单选择项目</div>}
                    <Outlet></Outlet>
                </Content>
                <Button
                 type="dashed"
                 style={{
                     marginTop: 16,
                     marginRight: 10,
                     // float: 'right',
                     position: 'absolute',
                     right: 40,
                     top: 60,
                     zIndex: 10
                 }}
                 onClick={showDrawer}
                >
                    <PlusOutlined />新增项目
                </Button>
                { createVisible ? <CreateProject visible={createVisible} onClose={onClose} setProjects={setProjects} ></CreateProject> : ''}
            </Layout>
        </Content>
        
    )
}

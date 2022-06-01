import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import myaxios from '../../utils/myaxios'
import NotFound from '../404'
import ModifyProject from '../modifyProject'
import { Collapse, Descriptions, Badge, Popconfirm, message, Table, Button, } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateProject from '../../components/createProject'

const { Panel } = Collapse;

export default function ProjectList({ projects, setProjects, users }) {

    const { projectId, projectMes } = useParams()
    const navigate = useNavigate();
    //用于存储匹配当前projectId的project信息
    const [projectInfo, setProjectInfo] = useState(null)
    //用于决定新建/修改面板是否展示
    const [createVisible, setCreateVisible] = useState(false)

    var showDrawer = () => {
        setCreateVisible(true);
    };

    var onClose = () => {
        setCreateVisible(false);
    };

    // var getData = useCallback(
    //     async () => {

    //         const res = await myaxios.get(`/project/info?projectId=${projectId}`)
    //         // console.log(res);
    //         // setBaseUrl(res.data.baseUrl)
    //         setProjectInfo(res.data)
    //     },
    //     [projectId]
    // )


    useEffect(() => {
        // getData()
        for (let i of projects) {
            if (i.projectId === projectId) {
                setProjectInfo(i)
                break
            }
        }

    }, [projects, projectId])


    // // 修改后需要手动更新本地的projects
    function updateProjects(newProj) {
        let oldProjs = [...projects]
        for (let i in oldProjs) {
            if (oldProjs[i].projectId === newProj.projectId) {
                oldProjs[i] = newProj
                // console.log(oldProjs);
                setProjects(oldProjs)
                break
            }
        }
    }

    // //删除project
    async function deleteProject(projectId) {
        const res = await myaxios.delete(`/project/info?projectId=${projectId}`)
        // console.log(res);
        if (res.status === 200) {
            message.success('删除成功！')
            navigate('/home/projects')
            let res2 = null
            if (JSON.parse(localStorage.getItem('auth')).role === 'admin') {
                res2 = await myaxios.post('/project/query')
            } else {
                res2 = await myaxios.get('/project/user?userId=' + JSON.parse(localStorage.getItem('auth')).userId)
            }
            setProjects(res2.data)
        } else {
            message.error('删除失败！')
        }
    }


    async function modifyProject(newProject, type) {

        console.log(newProject)
        const res = await myaxios.put(`/project/info?projectId=${projectId}`, {
            userId: newProject.user, //参与此项目的用户
            name: newProject.name, //项目名
            group: newProject.group, // 所属分组
            baseUrl: newProject.baseUrl, //基本路径
            description: newProject.description, //描述
            permission: newProject.permission //权限
        })
        if (res.status === 200) {
            message.success(type + '成功！')
            var res2 = await myaxios.post('/project/query')
            setProjects(res2.data)
        } else {
            message.error(type + '失败！')
        }
    }

    function renderList() {
        if (projectInfo === null)
            return <NotFound></NotFound>
        return (
            <ProjectDetail key={projectInfo._id} projectInfo={projectInfo} deleteProject={deleteProject} modifyProject={modifyProject} users={users}></ProjectDetail>
        )
    }

    return (<>

        <Button
            type="dashed"
            style={{
                marginTop: 16,
                marginRight: 10,
                position: 'absolute',
                right: 40,
                top: 60,
                zIndex: 10
            }}
            onClick={showDrawer}
        >
            <PlusOutlined />新增项目
        </Button>

        {/* <ProjectDetail key={projectInfo._id}  projectInfo={projectInfo} deleteProject={deleteProject} modifyProject={modifyProject}></ProjectDetail> */}

        {renderList()}

        {createVisible ? <CreateProject visible={createVisible} onClose={onClose} setProjects={setProjects} ></CreateProject> : ''}
    </>
        // <ListStyle>
        //     {renderList()}
        // </ListStyle>


    )
}


const ProjectDetailStyle = styled.div`
    width: 100%;

    .fn{
        width: 100%;
        color: #1890ff;
        display: flex;
        flex-direction: row-reverse;
    }

    .fn span{
        /* float: right; */
         margin-right: 10px;
         cursor: pointer;
    }

`

function ProjectDetail({ projectInfo, deleteProject, modifyProject, users }) {
    // console.log(apiData);
    //console.log(projectInfo)
    const [visible, setVisible] = useState(false)

    var showDrawer = () => {
        setVisible(true);
    };

    var onClose = () => {
        setVisible(false);
    };

    function getUserName(userId) {
        // console.log(users)
        // console.log(projectInfo.userId);
        if (!projectInfo.userId) return '管理员'

        return users.filter(v => v._id === projectInfo.userId[0])[0].userName
    }

    return (
        <ProjectDetailStyle>

            {visible ? <ModifyProject visible={visible} onClose={onClose} projectInfo={projectInfo} modifyProject={modifyProject}></ModifyProject> : ''}


            <Descriptions title="项目信息" bordered column={3} extra={
                <div className="fn">
                    <Popconfirm
                        title="确定要删除该项目吗？"
                        onConfirm={() => deleteProject(projectInfo._id)}
                        // onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <DeleteOutlined />
                    </Popconfirm>

                    <EditOutlined onClick={showDrawer} />
                </div>}>
                <Descriptions.Item key='name' label="项目名称">{projectInfo.name}</Descriptions.Item>
                <Descriptions.Item key='permission' label="项目权限">
                    <Badge status={projectInfo.permission ? (projectInfo.permission === 'public' ? 'public' : 'private') : 'public'} text={projectInfo.status ? projectInfo.status : 'public'} />
                </Descriptions.Item>
                <Descriptions.Item key='user' label="创建人" >{getUserName()}</Descriptions.Item>
                <Descriptions.Item key='description' label="项目描述" span={2}>{projectInfo.description}</Descriptions.Item>
                <Descriptions.Item key='group' label="所属分组">{projectInfo.group}</Descriptions.Item>
                <Descriptions.Item key='baseUrl' label="基本路径" span={3}>{projectInfo.baseUrl}</Descriptions.Item>
            </Descriptions>
        </ProjectDetailStyle>
    )
}
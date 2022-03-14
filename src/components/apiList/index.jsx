import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import myaxios from '../../utils/myaxios'
import NotFound from '../404'
import ModifyApi from '../modifyApi'
import { Collapse, Descriptions, Badge, Popconfirm, message, Table, Button, } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateApi from '../createApi'

const { Panel } = Collapse;


export default function ApiList() {
    const { projectId, apiClassName } = useParams()


    // const [apis, setApis] = useState([])
    // const [baseUrl, setBaseUrl] = useState('')
    const [projectInfo, setProjectInfo] = useState(null)
    const [createVisible, setCreateVisible] = useState(false)

    var showDrawer = () => {
        setCreateVisible(true);
    };

    var onClose = () => {
        setCreateVisible(false);
    };

    var getData = useCallback(
        async () => {

            const res = await myaxios.get(`/project/info?projectId=${projectId}`)
            // console.log(res);
            // setBaseUrl(res.data.baseUrl)
            setProjectInfo(res.data)
        },
        [projectId]
    )

    function filterApis() {
        if (apiClassName === '所有接口')
            return projectInfo.apiList
        else {
            return projectInfo.apiList.filter((v) => {
                return v.class === apiClassName
            })
            // console.log(allApi);
        }
    }

    useEffect(() => {
        getData()

    }, [getData])

    async function deleteApi(id) {
        // let newProject = { ...projectInfo }
        let apiList = projectInfo.apiList.filter(v => v._id !== id)
        // console.log(apiList);
        const res = await myaxios.put(`/project/info?projectId=${projectId}`, { apiList })
        // console.log(res);
        if (res.status === 200) {
            message.success('删除成功！')
            setProjectInfo(old => ({ ...old, apiList }))
        } else {
            message.error('删除失败！')
        }
    }

    async function modifyApi(newApi, type) {
        // console.log(newApi);
        let id = newApi._id
        let oldApiList = projectInfo.apiList.filter(v => v._id !== id)
        let newApiList = [newApi, ...oldApiList]
        // console.log(newApiList);
        const res = await myaxios.put(`/project/info?projectId=${projectId}`, { apiList: newApiList })
        // console.log(res);
        if (res.status === 200) {
            message.success(type + '成功！')
            setProjectInfo(old => ({ ...old, apiList: newApiList }))
        } else {
            message.error(type + '失败！')
        }
    }

    function renderList() {
        // console.log(projectInfo)
        let apis = projectInfo ? filterApis() : []
        if (apis.length === 0)
            return <NotFound></NotFound>
        return apis.map((v, i) => (
            <Panel header={<ApiInfo key={v._id} apiData={v} baseUrl={projectInfo.baseUrl} ></ApiInfo>} showArrow={false} key={v._id + apiClassName}>
                <ApiDetail key={v._id + apiClassName} apiData={v} projectInfo={projectInfo} deleteApi={deleteApi} modifyApi={modifyApi} />
            </Panel>
        ))
    }

    return (<>

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
            <PlusOutlined />新增接口
        </Button>

        <Collapse accordion bordered={false} ghost defaultActiveKey={''}>

            {renderList()}
        </Collapse>

        {projectInfo ? <CreateApi visible={createVisible} onClose={onClose} projectInfo={projectInfo} modifyApi={modifyApi}></CreateApi> : ''}
    </>
        // <ListStyle>
        //     {renderList()}
        // </ListStyle>


    )
}


const ApiInfoStyle = styled.div`
    width: 100%;
    height: 60px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
    /* margin: 5px auto; */
    margin-top: -10px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;

    .method{
        float: left;
        /* color: green; */
        margin-right: 10px;

    }

    .name{
        color: #999;
    }

`

const methodColor = {
    POST: '#249ce2',
    GET: 'green',
    PUT: 'orange',
    DELETE: 'red'
}

function ApiInfo({ apiData, baseUrl }) {

    return (
        <ApiInfoStyle>
            <div className="path"><span className="method" style={{ color: methodColor[apiData.method] }}>{apiData.method}</span>{baseUrl + apiData.path}</div>
            <div className="name">{apiData.name}</div>
        </ApiInfoStyle>
    )
}

const ApiDetailStyle = styled.div`
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


function ApiDetail({ apiData, projectInfo, deleteApi, modifyApi }) {
    // console.log(apiData);
    const [visible, setVisible] = useState(false)

    var showDrawer = () => {
        setVisible(true);
    };

    var onClose = () => {
        setVisible(false);
    };



    function renderParams() {
        const columns = [
            {
                title: '参数名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '是否必须',
                dataIndex: 'required',
                key: 'required',
                render: v => v === true || v === 'true' || v === '是' || v === 'yes' ? '是' : '否',
            },
            {
                title: '示例',
                dataIndex: 'example',
                key: 'example',
            },
            {
                title: '备注',
                dataIndex: 'discription',
                key: 'discription',
            },

        ];


        return (
            // 用antd的Table必须设置rowKey属性，否则每一行没有各自的key会导致控制台飘红
            <Table
                columns={columns}
                dataSource={apiData.parameter.params}
                pagination={false}
                title={c => (<div className='ant-descriptions-title' style={{ marginLeft: '-16px' }}>请求参数</div>)}
                rowKey={rec => rec._id}
            />
        )
    }


    function renderBody() {
        const columns = [
            {
                title: '参数名称',
                dataIndex: 'name',
                key: 'body-name',
            },
            {
                title: '是否必须',
                dataIndex: 'required',
                key: 'body-required',
                render: v => v === true || v === 'true' || v === '是' || v === 'yes' ? '是' : '否',
            },
            {
                title: '示例',
                dataIndex: 'example',
                key: 'body-example',
            },
            {
                title: '备注',
                dataIndex: 'discription',
                key: 'body-discription',
            },

        ];

        return (
            <Table
                columns={columns}
                dataSource={apiData.parameter.body}
                pagination={false}
                title={c => (<div className='ant-descriptions-title' style={{ marginLeft: '-16px' }}>请求内容</div>)}
                rowKey={rec => rec._id}
            />
        )
    }

    function renderReturnType() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'return-name',
                render: v => v ? v : '无'
            },
            {
                title: '是否必须',
                dataIndex: 'required',
                key: 'return-required',
                render: v => v === true || v === 'true' || v === '是' || v === 'yes' ? '是' : '否',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'return-type',
                render: v => v ? v : '无'
            },
            {
                title: '默认值',
                dataIndex: "defaultValue",
                key: 'return-defaultValue',
                render: v => v ? v : '无'
            },
            {
                title: '备注',
                dataIndex: 'discription',
                key: 'return-discription',
                render: v => v ? v : '无'
            },

        ];

        return (
            <Table
                columns={columns}
                dataSource={apiData.returnType}
                pagination={false}
                title={c => (<div className='ant-descriptions-title' style={{ marginLeft: '-16px' }}>返回数据</div>)}
                rowKey={rec => rec._id}
            />
        )
    }

    return (
        <ApiDetailStyle>

            <ModifyApi visible={visible} onClose={onClose} projectInfo={projectInfo} apiData={apiData} modifyApi={modifyApi}></ModifyApi>


            <Descriptions title="接口详情" bordered column={3} extra={
                <div className="fn">
                    <Popconfirm
                        title="确定要删除该接口吗？"
                        onConfirm={() => deleteApi(apiData._id)}
                        // onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <DeleteOutlined />
                    </Popconfirm>

                    <EditOutlined onClick={showDrawer} />
                </div>}>
                <Descriptions.Item key='name' label="接口名称">{apiData.name}</Descriptions.Item>

                <Descriptions.Item key='status' label="接口状态">
                    <Badge status={apiData.status ? (apiData.status === '已完成' ? 'success' : 'default') : 'success'} text={apiData.status ? apiData.status : '已完成'} />
                </Descriptions.Item>
                <Descriptions.Item key='creator' label="创建人" >{apiData.creator ? apiData.creator : '管理员'}</Descriptions.Item>
                <Descriptions.Item key='project' label="所属项目" span={2}>{projectInfo.name}</Descriptions.Item>
                <Descriptions.Item key='class' label="接口分类">{apiData.class}</Descriptions.Item>
                <Descriptions.Item key='path' label="接口路径" span={3}>
                    <span style={{ color: methodColor[apiData.method], border: `1px solid ${methodColor[apiData.method]}`, borderRadius: '2px', padding: '2px', marginRight: '5px' }}>
                        {apiData.method}
                    </span>
                    {projectInfo.baseUrl + apiData.path}</Descriptions.Item>
            </Descriptions>

            {apiData.parameter.params.length === 0 ? '' : renderParams()}
            {apiData.parameter.body.length === 0 ? '' : renderBody()}
            {apiData.parameter.returnType ? '' : renderReturnType()}
        </ApiDetailStyle>
    )
}
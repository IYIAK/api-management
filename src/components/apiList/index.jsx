import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import myaxios from '../../utils/myaxios'
import NotFound from '../404'
import { Collapse, Descriptions, Badge, Popconfirm, message, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


export default function ApiList() {
    const { projectId, apiClassName } = useParams()

    // const [apis, setApis] = useState([])
    // const [baseUrl, setBaseUrl] = useState('')
    const [projectInfo, setProjectInfo] = useState(null)

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
        console.log(res);
        if (res.status === 200) {
            message.success('删除成功！')
            setProjectInfo(old => ({ ...old, apiList }))
        } else {
            message.error('删除失败！')
        }
    }

    function renderList() {
        // console.log(projectInfo)
        let apis = projectInfo ? filterApis() : []
        if (apis.length === 0)
            return <NotFound></NotFound>
        return apis.map((v, i) => (
            <Panel header={<ApiInfo key={v._id} apiData={v} baseUrl={projectInfo.baseUrl} ></ApiInfo>} showArrow={false} key={v._id + apiClassName}>
                <ApiDetail apiData={v} projectInfo={projectInfo} deleteApi={deleteApi} />
            </Panel>
        ))
    }

    return (
        // <ListStyle>
        //     {renderList()}
        // </ListStyle>
        <Collapse accordion bordered={false} ghost defaultActiveKey={''}>

            {renderList()}
        </Collapse>
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


function ApiDetail({ apiData, projectInfo, deleteApi }) {
    console.log(apiData);



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
                render: v => v ? '是' : '否'
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
            <Table
                columns={columns}
                dataSource={apiData.parameter.params}
                pagination={false}
                title={c => (<div className='ant-descriptions-title' style={{ marginLeft: '-16px' }}>请求参数</div>)}
            />
        )
    }


    function renderBody() {
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
                render: v => v ? '是' : '否'
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
            <Table
                columns={columns}
                dataSource={apiData.parameter.body}
                pagination={false}
                title={c => (<div className='ant-descriptions-title' style={{ marginLeft: '-16px' }}>请求内容</div>)}
            />
        )
    }

    function renderReturn() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '是否必须',
                dataIndex: 'required',
                key: 'required',
                render: v => v ? '是' : '否'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '默认值',
                dataIndex: "defaultValue",
                key: 'defaultValue'
            },
            {
                title: '备注',
                dataIndex: 'discription',
                key: 'discription',
            },

        ];

        return (
            <Table
                columns={columns}
                dataSource={apiData.parameter.returnType}
                pagination={false}
                title={c => (<div className='ant-descriptions-title' style={{ marginLeft: '-16px' }}>返回数据</div>)}
            />
        )
    }

    return (
        <ApiDetailStyle>

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

                    <EditOutlined />
                </div>}>
                <Descriptions.Item label="接口名称">{apiData.name}</Descriptions.Item>

                <Descriptions.Item label="接口状态">
                    <Badge status={apiData.status ? (apiData.status === '已完成' ? 'success' : 'default') : 'success'} text={apiData.status ? apiData.status : '已完成'} />
                </Descriptions.Item>
                <Descriptions.Item label="创建人" >{apiData.creator ? apiData.creator : '管理员'}</Descriptions.Item>
                <Descriptions.Item label="所属项目" span={2}>{projectInfo.name}</Descriptions.Item>
                <Descriptions.Item label="接口分类">{apiData.class}</Descriptions.Item>
                <Descriptions.Item label="接口路径" span={3}>
                    <span style={{ color: methodColor[apiData.method], border: `1px solid ${methodColor[apiData.method]}`, borderRadius: '2px', padding: '2px', marginRight: '5px' }}>
                        {apiData.method}
                    </span>
                    {projectInfo.baseUrl + apiData.path}</Descriptions.Item>
            </Descriptions>

            {apiData.parameter.params.length === 0 ? '' : renderParams()}
            {apiData.parameter.body.length === 0 ? '' : renderBody()}
            {apiData.parameter.returnType ? '' : renderReturn()}
        </ApiDetailStyle>
    )
}
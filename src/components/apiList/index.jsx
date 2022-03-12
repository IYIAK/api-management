import React, { useEffect, useCallback, useState, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import myaxios from '../../utils/myaxios'
import NotFound from '../404'
import { Collapse } from 'antd';

const { Panel } = Collapse;



const ListStyle = styled.div`
    min-height: 280;
    overflow: auto;
`

export default function ApiList() {
    const { projectId, apiClassName } = useParams()

    const [apis, setApis] = useState([])
    const [baseUrl, setBaseUrl] = useState('')

    var formatData = useCallback(
        async () => {

            const res = await myaxios.get(`/project/info?projectId=${projectId}`)
            // console.log(res);
            setBaseUrl(res.data.baseUrl)
            var allApi
            if (apiClassName === '所有接口')
                allApi = res.data.apiList
            else {
                allApi = res.data.apiList.filter((v) => {
                    return v.class === apiClassName
                })
                // console.log(allApi);
            }

            setApis(allApi)
        },
        [projectId, apiClassName],
    )

    useEffect(() => {
        formatData()

    }, [formatData])






    function renderList() {
        if (apis.length === 0)
            return <NotFound></NotFound>
        return apis.map((v, i) => (
            <Panel header={<ApiItem key={v._id} apiData={v} baseUrl={baseUrl}></ApiItem>} showArrow={false} key={i}>
                {123}
            </Panel>

        ))
    }

    return (
        // <ListStyle>
        //     {renderList()}
        // </ListStyle>
        <Collapse bordered={false} ghost>

            {renderList()}
        </Collapse>
    )
}


const ApiItemStyle = styled.div`
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

function ApiItem({ apiData, baseUrl }) {

    const itemRef = useRef()

    return (
        <ApiItemStyle>
            <div className="path"><span className="method" style={{ color: methodColor[apiData.method] }}>{apiData.method}</span>{baseUrl + apiData.path}</div>
            <div className="name">{apiData.name}</div>
        </ApiItemStyle>
    )
}

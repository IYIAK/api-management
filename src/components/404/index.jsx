import React from 'react'
import styled from "styled-components";

const NotFoundStyle = styled.div`
    font-size: 20px;
    color: #333;
`

export default function NotFound() {
    return (
        <NotFoundStyle>没有符合条件的结果</NotFoundStyle>
    )
}

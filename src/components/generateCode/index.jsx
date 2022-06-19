import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import HighLight from '../codeHighLight'

export default function GenerateCode({ visible, setVisible, closeCode, projectInfo, apiData }) {
    const [loading, setLoading] = useState(false);

    console.log(apiData);
    console.log(projectInfo)


    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const paramsToString = () => {
        const params = apiData.parameter.params
        if (params.length === 0) return ''

        let out = '?'
        for (let i in params) {
            if (i != 0) out += '&'
            out += params[i].name
            out += '='
            out += params[i].example === '无' ? 'null' : params[i].example
        }

        return out
    }

    const bodyToString = () => {
        const body = apiData.parameter.body
        if (body.length === 0) return ''

        let out = ',{\n'

        for (let i in body) {
            out += '    '
            out += body[i].name
            out += ' : '
            if (typeof (body[i].example) === 'string') {
                out += body[i].example === '无' ? 'null' : "'" + body[i].example + "'"
            } else {
                out += body[i].example ? body[i].example : 'null'
            }


            if (i != (body.length - 1)) {
                // console.log(typeof (i), typeof (body.length))
                out += ','
            }

            out += '\n'
        }

        out += '}'

        return out
    }

    return (
        <Modal
            visible={visible}
            title="接口请求代码模板"
            onOk={handleOk}
            onCancel={closeCode}
            footer={[
                <Button key="back" onClick={closeCode}>
                    返回
                </Button>,
            ]}
        >
            {/* <pre><code>axios.{apiData.method.toLowerCase() + '(\'' + projectInfo.baseUrl + apiData.path + paramsToString() + '\'' + bodyToString()}</code></pre> */}
            <HighLight textContent={'axios.' + apiData.method.toLowerCase() + '(\'' + projectInfo.baseUrl + apiData.path + paramsToString() + '\'' + bodyToString() + ')'} language="javascript"></HighLight>
        </Modal>

    );
}

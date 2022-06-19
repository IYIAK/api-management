import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import HighLight from '../codeHighLight'

export default function GenerateCode({ visible, setVisible, closeTS, projectInfo, apiData }) {
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

        let out = ''

        for (let i in params) {
            if (i != 0) out += ', '
            out += params[i].name
            out += ': '
            out += params[i].dataType
        }


        return out
    }

    const bodyToString = () => {
        const body = apiData.parameter.body
        if (body.length === 0) return ''

        let out = ''

        for (let i in body) {
            if (i != 0) out += ', '
            out += body[i].name
            out += ': '
            out += body[i].dataType
        }


        return out
    }

    const returnToString = () => {
        const returnType = apiData.returnType
        if (returnType.length === 0) return ''

        let out = ''

        for (let i in returnType) {
            if (i != 0) out += ', '
            out += returnType[i].name
            out += ': '
            out += returnType[i].type
        }


        return out
    }

    const generateString = () => {

        //axios.{apiData.method.toLowerCase() + '(\'' + projectInfo.baseUrl + apiData.path + paramsToString() + '\'' + bodyToString()}
        console.log(apiData)
        const start = "'" + apiData.path + "':{\n  "
        const end = "};"

        let spaces = ''
        for (let i = 0; i < apiData.method.length + 4; i++) {
            spaces += ' '
        }
        const mid = apiData.method.toLowerCase() + ": [\n" + spaces + "{" + paramsToString() + "},  //params\n" + spaces + "{" + bodyToString() + "},  //body\n" + spaces + "{" + returnToString() + "}  //returnType" + "\n" + spaces + "];\n"

        return start + mid + end

    }

    return (
        <Modal
            visible={visible}
            title="TypeScript接口定义"
            onOk={handleOk}
            onCancel={closeTS}
            footer={[
                <Button key="back" onClick={closeTS}>
                    返回
                </Button>,
            ]}
        >
            {/* <pre><code>{generateString()}</code></pre> */}
            <HighLight textContent={generateString()} language="javascript"></HighLight>

        </Modal>

    );
}

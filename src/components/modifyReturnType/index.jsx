import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default function ModifyBody({ data, setData }) {
    // console.log(data);

    const [dataSource, setDataSource] = useState(data ? data.returnType.map(v => ({ ...v, key: v._id })) : null)

    var columns = [
        {
            title: '????????????',
            dataIndex: 'name',
            width: '30%',
            editable: true,
            render: v => v ? v : '???'
        },
        {
            title: '????????????',
            dataIndex: 'required',
            render: v => v === true || v === 'true' || v === '???' || v === 'yes' ? '???' : '???',
            editable: true,
        },
        {
            title: '??????',
            dataIndex: 'type',
            editable: true,
            render: v => v ? v : 'Any'
        },
        {
            title: '??????',
            dataIndex: 'example',
            editable: true,
            render: v => v ? v : '???'
        },
        {
            title: '??????',
            dataIndex: 'discription',
            editable: true,
            render: v => v ? v : '???'
        },
        {
            title: '??????',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="?????????????" onConfirm={() => handleDelete(record.key)}>
                        <a>??????</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    columns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    var handleDelete = (key) => {
        setDataSource(dataSource.filter((item) => item.key !== key));

        let newApi = { ...data, returnType: dataSource.filter((item) => item.key !== key) }
        setData(newApi)
    };

    var handleAdd = () => {

        const newData = {
            key: dataSource.length,
            name: `test`,
            required: true,
            type: 'Any',
            example: `???`,
            discription: '???'
        };
        setDataSource(dataSource => [...dataSource, newData])

        let newApi = { ...data, returnType: [...data.returnType, newData] }
        setData(newApi)

    };

    var handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        setDataSource(newData)

        let newApi = { ...data, returnType: newData }
        setData(newApi)
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };



    return (
        <div>

            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            // rowKey={rec => rec._id}
            />
            <Button
                onClick={handleAdd}
                type="default"
                style={{

                    marginTop: 16,
                    marginRight: 10,
                    float: 'right'
                }}
            >
                ??????
            </Button>
        </div>
    );

}

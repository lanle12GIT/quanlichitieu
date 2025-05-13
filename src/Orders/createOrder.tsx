
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type CreateOrderProps = {
    isCreateOrder: boolean;
    setIsCreateOrder: React.Dispatch<React.SetStateAction<boolean>>;
    onSendData?: (data: FieldType) => void;

};
type NewOrderData = {
    name?: string;
    phone?: number;
    address?: string;
    money?: number;
    note?: string;
    time?: Date;
};

// FieldType cho Form, có thể giống NewOrderData
type FieldType = NewOrderData;

const CreateOrder: React.FC<CreateOrderProps> = ({ isCreateOrder, setIsCreateOrder, onSendData }) => {
    const [form] = Form.useForm(); // Hook để reset form

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        const data: NewOrderData = {
            name: values.name,
            phone: values.phone,
            address: values.address,
            money: values.money,
            note: values.note,
            time: values.time,
        };
        // Gọi hàm onSendData nếu có
        if (onSendData) {
            onSendData(data);
        }


        form.resetFields(); // Reset form sau khi gửi dữ liệu
        setIsCreateOrder(false); // Đóng form sau khi gửi dữ liệu


    };

    const handleCancel = () => {
        setIsCreateOrder(false);
        form.resetFields(); // Reset form khi hủy
    }

    return (<>
        {isCreateOrder &&
            <>
                <h1 style={{ marginLeft: "100px", marginBlock: "30px" }}> Thêm đơn hàng</h1>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left" // Thêm dòng này để căn trái label
                    style={{ maxWidth: 600, margin: '10px auto' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your customerName!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your customerPhone !' },
                        {
                            pattern: /^[0-9]+$/, // Chỉ cho phép các chữ số từ 0-9
                            message: 'Phone number must contain only digits!'
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your customerAddress!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="&nbsp;&nbsp;Money"
                        name="money"
                        rules={[{
                            pattern: /^[0-9]+$/, // Chỉ cho phép các chữ số từ 0-9
                            message: 'Money must contain only digits!'

                        },
                        ]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="&nbsp;&nbsp;Note"
                        name="note"

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="&nbsp;&nbsp;Time"
                        name="time"

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        <Button style={{ marginLeft: "5px" }} onClick={handleCancel}>Cancel </Button>
                    </Form.Item>

                </Form>
            </>
        }

    </>)
}
export default CreateOrder
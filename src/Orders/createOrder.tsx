
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import { Order, OrderStatus } from '../models/Order';

type CreateOrderProps = {
    isCreateOrder: boolean;
    setIsCreateOrder: React.Dispatch<React.SetStateAction<boolean>>;
    onSendData?: (data: Order) => void;
};

const CreateOrder: React.FC<CreateOrderProps> = ({ isCreateOrder, setIsCreateOrder, onSendData }) => {
    const [form] = Form.useForm(); // Hook để reset form

    const onFinish: FormProps<Order>['onFinish'] = (values) => {

        const data: Order = {
            name: values.name,
            phone: values.phone,
            address: values.address,
            money: values.money,
            note: values.note,
            status: values.status,
            createdAt: values.createdAt,
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
                    <Form.Item<Order>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your customerName!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Order>
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

                    <Form.Item<Order>
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your customerAddress!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Order>
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

                    <Form.Item<Order>
                        label="&nbsp;&nbsp;Note"
                        name="note"

                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item<Order>
                        label="&nbsp;&nbsp;Status"
                        name="status"
                    >
                        <Select
                            defaultValue=""
                            style={{ width: 120 }}
                            options={[
                                { value: OrderStatus.DAT_HANG, label: 'DAT_HANG' },
                                { value: OrderStatus.HUY, label: 'HUY' },
                                { value: OrderStatus.DA_THANH_TOAN, label: 'DA_THANH_TOAN' },
                                { value: OrderStatus.DANG_GIAO, label: 'DANG_GIAO' },
                                { value: OrderStatus.DA_GIAO, label: 'DA_GIAO' },
                            ]}
                            />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        <Button style={{ marginLeft: "5px" }} onClick={handleCancel}>Cancel </Button>
                    </Form.Item>

                </Form>
                {/* <span style={{ fontSize: "12px", color: "#888" }}>{messages}</span> */}

            </>
        }

    </>)
}
export default CreateOrder
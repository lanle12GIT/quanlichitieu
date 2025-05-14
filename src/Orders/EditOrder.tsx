
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import { Order, OrderStatus } from '../models/Order';

type EditOrderProps = {
    isEditOrder: boolean;
    editOrderData: Order;
    setIsEditOrder: React.Dispatch<React.SetStateAction<boolean>>;
    onSendData?: (data: Order) => void;

};

const EditOrder: React.FC<EditOrderProps> = ({ isEditOrder, editOrderData, setIsEditOrder, onSendData }) => {
    const [form] = Form.useForm(); // Hook để reset form

    const onFinish: FormProps<Order>['onFinish'] = (values) => {

        const data: Order = {
            id: editOrderData.id,
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
        setIsEditOrder(false); // Đóng form sau khi gửi dữ liệu
    };

    const handleCancel = () => {
        setIsEditOrder(false);
        form.resetFields(); // Reset form khi hủy
    }

    return (<>
        {isEditOrder &&
            <>
                <h1 style={{ marginLeft: "100px", marginBlock: "30px" }}> Sửa đơn hàng</h1>
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
                        initialValue={editOrderData.name} // Set giá trị mặc định từ editOrderData
                        rules={[{ required: true, message: 'Please input your customerName!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Order>
                        label="Phone Number"
                        name="phone"
                        initialValue={editOrderData.phone} // Set giá trị mặc định từ editOrderData
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
                        initialValue={editOrderData.address} // Set giá trị mặc định từ editOrderData
                        rules={[{ required: true, message: 'Please input your customerAddress!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Order>
                        label="&nbsp;&nbsp;Money"
                        name="money"
                        initialValue={editOrderData.money} // Set giá trị mặc định từ editOrderData
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
                        initialValue={editOrderData.note} // Set giá trị mặc định từ editOrderData
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Order>
                        label="&nbsp;&nbsp;Status"
                        name="status"
                    >
                        <Select
                            defaultValue={editOrderData.status}
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
                            Edit
                        </Button>

                        <Button style={{ marginLeft: "5px" }} onClick={handleCancel}>Cancel </Button>
                    </Form.Item>

                </Form>
            </>
        }

    </>)
}
export default EditOrder
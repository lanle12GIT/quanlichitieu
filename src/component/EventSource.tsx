import { Button, Card, Descriptions, notification, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "../app/store";
import { increment } from "../features/counter/counterSlice";
import { OrderStatus } from "../models/Order";
import { PlusOutlined } from '@ant-design/icons';
import { Order } from "../models/Order";
import instance from '../utils/axios.custom';

const statusColors: Record<string, string> = {
  pending: 'orange',
  confirmed: 'blue',
  delivered: 'green',
  cancelled: 'red',
};

const Notifications: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const [newOrder, setNewOrder] = useState<Order>({});
    const [isCreatedOrder, setIsCreatedOrder] = useState(false);

    useEffect(() => {
        const es = new EventSource("http://localhost:8080/sse/notifications");

        const handler = (e: MessageEvent) => {
            try {
                if (e.data) {

                    // Kiểm tra xem tin nhắn có chứa số điện thoại hay không
                    const phoneRegex = /\b\d{10,15}\b/; // Khớp với số có từ 10 đến 15 chữ số
                    if (phoneRegex.test(e.data)) {
                        console.log("Phát hiện số điện thoại:", e.data.match(phoneRegex));
                        const order: Order = {
                            name: "Order từ Facebook",
                            phone: e.data.match(phoneRegex)[0],
                            address: e.data,
                            status: OrderStatus.DAT_HANG
                        }
                        setNewOrder(order);
                        setIsCreatedOrder(true);
                    } else {
                        console.log("Không có số điện thoại trong tin nhắn:", e.data)
                    }

                    // Hiển thị thông báo bằng Ant Design
                    api.success({
                        message: 'Bạn có một thông báo mới',
                        description: e.data,
                        className: 'custom-class',
                        style: {
                            width: 600,
                        },
                    });

                    // Phát âm thanh
                    const audio = new Audio("/notification.mp3"); // Đường dẫn đến file âm thanh
                    audio.play().catch((e) => {
                        console.log("Không thể phát âm thanh: ", e);
                    });

                }
            } catch (err) {
                console.error("Payload SSE không hợp lệ", err);
            }
        };

        es.addEventListener("fb-comment", handler);


        return () => {
            es.removeEventListener("fb-comment", handler);
            es.close();
        };
    }, []);
const handleAddOrder = () => {
    const newData: Order = {
      ...newOrder
    };
    try {
      instance.post('api/orders', newData)
        .then(() => {
          store.dispatch(increment());
          setIsCreatedOrder(false);
          setNewOrder({})
          api.success({
                        message: 'Thêm đơn hàng thành công',
                        description: '',
                        className: 'custom-class',
                        style: {
                            width: 600,
                        },
                    });
        })
        .catch((error) => {
          console.error('Error adding order:', error);
        });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  }
    return (

        <>
            {contextHolder}
            <h2>Facebook Comment Notifications</h2>
            {/* // Show the new order if it received */}
            {isCreatedOrder && (
                <Card
      title="📝 Bình luận mới được nhận"
      bordered={false}
      style={{ maxWidth: 500, margin: '24px auto' }}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddOrder}
        >
          Thêm nhanh đơn hàng
        </Button>
      }
    >
      <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
        <Descriptions.Item label="Tên khách hàng">{newOrder.name}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{newOrder.phone}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{newOrder.address}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusColors[newOrder.status ?? 'pending'] || ''}>
            {(newOrder.status ?? '').toUpperCase()}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
            )}
        </>
    );
};

export default Notifications;

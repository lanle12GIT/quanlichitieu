import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import CreateOrder from '../Orders/createOrder';
import { EditOutlined } from '@ant-design/icons';
import { Order } from '../models/Order';
import instance from '../utils/axios.custom';
import EditOrder from '../Orders/EditOrder';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const Orders = () => {
  const [isCreateOrder, setIsCreateOrder] = useState(false);
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [editOrderData, setEditOrderData] = useState({} as Order);
  const [data, setData] = useState<Order[]>([]);

  const newMessage = useSelector((state: RootState) => state.value);

  const fetchData = async () => {
    try {
      const response = await instance.get('api/orders');
      const orders: Order[] = response.data as Order[];
      setData(orders);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  // Gọi lại fetchData khi có message mới
  useEffect(() => {
    if (newMessage) {
      console.log("Message mới từ store:", newMessage);
      fetchData();
    }
  }, [newMessage]); // 👈 phụ thuộc vào message

  const handleAddOrder = (newOrderData: Order) => {
    newOrderData.id = (data.length + 1).toString();
    const newData: Order = {
      ...newOrderData
    };
    try {
      instance.post('api/orders', newData)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error('Error adding order:', error);
        });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  }

  const handleEditOrder = (record: Order) => {
    setIsEditOrder(true);
    setEditOrderData(record);
    console.log("check edit", record);
  }
  const handleSubmitEditOrder = (editOrderData: Order) => {
    const updatedData: Order = {
      ...editOrderData
    };
    try {
      instance.put(`api/orders/${editOrderData.id}`, updatedData)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error('Error updating order:', error);
        });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1,

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <span style={{
            color:
              record.status === "DAT HANG" ? "blue" :
                record.status === "HUY" ? "gray" :
                  record.status === "DA THANH TOAN" ? "purple" :
                    record.status === "DANG GIAO" ? "orange" :
                      record.status === "DA GIAO" ? "teal" : "red"
          }}>
            {record.status}
          </span>
        )
      }
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditOrder(record)}> Edit<EditOutlined /></a>
        </Space>
      ),
    },
  ];




  return (
    <>
      {
        (!isCreateOrder && !isEditOrder) && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between', // Đẩy các item ra hai đầu
              alignItems: 'center', // Căn giữa theo chiều dọc
              marginTop: "20px", // Giữ lại margin top nếu cần
              marginBottom: "20px" // Thêm margin bottom để tách biệt với bảng
            }}>
              <h1 style={{ color: "red", marginTop: "15px", marginLeft: "30px" }}> ĐƠN HÀNG CỦA BẠN</h1>
              <Button type="primary" onClick={() => { setIsCreateOrder(true) }}>Create a order</Button>
            </div>

            <Table<Order> columns={columns} dataSource={data} />
          </>
        )
      }
      {
        isCreateOrder &&
        <CreateOrder
          isCreateOrder={isCreateOrder}
          setIsCreateOrder={setIsCreateOrder}
          // truyền hàm handleAddOrder từ component cha xuống component con
          onSendData={handleAddOrder}
        />
      }

      {isEditOrder && (
        <EditOrder
          isEditOrder={isEditOrder}
          editOrderData={editOrderData}
          setIsEditOrder={setIsEditOrder}
          // truyền hàm handleAddOrder từ component cha xuống component con
          onSendData={handleSubmitEditOrder}
        />
      )}

    </>
  )
}
export default Orders;

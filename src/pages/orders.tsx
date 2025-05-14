import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import CreateOrder from '../Orders/createOrder';
import { EditOutlined  } from '@ant-design/icons';



interface DataType {
  key: string;
  name: string;
  phone: string;
  address: string;
  money: number;
  note: string;
  time: Date;

}



const Orders = () => {
  const [isCreateOrder, setIsCreateOrder] = useState(false);
  const [data, setData] = useState<DataType[]>([
    {
      key: '1',
      name: 'John Doe',
      phone: "0123456789",
      address: 'New York No. 1 Lake Park',
      money: 100000,
      note: 'good',
      time: new Date(),

    },
    {
      key: '2',
      name: 'John Brown',
      phone: "0098765432",
      address: 'New York No. 1 Lake Park',
      money: 120000,
      note: 'good',
      time: new Date(),

    },
  ]);

  // Omit là loại bỏ các thuộc tính trong kiểu dữ liệu
  const handleAddOrder = (newOrderData: Omit<DataType, 'key'>) => {
    
    console.log("check ", newOrderData);
    const newData: DataType = {
      key: (data.length + 1).toString(), // Tạo key mới cho đơn hàng
      ...newOrderData
    };
    setData(prevData => [...prevData, newData]) // Gộp dữ liệu mới vào data
  }
  const handleEditOrder= (record:DataType) => {
    console.log("check edit", record);
  }

  const columns: TableProps<DataType>['columns'] = [
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
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>handleEditOrder(record)}> Edit<EditOutlined /></a>
        </Space>
      ),
    },
  ];



  return (
    <>
      {!isCreateOrder ? (
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

          <Table<DataType> columns={columns} dataSource={data} />
        </>) : (
        <CreateOrder
          isCreateOrder={isCreateOrder}
          setIsCreateOrder={setIsCreateOrder}
          // truyền hàm handleAddOrder từ component cha xuống component con
          onSendData={handleAddOrder}
        />
      )}

    </>
  )
}
export default Orders;

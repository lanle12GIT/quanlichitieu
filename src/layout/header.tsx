import { AppstoreOutlined, BarChartOutlined, HomeOutlined, LoginOutlined, WalletOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { NavigateFunction, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {

  //  const navigate: NavigateFunction = useNavigate();
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const items: MenuItem[] = [
    {
      label:<Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/orders">Đơn Hàng</Link>,
      key: 'app',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/spending">Chi tiêu</Link>,
      key: 'spend',
      icon:<WalletOutlined />,

    },
    {
      label:<Link to="/statistics">Thống Kê</Link>,
      key: 'statistic',
      icon: <BarChartOutlined />,
    },
    {
      label: <Link to="/login">Đăng Nhập</Link>, 
      key: 'login',
      icon: <LoginOutlined />,

    },
  ];

  return (
    <Menu 
    onClick={onClick} 
    selectedKeys={[current]}
     mode="horizontal" items={items} />
  )

}
export default Header
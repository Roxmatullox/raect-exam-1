import  { useState } from 'react';

import   "./AdminLayout.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
const { Header, Sider, Content } = Layout;

import NavLogo from "../../../assets/images/nav-logo.svg";


const AdminLayout = () => {

  const {isAuth} = useContext(AuthContext)

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  return (
    <Layout className='admin-layout'>
      <Sider className='admin-aside' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/dashboard',
              icon: <UserOutlined />,
              label: <NavLink to="/dashboard" >Dashboard</NavLink>,
            },
            {
              key: '/all-categories',
              icon: <UserOutlined />,
              label: <NavLink to="/all-categories" >All categories</NavLink>,
            },
            {
              key: '/all-users',
              icon: <UserOutlined />,
              label: <NavLink to="/all-users" >All users</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor:"#001529",
            padding: 0,
            background: colorBgContainer,
            display:"flex"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
           <Flex className='container dashboard-nav' justify='space-between' style={{
            width:"100%"
           }}>
                <div className="header-left">
                {
                  isAuth ? <NavLink to="myPosts">My posts</NavLink> : <NavLink to=""><img src={NavLogo} alt="" /></NavLink> 
                }
                </div>
                <div className="header-right">
                  <NavLink to="">Home</NavLink>
                  <NavLink to="all-posts">Blog</NavLink>
                  <NavLink to="about">About Us</NavLink>
                  <NavLink to="register">Register</NavLink>
                  {
                    isAuth ? <NavLink to="account"><button>Account</button></NavLink> : <NavLink to="login"><button>Login</button></NavLink> 
                  }
                </div>
            </Flex>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className='admin-main'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
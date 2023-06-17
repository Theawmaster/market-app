import React, { useEffect, useState } from "react";
import "../assets/DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  DollarOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div
          class="spinner-border"
          role="status"
        >
        </div>
        </div> 
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="brand">
          <h3>The AM POS</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: <Link to="/home">Home</Link>,
            },
            {
              key: " /receipts",
              icon: <DollarOutlined />,
              label: <Link to="/receipts">Receipts</Link>,
            },
            {
              key: "/items",
              icon: <UnorderedListOutlined />,
              label: <Link to="/items">Items</Link>,
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex", // Add this line
            alignItems: "center", // Add this line
            justifyContent: "space-between", // Add this line
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate("/cart")}
          >
            <b className="mt-1 mr-5">{cartItems.length}</b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
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

  const profilePicture = localStorage.getItem('profilePicture'); // Retrieve profile picture from LocalStorage

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="brand">
          <h3>{collapsed ? "TAM" : "The AM Market"}</h3>
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
              key: "/cart",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/cart">Cart</Link>,
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
              onClick: () => {
                localStorage.removeItem("pos-user");
                navigate("/login");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              width: "64px",
              height: "64px",
              border: "1px solid #d9d9d9",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            {collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <img
            src={profilePicture}
            alt="Profile"
            style={{
              width: "66px", // Increase the width and height for a larger profile picture
              height: "66px",
              borderRadius: "50%",
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

// CommonLayout.tsx
import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import LogoImage from "../../assets/images/deskapp-logo.svg";
import { Outlet } from "react-router-dom";
import {
  HomeOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"; // Import các icon cần thiết
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/user";
import HeaderLayout from "../../components/Header/Header";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const CommonLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { role } = useUserStore((state) => state.user) || {}; // Lấy vai trò của người dùng từ store

  // Điều kiện hiển thị menu theo vai trò
  const getMenuItems = () => {
    switch (role) {
      case "ADMIN":
        return [
          {
            key: "1",
            icon: <HomeOutlined style={{ fontSize: "24px" }} />,
            label: "Get Started",
            onClick: () => navigate("/get-started"), // Navigate to home
          },
          {
            key: "2",
            icon: <UserOutlined style={{ fontSize: "24px" }} />,
            label: "User Management",
            children: [
              {
                key: "2-1",
                label: "User Table",
                onClick: () => navigate("/admin/user-management"), // Navigate to user page 1
              },
            ],
          },
        ];
      case "CUSTOMER":
        return [
          {
            key: "1",
            icon: <HomeOutlined style={{ fontSize: "24px" }} />,
            label: "Get Started",
            onClick: () => navigate("/get-started"), // Navigate to home
          },
          {
            key: "2",
            icon: <UserOutlined style={{ fontSize: "24px" }} />,
            label: "Customer Ticket",
            children: [
              {
                key: "2-1",
                label: "New Pentest Ticket",
                onClick: () => navigate("/customer/ticket"), // Navigate to user page 1
              },
              {
                key: "2-2",
                label: "Request Status",
                onClick: () => navigate("/customer/request-status"), // Navigate to user page 1
              },
            ],
          },
        ];
      case "SOCMANAGER":
        return [
          {
            key: "1",
            icon: <HomeOutlined style={{ fontSize: "18px" }} />,
            label: "Get Started",
            onClick: () => navigate("/get-started"), // Navigate to home
          },
          {
            key: "2",
            icon: <UserOutlined style={{ fontSize: "18px" }} />,
            label: "Request Management",
            children: [
              {
                key: "2-2",
                label: "Pending Ticket",
                onClick: () => navigate("/socmanager/pending-ticket"), // Navigate to user page 1
              },
              {
                key: "2-3",
                label: "Approved Ticket",
                onClick: () => navigate("/socmanager/approved-ticket"), // Navigate to user page 1
              },
            ],
          },
          {
            key: "3",
            icon: <SettingOutlined style={{ fontSize: "18px" }} />,
            label: "Workflow Management",
            children: [
              {
                key: "3-1",
                label: "Project Management",
                onClick: () => navigate("/socmanager/project-management"), // Navigate to user page 1
              },
              {
                key: "3-2",
                label: "Team Management",
                onClick: () => navigate("/socmanager/team-management"), // Navigate to user page 1
              },
            ],
          },
        ];
      case "LEADER":
        return [
          {
            key: "1",
            icon: <HomeOutlined style={{ fontSize: "24px" }} />,
            label: "Get Started",
            onClick: () => navigate("/get-started"), // Navigate to home
          },
          {
            key: "2",
            icon: <ProjectOutlined style={{ fontSize: "24px" }} />,
            label: "Project Management",
            children: [
              {
                key: "2-1",
                label: "Project Assignment",
                onClick: () => navigate("/leader/project-assignment"), // Navigate to user page 1
              },
              {
                key: "2-2",
                label: "Ongoing Project",
                onClick: () => navigate("/leader/project-ongoing"), // Navigate to user page 1
              },
            ],
          },
          {
            key: "3",
            icon: <TeamOutlined style={{ fontSize: "24px" }} />,
            label: "Team Management",
            onClick: () => navigate("/leader/teamlead-management"), // Navigate to home
          },
        ];
      default:
        return [];
    }
  };

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={280}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#fff",
          paddingTop: 20,
        }}
      >
        <div style={{ textAlign: "center" }}>
          {!collapsed && (
            <img
              src={LogoImage}
              alt="Logo"
              style={{
                maxWidth: 150,
                transition: "max-width 0.2s",
                paddingLeft: "10px",
              }}
            />
          )}
        </div>
        <div className="pt-5">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["home"]}
            items={getMenuItems()}
            style={{
              fontSize: "18px",
              fontWeight: "inherit",
              textAlign: "center",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
      <Layout
        style={{
          marginInlineStart: collapsed ? 80 : 280,
          transition: "margin-inline-start 0.2s",
        }}
      >
        <Header
          style={{
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <HeaderLayout />
        </Header>
        <Content
          style={{
            margin: "40px 24px 0",
            overflow: "initial",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;

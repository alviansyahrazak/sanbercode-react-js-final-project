import React from "react";
import CreateBy from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Layout } from "antd";
import Cookies from "js-cookie";

const { Content } = Layout;

const LayoutComponent = (props) => {
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          {Cookies.get("token") !== undefined && <Sidebar />}
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 0  ,
                margin: 0,
                minHeight: 600,
              }}
            >
              {props.content}
            </Content>
          </Layout>
        </Layout>
        <CreateBy />
      </Layout>
    </>
  );
};

export default LayoutComponent;

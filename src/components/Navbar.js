import React, { useContext } from "react";
import Logo from "../assets/img/alvixplaylogo.png";
import { Button, Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  let history = useHistory();
  const { setLoginStatus } = useContext(UserContext);

  const handleLogout = () => {
    setLoginStatus(false);
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("password");

    history.push("/login");
  };

  return (
    <>
      <Header className="header">
        <Link to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        {Cookies.get("token") !== undefined && (
          <Button onClick={handleLogout} className="header-btn">
            Logout <LogoutOutlined />
          </Button>
        )}
        {Cookies.get("token") === undefined && (
          <Link to={"/login"}>
            <Button className="header-btn">
              Sign in <LoginOutlined />
            </Button>
          </Link>
        )}

        <div className="menu-nav">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["nav1"]}>
            <Menu.Item className="menu-li-navbar" key={"nav1"}>
              <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item className="menu-li-navbar" key={"nav2"}>
              <Link to={"/movies"}>Movies</Link>
            </Menu.Item>
            <Menu.Item className="menu-li-navbar" key={"nav3"}>
              <Link to={"/games"}>Games</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    </>
  );
};

export default Navbar;

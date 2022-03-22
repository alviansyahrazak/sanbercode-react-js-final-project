import { Layout, Menu } from "antd";
import {
  PlaySquareOutlined,
  RocketOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
  return (
    <>
      <div className="sider-container">
        <Sider className="sider" width={240}>
          <Menu
            className="menu-sider"
            mode="inline"
            defaultSelectedKeys={["sidebar"]}
            defaultOpenKeys={[""]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              className="submenu-sider"
              key="side1"
              icon={<PlaySquareOutlined />}
              style={{}}
              title="Movies"
            >
              <li className="menu-item-sider" key="sidemenu1">
                <Link className="menu-link-sider" to={"/movies-list"}>
                  Movies List
                </Link>
              </li>
              <li className="menu-item-sider" key="sidemenu2">
                <Link className="menu-link-sider" to={"/add-movies"}>
                  Add Movies
                </Link>
              </li>
            </SubMenu>
            <SubMenu
              className="submenu-sider"
              key="side2"
              icon={<RocketOutlined />}
              title="Games"
            >
              <li className="menu-item-sider" key="sidemenu3">
                <Link className="menu-link-sider" to={"/games-list"}>
                  Games List
                </Link>
              </li>
              <li className="menu-item-sider" key="sidemenu4">
                <Link className="menu-link-sider" to={"/add-games"}>
                  Add Games
                </Link>
              </li>
            </SubMenu>
            <SubMenu
              className="submenu-sider"
              key="side3"
              icon={<SettingOutlined />}
              title="Configuration"
            >
              <li className="menu-item-sider" key="sidemenu5">
                <Link className="menu-link-sider" to={"/change-password"}>
                  Change Password
                </Link>
              </li>
            </SubMenu>
          </Menu>
        </Sider>
      </div>
    </>
  );
};

export default Sidebar;

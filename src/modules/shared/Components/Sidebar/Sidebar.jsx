import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/3.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { loginData } = useContext(AuthContext);
  let togeleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

 
  return (
    <div className="sidebar-container ">
      <Sidebar collapsed={isCollapsed} className="sidebar-main">
        <Menu className="my-auto">
          <MenuItem
            onClick={togeleCollapse}
            icon={<img src={logo} className="sidebar-icon" alt="" />}
            className="logo-menu-item ms-1 my-5"
          >
            {" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-home"></i>}
            component={<Link to="/dashboard" />}
          >
            Home{" "}
          </MenuItem>
          {loginData?.userGroup != "SystemUser" ? (
            <MenuItem
              icon={<i className="fa fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users{" "}
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem
            icon={<i className="fa fa-table"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            {" "}
            Recipes{" "}
          </MenuItem>
          {loginData?.userGroup != "SystemUser" ? (
            <MenuItem
              icon={<i className="fa fa-table-cells"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              {" "}
              Categories{" "}
            </MenuItem>
          ) : (
            ""
          )}
          {loginData?.userGroup == "SystemUser" ? (
            <MenuItem
              icon={<i className="fa fa-heart"></i>}
              component={<Link to="/dashboard/favorites" />}
            >
              {" "}
              Favourits{" "}
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem
            icon={<i className="fa fa-unlock-keyhole"></i>}
            component={<Link to="/dashboard/change-password" />}
          >
            {" "}
            Change password{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("foodAppToken");
            }}
            icon={<i className="fa fa-arrow-right-from-bracket"></i>}
            component={<Link to="/login" />}
          >
            {" "}
            Log Out{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

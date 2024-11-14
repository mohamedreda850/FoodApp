import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/3.png";
import { useState } from "react";
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
          <MenuItem
            icon={<i className="fa fa-users"></i>}
            component={<Link to="/dashboard/users" />}
          >
            {" "}
            Users{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-table"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            {" "}
            Recipes{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-table-cells"></i>}
            component={<Link to="/dashboard/categories" />}
          >
            {" "}
            Categories{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-unlock-keyhole"></i>}
            component={<Link to="" />}
          >
            {" "}
            Change password{" "}
          </MenuItem>
          <MenuItem
          onClick={()=>{localStorage.removeItem("foodAppToken")}}
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

import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebar/Sidebar";
import Navbar from "./../Components/Navbar/Navbar";


export default function  MainLayout() {
  return (
    <div className="d-flex ">
      
        {" "}
        <SideBar />
      

      <div className="w-100">
        <Navbar  />
        
        <Outlet />
      </div>
    </div>
  );
}

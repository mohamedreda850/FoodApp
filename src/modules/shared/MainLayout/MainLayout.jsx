import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar/SideBar";
import Navbar from "./../Components/Navbar/Navbar";


export default function  MainLayout({loginData}) {
  return (
    <div className="d-flex ">
      
        {" "}
        <SideBar />
      

      <div className="w-100">
        <Navbar loginData={loginData} />
        
        <Outlet />
      </div>
    </div>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebar/SideBar";
import Navbar from "./../Components/Navbar/Navbar";
import Header from './../Components/Header/Header';

export default function  MainLayout({loginData}) {
  return (
    <div className="d-flex">
      <div className="">
        {" "}
        <SideBar />
      </div>

      <div className="w-100">
        <Navbar loginData={loginData} />
        
        <Outlet />
      </div>
    </div>
  );
}

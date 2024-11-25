import React from "react";
import { Outlet } from "react-router-dom";
import logo from "./../../../assets/images/logo.png";


export default function AuthLayout() {
  return (
    <div className="auth-container ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center p-4 align-items-center">
          <div className="col-lg-6 col-md-9 bg-white rounded rounded-2 px-5 py-4 ">
            <div>
              <div className="logo-container text-center">
                <img src={logo} className="w-75" alt="" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

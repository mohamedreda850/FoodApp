import React from "react";
import logo from "./../../../../assets/images/logo.png";
import wave from "./../../../../assets/images/vector.png";
import NotFoundimg from "./../../../../assets/images/404.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className=" vh-100 position-relative">
        <img src={logo} className="img-fluid m-5" alt="" />
        <div className="m-5">
          <h1 className="fw-bolder notfound-h1">Opps</h1>
          <h3 className="text-success">Page not found </h3>
          <p className="text-light-emphasis fs-5">
            This Page doesn’t exist or was removed! We suggest you back to home.
          </p>
          <button className="btn btn-success">
            <Link to="/dashboard" className="notfoundLink mx-3 my-3">back to home</Link>
          </button>
        </div>
        <div className="position-absolute notFound  ">
          <img className="notFound-img" src={wave} alt="" />
          <img
            src={NotFoundimg}
            className="position-absolute notFound"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

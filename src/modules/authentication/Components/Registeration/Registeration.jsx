import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./../../../../assets/images/logo.png";
import { Link } from "react-router-dom";
export default function Registeration() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data1) => {
    try {
      const { data } = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        data1
      );
      console.log(data);
      toast.success("register Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="auth-container ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center p-4 align-items-center">
          <div className="col-lg-6 col-md-8 bg-white rounded rounded-2 px-5 py-4 ">
            <div>
              <div className="logo-container text-center">
                <img src={logo} className="w-75" alt="" />
              </div>
              <div className="title my-3">
                <h3 className="h5">Login</h3>
                <span className="text-muted">
                  Welcome Back! Please enter your details
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row ">
                  {" "}
                  <div className="input-group col">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter your name"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      {...register("userName", {
                        required: "Email is required",
                        pattern: true
                      })}
                    />
                  </div>
                  {errors.userName  && (
                    <span className="text-danger">{errors.userName.message}</span>
                  )}
                  <div className="input-group col">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter your email"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                  </div>
                  <div className="row mt-3">
                  <div className="input-group col">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter your country"
                      aria-label="country"
                      aria-describedby="basic-addon1"
                      {...register("country", {
                        required: "country  is required",
                        pattern: true
                      })}
                    />
                  </div>
                  {errors.country  && (
                    <span className="text-danger">{errors.country.message}</span>
                  )}
                  <div className="input-group col">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter your phone number"
                      aria-label="phoneNumber"
                      aria-describedby="basic-addon1"
                      {...register("phoneNumber", {
                        required: "Email is required",
                        pattern: true
                      })}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-danger">{errors.phoneNumber.message}</span>
                  )}
                  </div>
                  <div className="row mt-3">
                  <div className="input-group col">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control "
                      placeholder="Enter your password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-danger ">
                      {errors.password.message}
                    </span>
                  )}
                  <div className="input-group col">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control "
                      placeholder="Reenter your password"
                      aria-label="confirmPassword"
                      aria-describedby="basic-addon1"
                      {...register("confirmPassword", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-danger ">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <div className="links d-flex justify-content-end">
                  <Link
                    to="/login"
                    className="text-decoration-none text-success"
                  >
                    Login Now
                  </Link>
                 
                </div>
                <button type="submit" className="btn-success w-100 btn my-2">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

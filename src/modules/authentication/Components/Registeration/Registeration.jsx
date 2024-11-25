import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./../../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { AUTH_URLS, axiosInstans, USERS_URLS } from "../../../../services/urls/urls";
import {
  EMAIL_VALIDATION,
  NAME_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_NUMBER_VALIDATION,
} from "../../../../services/validations/validation";
export default function Registeration() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [loader, setLoader] = useState(false);
  const onSubmit = async (data1) => {
    setLoader(true);
    try {
      const { data } = await axiosInstans.post(AUTH_URLS.REGISTER, data1);
      setLoader(data);
      toast.success("register Successfully");
      navigate("/verfy-password");
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoader(false);
    } finally {
    }
  };
  const password = watch("password");
  return (
    <>
      <div className="title my-3">
        <h3 className="h5">Register</h3>
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
              {...register("userName", NAME_VALIDATION)}
            />
          </div>
          {errors.userName && (
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
              {...register("email", EMAIL_VALIDATION)}
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
                pattern: true,
              })}
            />
          </div>
          {errors.country && (
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
              {...register("phoneNumber", PHONE_NUMBER_VALIDATION)}
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
              type={isPasswordVisible ? "text" : "password"}
              className="form-control "
              placeholder="Enter your password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", PASSWORD_VALIDATION)}
            />
            <button
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              className="input-group-text"
              id="basic-addon1"
            >
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-danger ">{errors.password.message}</span>
          )}
          <div className="input-group col">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
            <input
              type={isReEnterPasswordVisible ? "text" : "password"}
              className="form-control "
              placeholder="Reenter your password"
              aria-label="confirmPassword"
              aria-describedby="basic-addon1"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
            <button
              onClick={() => {
                setIsReEnterPasswordVisible(!isReEnterPasswordVisible);
              }}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              className="input-group-text"
              id="basic-addon1"
            >
              {isReEnterPasswordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-danger ">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="links d-flex justify-content-end">
          <Link to="/login" className="text-decoration-none text-success">
            Login Now
          </Link>
        </div>
        <button
          type="submit"
          disabled={loader}
          className="btn-success w-100 btn my-2"
        >
          {loader ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </>
  );
}

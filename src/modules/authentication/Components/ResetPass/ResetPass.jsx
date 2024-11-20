import React, { useState } from "react";
import logo from "./../../../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstans, USERS_URLS } from "../../../../services/urls/urls";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validations/validation";

export default function ResetPass() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({defaultValues:{email:location.state.email}});
  const onSubmit = async (data1) => {
    setLoader(true);
    try {
      const { data } = await axiosInstans.post(USERS_URLS.FORGET_PASS, data1);

      toast.success("Reset Password Is Successfully");
      setLoader(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };
  const password = watch("password");
  return (
    <>
      <div className="title my-3">
        <h3 className="h5"> Reset Password</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox{" "}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group ">
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
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key"></i>
          </span>
          <input
            type="text"
            className="form-control "
            placeholder="otp"
            aria-label="seed"
            aria-describedby="basic-addon1"
            {...register("seed", {
              required: "otp is required",
            })}
          />
        </div>
        {errors.seed && (
          <span className="text-danger ">{errors.seed.message}</span>
        )}
       <div className="input-group mt-3">
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
      <div className="input-group mt-3">
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
          <span className="text-danger ">{errors.confirmPassword.message}</span>
        )}

        <button type="submit" disabled={loader} className="btn-success w-100 btn my-3">
          {loader ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </>
  );
}

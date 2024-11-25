import React, { useContext, useState } from "react";
import logo from "./../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { PASSWORD_VALIDATION } from "../../../../services/validations/validation";
import { AUTH_URLS, axiosInstans } from "../../../../services/urls/urls";
import { toast } from "react-toastify";

export default function ChangePass() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] =
    useState(false);

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = async (data1) => {
    try {
      const { data } = await axiosInstans.put(
        AUTH_URLS.CHANGE_PASSWORD,
        data1,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("foodAppToken")}`,
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      localStorage.removeItem("foodAppToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const newPassword = watch("newPassword");
  return (
    <>
      <div className=" ">
        <div className="container-fluid ">
          <div className="row vh-100 justify-content-center p-4 align-items-center ">
            <div className="col-lg-5 col-md-8 bg-white rounded rounded-2 px-5 py-4 changePassContainer">
              <div>
                <div className="logo-container text-center">
                  <img src={logo} className="w-75" alt="" />
                </div>
                <div className="title my-3">
                  <h3 className="h5">Change Your Password</h3>
                  <span className="text-muted">Enter your details below</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type={isOldPasswordVisible ? "text" : "password"}
                      className="form-control "
                      placeholder="Old password"
                      aria-label="oldPassword"
                      aria-describedby="basic-addon1"
                      {...register("oldPassword", PASSWORD_VALIDATION)}
                    />
                    <button
                      onClick={() => {
                        setIsOldPasswordVisible(!isOldPasswordVisible);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                      type="button"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      {isOldPasswordVisible ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  </div>

                  {errors.oldPassword && (
                    <span className="text-danger ">
                      {errors.oldPassword.message}
                    </span>
                  )}

                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="form-control "
                      placeholder="New Password"
                      aria-label="newPassword"
                      aria-describedby="basic-addon3"
                      {...register("newPassword", PASSWORD_VALIDATION)}
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
                  {errors.newPassword && (
                    <span className="text-danger ">
                      {errors.newPassword.message}
                    </span>
                  )}
                  <div className="input-group my-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type={isReEnterPasswordVisible ? "text" : "password"}
                      className="form-control "
                      placeholder="Confirm New Password"
                      aria-label="confirmNewPassword"
                      aria-describedby="basic-addon1"
                      {...register("confirmNewPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === newPassword || "The passwords do not match",
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
                      id="basic-addon4"
                    >
                      {isReEnterPasswordVisible ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                  {errors.confirmNewPassword && (
                    <span className="text-danger ">
                      {errors.confirmNewPassword.message}
                    </span>
                  )}

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn-success w-100 btn my-2"
                  >
                    {isSubmitting ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

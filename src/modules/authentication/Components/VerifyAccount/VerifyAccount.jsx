import React from "react";
import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../../../services/validations/validation";
import { AUTH_URLS, axiosInstans } from "../../../../services/urls/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VerifyAccount() {
    const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data1) => {
    try {
      const { data } = await axiosInstans.put(AUTH_URLS.VERIFY_ACCOUNT, data1);
        console.log(data);
        toast.success(data.message)
        navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <div className="title my-3">
        <h3 className="h5">Register</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row ">
          {" "}
          <div className="input-group mt-3">
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
              aria-label="code"
              aria-describedby="basic-addon1"
              {...register("code", {
                required: "otp is required",
              })}
            />
          </div>
          {errors.code && (
            <span className="text-danger ">{errors.code.message}</span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-success w-100 btn my-2"
          >
            {isSubmitting ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

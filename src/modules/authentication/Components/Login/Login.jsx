import React from "react";
import logo from "./../../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { axiosInstans, USERS_URLS } from "../../../../services/urls/urls";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validations/validation";
export default function Login({ saveLoginData }) {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data1) => {
    setLoader(true)
    try {
      const { data } = await axiosInstans.post(USERS_URLS.LOGIN , data1);
      localStorage.setItem("foodAppToken", data.token);
      saveLoginData()
      toast.success("Login Successfully");
      setLoader(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };
  return (
    <div className="auth-container ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center p-4 align-items-center">
          <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-4 ">
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
                    {...register("email",EMAIL_VALIDATION ,
                    )}
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
                    type="password"
                    className="form-control "
                    placeholder="Enter your password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                    {...register("password", PASSWORD_VALIDATION)}
                  />
                </div>
                {errors.password && (
                  <span className="text-danger ">
                    {errors.password.message}
                  </span>
                )}

                <div className="links d-flex justify-content-between">
                  <Link
                    to="/register"
                    className="text-decoration-none text-success"
                  >
                    Register Now
                  </Link>
                  <Link to="/forget-password" className="text-decoration-none">
                    Forget Password
                  </Link>
                </div>
                <button type="submit" className="btn-success w-100 btn my-2">
                {loader?  <i className="fa fa-spinner fa-spin"></i>:'Login' }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

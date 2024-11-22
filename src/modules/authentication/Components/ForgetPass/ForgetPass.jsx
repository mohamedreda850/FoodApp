import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { AUTH_URLS, axiosInstans} from "../../../../services/urls/urls";
import { EMAIL_VALIDATION } from "../../../../services/validations/validation";
import { useState } from "react";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data1) => {
    setLoader(true);
    try {
      const { data } = await axiosInstans.post(AUTH_URLS.RESET_REQUEST, data1);
      setLoader(false);
      toast.success(data.message);
      navigate("/reset-password",{state:{email:data1.email}});
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };
  return (
    <>
      <div className="title my-3">
        <h3 className="h5">Forgot Your Password?</h3>
        <span className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group my-3">
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

        <button type="submit" disabled={loader} className="btn-success w-100 btn my-5">
          {loader ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </form>
    </>
  );
}

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Login_img from "../assets/images/login_img.jpeg";
import Nav from "./Nav";

const Login: React.FC = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  const onSubmitHandler = (data: any) => {
    handleLogin(data);
  };

  const handleLogin = async (data: any) => {
    try {
      let result:any = await axios.post(
        "http://localhost:8800/api/auth/login",
        data
      );
      result = await result.data;
      localStorage.setItem("accessToken", result.token);
      if (result.user.isAdmin) {
        navigate("/admin_dashboard");
      } else {
        navigate("/user_dashboard");
      }
    } catch (err: any) {
      console.log(err);
               setErr(err.response.data.message);

    }
  };
  
  return (
    <>
      <Nav />
      <div className="container mt-5 d-flex flex-lg-row flex-sm-column">
        <div className="col-lg-5 pt-5">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1>Login</h1>
            <div className="mt-5 mb-3 col-lg-7">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3 col-lg-7">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChange}
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors?.password && (
                <p className="text-danger">{errors?.password?.message}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {err && <p className="text-danger">{err}</p>}
        </div>
        <div className="col-lg-6 mx-sm-auto">
          <img src={Login_img} alt="" width="700" height="600" />
        </div>
      </div>
    </>
  );
};

export default Login;

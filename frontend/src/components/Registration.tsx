import { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Register_img from "../assets/images/register_img.jpeg";
import { useForm } from "react-hook-form";

const Registration: React.FC = () => {

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
    handleRegister(data);
  };

  const handleRegister = async (data: any) => {
    try {
      console.log(data);
      await axios.post("http://localhost:8800/api/auth/register", data);
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      setErr(err.response.data.message);
    }
  };
  
  return (
    <>
      <Nav />
      <div className="container mt-5 d-flex flex-lg-row p-3 flex-sm-column">
        <div className="col-lg-7">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1>Register</h1>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("name", {
                  required: "This field is required",
                })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("phone_number", {
                  required: "This field is required",
                })}
              />
              {errors.phone_number && (
                <p className="text-danger">{errors.phone_number.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="email" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("address", {
                  required: "This field is required",
                })}
              />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
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
            <div className="mt-3 col-lg-7">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className="mt-3 btn btn-primary">
              Register
            </button>
          </form>
          {err && <p className="text-danger">{err}</p>}
        </div>
        <div className="col-lg-7 mt-sm-3 mx-sm-auto">
          <img src={Register_img} alt="" width="500" height="600" />
        </div>
      </div>
    </>
  );
};

export default Registration;

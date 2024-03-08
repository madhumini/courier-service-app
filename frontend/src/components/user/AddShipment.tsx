import { useForm } from "react-hook-form";
import Nav from "./Nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddShipment = () => {
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  const onSubmitHandler = (data: any) => {
    setUploading(true);
    handleAddShipment(data);
  };

  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleAddShipment = async (data: any) => {
    try {
      console.log(data);
      await axios.post(
        "http://localhost:8800/api/create-shipment",
        data,
        config
      );
      setUploading(false);
      navigate("/user_dashboard");
    } catch (err: any) {
      console.log(err);
      setErr(err.response.data.message);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5 d-flex flex-lg-row p-3 flex-sm-column">
        {uploading && (
          <>
            <h1 className="text-success mb-3">Uploading</h1>
            <div className="spinner-border" role="status"></div>
          </>
        )}
        <div className="col-lg-7">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1>Create Shipment</h1>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Recepient Name
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("recipient_name", {
                  required: "This field is required",
                })}
              />
              {errors.recipient_name && (
                <p className="text-danger">{errors.recipient_name.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Recepient Address
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("recipient_address", {
                  required: "This field is required",
                })}
              />
              {errors.recipient_address && (
                <p className="text-danger">
                  {errors.recipient_address.message}
                </p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Payment Method
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("payment_method", {
                  required: "This field is required",
                })}
              />
              {errors.payment_method && (
                <p className="text-danger">{errors.payment_method.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Shipment Contents
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("shipment_contents", {
                  required: "This field is required",
                })}
              />
              {errors.shipment_contents && (
                <p className="text-danger">
                  {errors.shipment_contents.message}
                </p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Shipment Weight
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("shipment_weight", {
                  required: "This field is required",
                })}
              />
              {errors.shipment_weight && (
                <p className="text-danger">{errors.shipment_weight.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Shipment Dimensions
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("shipment_dimensions", {
                  required: "This field is required",
                })}
              />
              {errors.shipment_dimensions && (
                <p className="text-danger">
                  {errors.shipment_dimensions.message}
                </p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Special Instructions
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("special_instructions", {
                  required: "This field is required",
                })}
              />
              {errors.special_instructions && (
                <p className="text-danger">
                  {errors.special_instructions.message}
                </p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Pickup Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("pickup_date", {
                  required: "This field is required",
                })}
              />
              {errors.pickup_date && (
                <p className="text-danger">{errors.pickup_date.message}</p>
              )}
            </div>
            <div className="mt-3 col-lg-7">
              <label htmlFor="name" className="form-label">
                Expected Delivery Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={handleChange}
                {...register("expected_delivery_date", {
                  required: "This field is required",
                })}
              />
              {errors.expected_delivery_date && (
                <p className="text-danger">
                  {errors.expected_delivery_date.message}
                </p>
              )}
            </div>

            <button type="submit" className="mt-3 btn btn-primary">
              Create Shipment
            </button>
          </form>
          {err && <p className="text-danger">{err}</p>}
        </div>
        <div className="col-lg-7 mt-sm-3 mx-sm-auto">
          <img
            src="https://images.pexels.com/photos/7706416/pexels-photo-7706416.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width="500"
            height="600"
          />
        </div>
      </div>
    </>
  );
};

export default AddShipment;

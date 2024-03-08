import { useForm } from "react-hook-form";
import Nav from "./Nav";
import axios from "axios";
import { useState } from "react";

const TrackShipment = () => {

     const {
       register,
       handleSubmit,
       setValue,
       formState: { errors },
  } = useForm();

    const [err, setErr] = useState("");
    const [result, setResult] = useState("");
  
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.name, e.target.value);
     };
  
     const onSubmitHandler = (data: any) => {
       setErr("");
       setResult("");
       handleTrackShipment(data.tracking_number);
  };
  
 const token = localStorage.getItem("accessToken");
 const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };
     const handleTrackShipment = async (data: any) => {
       try {
         console.log(data);
        let result = await axios.get(
          `http://localhost:8800/api/track-shipment?id=${data}`,
         
          config
        );
         setResult(result.data.status)
       } catch (err: any) {
         console.log(err);
         setErr(err.response.data.message);
       }
  };
  
  return (
    <>
      <Nav />
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h1>Track Shipment</h1>
          <div className="mt-3 col-lg-7">
            <label htmlFor="name" className="form-label">
              Tracking ID
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={handleChange}
              {...register("tracking_number", {
                required: "This field is required",
              })}
            />
            {errors?.tracking_number && (
              <p className="text-danger">{errors?.tracking_number?.message}</p>
            )}
            
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Get Status
          </button>
        </form>

        {result && (
          <div className="mt-5 align-items-center">
            <h3>Status : </h3>
            <p className="text-black">{result}</p>
          </div>
        )}
        {err && <p className="text-danger">{err}</p>}
      </div>
    </>
  );
};

export default TrackShipment;

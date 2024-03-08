import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import moment from "moment";
import { useForm } from "react-hook-form";

const Dashboard: React.FC = () => {

interface shipmentType {
  id: number;
  sender_name: string;
  sender_address: string;
  recipient_name: string;
  recipient_address: string;
  payment_method: string;
  shipment_contents: string;
  shipment_weight: string;
  shipment_dimensions: string;
  special_instructions: string;
  pickup_date: string;
  expected_delivery_date: string;
  shipping_cost: string;
  carrier_name: string;
}
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

    const [shipments, setShipments] = useState<shipmentType[]>([]);

  const [err, setErr] = useState("");
  const [status, setStatus] = useState("");
  const [shipmentId, setShipmentId] = useState<number>();
  const [selectedShipment, setSelectedShipment] = useState<shipmentType>();

  useEffect(() => {
    setShipmentId(selectedShipment?.id);
    setValue("recipient_name", selectedShipment?.recipient_name);
    setValue("recipient_address", selectedShipment?.recipient_address);
    setValue("payment_method", selectedShipment?.payment_method);
    setValue("shipment_contents", selectedShipment?.shipment_contents);
    setValue("shipment_weight", selectedShipment?.shipment_weight);
    setValue("shipment_dimensions", selectedShipment?.shipment_dimensions);
    setValue("special_instructions", selectedShipment?.special_instructions);
    setValue("pickup_date", selectedShipment?.pickup_date);
    setValue(
      "expected_delivery_date",
      selectedShipment?.expected_delivery_date
    );
  }, [selectedShipment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  function onSubmitHandler(data: any) {
    handleUpdateShipment(data);
  }

  const handleUpdateShipment = async (data: any) => {
    try {
      console.log(data);
      await axios.put(
        `http://localhost:8800/api/user-update-shipment?id=${shipmentId}`,
        data,
        config
      );
      const closeButton = document.getElementById("btn-close");
      closeButton.click();
      getAllShipments();

    } catch (err: any) {
      console.log(err);
      setErr(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllShipments();
  }, []);
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getAllShipments = async () => {
    try {
      let result = await axios.get(
        "http://localhost:8800/api/user-shipments",
        config
      );
      result = await result.data;
      setShipments(result);
    } catch (err) {
      setErr(err.response.data.message);
    }
  };

  const getStatus = async (id:number) => {
    try {
      let result = await axios.get(
        `http://localhost:8800/api/get-shipment-status?id=${id}`,
        config
      );
      result = await result.data;
      setStatus(result);
    } catch (err) {
      setErr(err.response.data.message);
    }
  };

  const handleDeleteConfirmation = (shipmentId:string) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete shipment ID: ${shipmentId}?`
    );

    const deleteShipment = async () => {
      try {
        let result = await axios.delete(
          `http://localhost:8800/api/user-shipment-delete?id=${shipmentId}`,
          config
        );
        getAllShipments();
      } catch (err) {
        setErr(err.response.data.message);
      }
    };

    if (userConfirmed) {
      deleteShipment();
      getAllShipments();
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5">
        <h3>Shipment List</h3>
        <div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover mt-3">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Sender Name</th>
                  <th>Sender Address</th>
                  <th>Recipient Name</th>
                  <th>Recipient Address</th>
                  <th>Payment Method</th>
                  <th>Shipment Contents</th>
                  <th>Shipment Weight</th>
                  <th>Shipment Dimensions</th>
                  <th>Special Instructions</th>
                  <th>Pickup Date</th>
                  <th>Expected Delivery Date</th>
                  <th>Shipping Cost (Rs.)</th>
                  <th>Carrier Name</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{shipment.id}</td>
                    <td>{shipment.sender_name}</td>
                    <td>{shipment.sender_address}</td>
                    <td>{shipment.recipient_name}</td>
                    <td>{shipment.recipient_address}</td>
                    <td>{shipment.payment_method}</td>
                    <td>{shipment.shipment_contents}</td>
                    <td>{shipment.shipment_weight}</td>
                    <td>{shipment.shipment_dimensions}</td>
                    <td>{shipment.special_instructions}</td>
                    <td>
                      {moment(shipment.pickup_date).format(
                        "MMMM DD YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      {moment(shipment.expected_delivery_date).format(
                        "MMMM DD YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>{shipment.shipping_cost}</td>
                    <td>{shipment.carrier_name}</td>
                    <td>
                      <a
                        className="btn btn-success btn-sm "
                        href="#"
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal1"
                        onClick={() => getStatus(shipment.id)}
                      >
                        View Status
                      </a>
                    </td>
                    <td>
                      <a
                        className="btn btn-primary btn-sm "
                        href="#"
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal2"
                        onClick={() => setSelectedShipment(shipment)}
                      >
                        Update
                      </a>
                    </td>
                    <td>
                      <a
                        className="btn btn-danger btn-sm "
                        href="#"
                        role="button"
                        onClick={() => handleDeleteConfirmation(shipment.id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {err && <p className="text-danger mt-3">{err}</p>}
          </div>

          <div
            className="modal fade"
            id="Modal1"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    View Status
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="form-label">
                        Status
                      </label>
                      <input
                        type="text"
                        value={status}
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="Modal2"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Update Shipment
                  </h1>
                  <button
                    type="button"
                    id="btn-close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h1>Create Shipment</h1>
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Recepient Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("recipient_name")}
                        onChange={handleChange}
                        {...register("recipient_name", {
                          required: "This field is required",
                        })}
                      />
                      {errors.recipient_name && (
                        <p className="text-danger">
                          {errors.recipient_name.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Recepient Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("recipient_address")}
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
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Payment Method
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("payment_method")}
                        onChange={handleChange}
                        {...register("payment_method", {
                          required: "This field is required",
                        })}
                      />
                      {errors.payment_method && (
                        <p className="text-danger">
                          {errors.payment_method.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Shipment Contents
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("shipment_contents")}
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
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Shipment Weight
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("shipment_weight")}
                        onChange={handleChange}
                        {...register("shipment_weight", {
                          required: "This field is required",
                        })}
                      />
                      {errors.shipment_weight && (
                        <p className="text-danger">
                          {errors.shipment_weight.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Shipment Dimensions
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("shipment_dimensions")}
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
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Special Instructions
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={watch("special_instructions")}
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
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Pickup Date
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={moment(watch("pickup_date")).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        onChange={handleChange}
                        {...register("pickup_date", {
                          required: "This field is required",
                        })}
                      />
                      {errors.pickup_date && (
                        <p className="text-danger">
                          {errors.pickup_date.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <label htmlFor="name" className="form-label">
                        Expected Delivery Date
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={moment(watch("expected_delivery_date")).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
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
                      Update Shipment
                    </button>
                  </form>
                  {err && <p className="text-danger">{err}</p>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

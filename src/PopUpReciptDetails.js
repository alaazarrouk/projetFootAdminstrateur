import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PopUpReciptDetails.css";
import "./main.css";

const PopUpReciptDetails = ({
  _id,
  date,
  time,
  user,
  field,
  totalAmount,
  status,
}) => {
  return (
    <div className="PopUpReciptDetails">
      <ToastContainer />
      <h2> Recipt Details</h2>
      <h3>Reservation ID: {_id}</h3>

      <div className="infos">
        <div className="label">Date :</div>
        <div className="content"> {date} </div>
      </div>
      <div className="infos">
        <div className="label">Time : </div>
        <div className="content"> {time} </div>
      </div>
      <div className="infos">
        <div className="label">User : </div>
        <div className="content"> {user.firstName + " " + user.lastName} </div>
      </div>
      <div className="infos">
        <div className="label">Field : </div>
        <div className="content"> {field.name} </div>
      </div>
      <div className="infos">
        <div className="label">Field Owner : </div>
        <div className="content">{field.name}</div>
      </div>
      <div className="infos">
        <div className="label">Field phone : </div>
        <div className="content">{field.name}</div>
      </div>
      <div className="infos">
        <div className="label">Total Amount : </div>
        <div className="content">
          <div class="mb-2 mr-2 badge badge-pill badge-alternate">
            {totalAmount} DT
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpReciptDetails;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PopUpUpdateReservation.css";
import "./main.css";
import axios from "./axios";

const PopUpUpdateReservation = ({
  _id,
  date,
  dateInput,
  time,
  user,
  field,
  totalAmount,
  status,
  onChange,
  refresh,
}) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  var maxDate = yyyy + "-" + (parseInt(mm) + 1).toString() + "-" + dd;

  console.log("date:", date);
  console.log("dateInput", dateInput);
  const [times, setTimes] = useState([]);
  const [newTime, setNewTime] = useState("");
  const [newDateReadable, setNewDateReadable] = useState("");
  const [newDate, setNewDate] = useState("");
  console.log("new Date:", newDate);

  useEffect(() => {
    setNewDateReadable(date);
    setNewDate(dateInput);
    setNewTime(time);
  }, [date, time]);

  useEffect(async () => {
    console.log("refreshing trigeered");
    await axios
      .get(
        `/get/reservations/notAvailable/time/${newDateReadable}/${field._id}`
      )
      .then((response) => {
        console.log("response time", response.data);
        setTimes(getTableOfTime(response.data));
      });
  }, [newDateReadable, date, time]);
  function changeDateFormat(date, format) {
    if (format == "readable") {
      var yy = date.substr(0, 4);
      var mm = date.substr(5, 2);
      var dd = date.substr(8, 2);
      switch (mm) {
        case "01":
          mm = "JAN";
          break;
        case "02":
          mm = "FEB";
          break;
        case "03":
          mm = "MAR";
          break;
        case "04":
          mm = "APR";
          break;
        case "05":
          mm = "MAY";
          break;
        case "06":
          mm = "JUNE";
          break;
        case "07":
          mm = "JULY";
          break;
        case "08":
          mm = "AUG";
          break;
        case "09":
          mm = "SEPT";
          break;
        case "10":
          mm = "OCT";
          break;
        case "11":
          mm = "NOV";
          break;
        case "12":
          mm = "DEC";
          break;
      }
      var dt = mm + "-" + dd + "-" + yy;
    } else {
      var yy = date.substr(7, 4);

      var mm = date.substr(0, 3);

      var dd = date.substr(4, 2);
      switch (mm) {
        case "JAN":
          mm = "01";
          break;
        case "FEB":
          mm = "02";
          break;
        case "MAR":
          mm = "03";
          break;
        case "APR":
          mm = "04";
          break;
        case "MAY":
          mm = "05";
          break;
        case "JUN":
          mm = "06";
          break;
        case "JUL":
          mm = "07";
          break;
        case "AUG":
          mm = "08";
          break;
        case "SEP":
          mm = "09";
          break;
        case "OCT":
          mm = "10";
          break;
        case "NOV":
          mm = "11";
          break;
        case "DEC":
          mm = "12";
          break;
      }
      var dt = yy + "-" + mm + "-" + dd;
    }
    return dt;
  }
  const getTableOfTime = (nonAvailableTime) => {
    console.log(nonAvailableTime);
    var table = [
      "8.00 -> 9.30",
      "9.30 -> 11.00",
      "11.00 -> 12.30",
      "12.30 -> 14.00",
      "14.00 -> 15.30",
      "15.30 -> 17.00",
      "17.00 -> 18.30",
      "18.30 -> 20.00",
      "20.00 -> 21.30",
      "21.30 -> 23.00",
    ];
    var table_times = [
      "8.0",
      "9.30",
      "11.0",
      "12.30",
      "14.0",
      "15.30",
      "17.0",
      "18.30",
      "20.0",
      "21.30",
      "23.00",
    ];
    if (changeDateFormat(today, "readable") == date) {
      if (table_times.includes(getTime())) {
        var indexOfTime = table_times.indexOf(getTime());
        table.splice(0, indexOfTime + 1);
      }
    }
    for (var i = 0; i < nonAvailableTime.length; i++) {
      if (table.includes(nonAvailableTime[i])) {
        table.splice(table.indexOf(nonAvailableTime[i]), 1);
      }
    }
    return table;
  };

  const getTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    if (minutes.length == 1) {
      var time = date.getHours() + "." + date.getMinutes() + "0";
    } else {
      var time = date.getHours() + "." + date.getMinutes();
    }
    return time;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name == "date") {
      setNewDate(value);
      setNewDateReadable(changeDateFormat(value, "readable"));
    } else {
      setNewTime(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .patch(`/update/patch/reservation/${_id}/${newDateReadable}/${newTime}`)
      .then((response) => {
        console.log("update Response", response);
        if (response.data.updatedReservation.nModified > 0) {
          toast.success("reservation successfully updated", {
            className: "Toastify__toast",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          onChange(!refresh);
        } else {
          toast.warning("Nothing to updated", {
            className: "Toastify__toast",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  return (
    <div className="PopUpUpdateReservation">
      <ToastContainer />
      <h2> Update Reservation</h2>
      <h4>Reservation ID : {_id}</h4>
      <h4>Field: {field.name}</h4>
      <h4>User: {user.firstName + " " + user.lastName}</h4>
      <form class="update_Form">
        <div className="first_Container">
          <div className="first_Name_container">
            <label htmlFor="first_Name"> Date (current reservation) :</label>
            <input
              name="date"
              type="date"
              id="first_Name"
              min={today}
              max={maxDate}
              value={newDate}
              onChange={handleChange}
              class="form-control"
            ></input>
          </div>
          <div className="last_Name_container">
            <label htmlFor="time">Available times:</label>
            <select
              name="time"
              id="last_Name"
              class="form-control"
              value={newTime}
              onChange={handleChange}
            >
              <option value={newTime}>{newTime}</option>
              {times.map((oneTime) => {
                return <option value={oneTime}>{oneTime}</option>;
              })}
            </select>
          </div>
        </div>

        <button id="submit" class="mt-1 btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PopUpUpdateReservation;

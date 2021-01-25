import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PopUpReservation.css";
import "../main.css";
import PopUpReciptDetails from "../PopUpReciptDetails";
import PopUpUpdateReservation from "../PopUpUpdateReservation";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import ListIcon from "@material-ui/icons/List";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PopUpReservation = ({
  _id,
  firstName,
  lastName,
  phone,
  email,
  address,
  state,
}) => {
  // Repeat every 60000 milliseconds (1 minute)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  window.setInterval(function () {
    var date = new Date(); // Create a Date object to find out what time it is
    var currentTime = date.getHours() + "." + date.getMinutes();
    const time = [
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
    if (time.includes(currentTime)) {
      setRefresh(!refresh);
    }
  }, 60000);
  const classes = useStyles();
  const choices = ["All", "Select Date"];
  const [choice, setChoice] = useState("All");
  const [date, setDate] = useState(today.toString());
  const [refresh, setRefresh] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [person, setPerson] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    type: "User",
  });

  const [Reservation, setReservation] = useState({
    _id: "",
    date: "",
    dateInput: "",
    time: "",
    user: {},
    field: {},
    totalAmount: "",
    status: "",
  });
  useEffect(async () => {
    setPerson({
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      address: address,
      state: state,
      password: "",
    });
    setRefresh(!refresh);
  }, [_id]);

  useEffect(async () => {
    if (choice == "All") {
      await axios.get(`/get/reservations/${person._id}`).then((response) => {
        console.log(response.data);
        setReservations(response.data);
      });
    } else {
      var newDate = changeDateFormat(date, "readable");
      console.log(newDate);
      await axios
        .get(`/get/reservations/user/${person._id}/${newDate}`)
        .then((response) => {
          console.log(response.data);
          setReservations(response.data);
        });
    }
  }, [refresh, choice, date]);

  const handleChange = (event) => {
    if (event.target.name == "Date") {
      setDate(event.target.value);
    } else {
      const newChoice = event.target.value;
      setChoice(newChoice);
    }
  };
  const doSomething = (popupName) => {
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";
    if (popupName == "recipt") {
      document.querySelector(".bg-modal-recipt").style.display = "flex";
      document.querySelector(".bg-modal-recipt").style.position = "absolute";
    }
    if (popupName == "reservationUpdate") {
      document.querySelector(".bg-modal-reservationUpdate").style.display =
        "flex";
      document.querySelector(".bg-modal-reservationUpdate").style.position =
        "absolute";
    }
  };
  const doSomething1 = (popupName) => {
    document.body.style.overflow = "auto";
    document.getElementById("table").scrollIntoView();
    if (popupName == "recipt") {
      document.querySelector(".bg-modal-recipt").style.display = "none";
      document.querySelector(".bg-modal-recipt").style.position = "uset";
    }
    if (popupName == "reservationUpdate") {
      document.querySelector(".bg-modal-reservationUpdate").style.display =
        "none";
      document.querySelector(".bg-modal-reservationUpdate").style.position =
        "uset";
    }
  };

  const cancelReservation = async (_id, date, time) => {
    var result = window.confirm(
      `Confirm deleting reservation with id ${_id} and date ${date} and time ${time}`
    );
    if (result) {
      await axios
        .patch(`/update/cancel/reservation/${_id}`)
        .then((response) => {
          console.log(response.data);
          toast.info(
            `reservation with date ${date} and time ${time} deleted successfully`,
            {
              className: "Toastify__toast",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        });
      setRefresh(!refresh);
    }
  };

  const changeDateFormat = (date, format) => {
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

  const checkReservationDone = (reservationDate, reservationTime) => {
    var result = false;
    switch (true) {
      case reservationDate < changeDateFormat(today, "readable"):
        result = true;
        break;
      case reservationDate > changeDateFormat(today, "readable"):
        result = false;
        break;

      default:
        var reservationTimeUpdate = reservationTime.substr(0, 5);
        if (reservationTimeUpdate.includes(" ")) {
          reservationTimeUpdate = reservationTimeUpdate.trim();
        }
        console.log("time", getTime());
        console.log("resrvation time", reservationTimeUpdate);

        if (parseInt(getTime()) >= parseInt(reservationTimeUpdate)) {
          result = true;
        } else {
          result = false;
        }
        break;
    }
    return result;
  };
  return (
    <div className="PopUpReservation">
      <ToastContainer />
      <h2> Reservations</h2>
      <div class="bg-modal-recipt">
        <div class="modal-contents-recipt">
          <div class="close" onClick={() => doSomething1("recipt")}>
            x
          </div>
          <PopUpReciptDetails
            _id={Reservation._id}
            date={Reservation.date}
            time={Reservation.time}
            user={Reservation.user}
            field={Reservation.field}
            totalAmount={Reservation.totalAmount}
            status={Reservation.status}
          />
        </div>
      </div>
      <div class="bg-modal-reservationUpdate">
        <div class="modal-contents-reservationUpdate">
          <div class="close" onClick={() => doSomething1("reservationUpdate")}>
            x
          </div>
          <PopUpUpdateReservation
            _id={Reservation._id}
            date={Reservation.date}
            dateInput={Reservation.dateInput}
            time={Reservation.time}
            user={Reservation.user}
            field={Reservation.field}
            totalAmount={Reservation.totalAmount}
            status={Reservation.status}
            onChange={(value) => setRefresh(value)}
            refresh={refresh}
          />
        </div>
      </div>
      <div className="sub_title">
        <div className="sub_title_text">Search Reservation :</div>
        <div className="sub_title_text_select_city">
          <span class="sc">Select a choice:</span>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Choice</InputLabel>
            <Select native value={choice} onChange={handleChange} label="Age">
              {choices.map((city) => {
                return <option value={city}>{city}</option>;
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      {choice == "Select Date" ? (
        <div className="sub_title_select_date">
          <label className="lb" for="start">
            Start date:
          </label>
          <input
            type="date"
            id="start"
            name="Date"
            value={date}
            onChange={handleChange}
          ></input>
        </div>
      ) : (
        ""
      )}

      <div className="container">
        <div className="tools_container"></div>
        <div className="table-responsive scrollable" id="table">
          <table class="mb-0 table table-custum-design">
            <thead>
              <tr>
                <th>#</th>
                <th>Field Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Satus</th>
                <th>Payed</th>
                <th colspan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length == 0 ? (
                <tr className="exist_style">No reservation</tr>
              ) : (
                reservations.map((reservation) => {
                  return (
                    <tr>
                      <th scope="row">{reservation._id}</th>
                      <td class="address_design">{reservation.field.name}</td>
                      <td class="address_design ">{reservation.date}</td>
                      <td>{reservation.time}</td>
                      <td>
                        {reservation.status === "confirmed" ? (
                          checkReservationDone(
                            reservation.date,
                            reservation.time
                          ) ? (
                            <div class="mb-2 mr-2 badge badge-pill badge-warning">
                              Done
                            </div>
                          ) : (
                            <div class="mb-2 mr-2 badge badge-pill badge-success">
                              Confirmed
                            </div>
                          )
                        ) : (
                          <div class="mb-2 mr-2 badge badge-pill badge-danger">
                            Cancled
                          </div>
                        )}
                      </td>
                      <td>
                        <div class="mb-2 mr-2 badge badge-pill badge-alternate">
                          {reservation.totalAmount} DT
                        </div>
                      </td>
                      <td>
                        {reservation.status == "cancled" ? (
                          ""
                        ) : checkReservationDone(
                            reservation.date,
                            reservation.time
                          ) ? (
                          ""
                        ) : (
                          <span>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="Modify User"
                            >
                              <IconButton aria-label="add-person">
                                <CreateIcon
                                  style={{ color: "green" }}
                                  onClick={() => {
                                    setReservation({
                                      _id: reservation._id,
                                      date: reservation.date,
                                      dateInput: reservation.dateInput,
                                      time: reservation.time,
                                      user: reservation.user,
                                      field: reservation.field,
                                      totalAmount: reservation.totalAmount,
                                      status: reservation.status,
                                    });
                                    doSomething("reservationUpdate");
                                  }}
                                />
                              </IconButton>
                            </span>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="cancel reservation"
                            >
                              <IconButton aria-label="add-person">
                                <DeleteIcon
                                  style={{ color: "red" }}
                                  onClick={() =>
                                    cancelReservation(
                                      reservation._id,
                                      reservation.date,
                                      reservation.time
                                    )
                                  }
                                />
                              </IconButton>
                            </span>
                          </span>
                        )}

                        <span
                          data-toggle="tooltip"
                          data-placement="bottom-start"
                          title="reservations"
                        >
                          <IconButton aria-label="add-person">
                            <ListIcon
                              onClick={() => {
                                setReservation({
                                  _id: reservation._id,
                                  date: reservation.date,
                                  time: reservation.time,
                                  user: reservation.user,
                                  field: reservation.field,
                                  totalAmount: reservation.totalAmount,
                                  status: reservation.status,
                                });
                                doSomething("recipt");
                              }}
                              style={{ color: "brown" }}
                            />
                          </IconButton>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopUpReservation;

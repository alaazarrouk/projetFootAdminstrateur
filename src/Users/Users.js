import React, { useEffect, useState } from "react";

import "./Users.css";
import "../main.css";
import axios from "../axios";
import PopUpUpdateUser from "./PopUpUpdateUser.js";
import CreateIcon from "@material-ui/icons/Create";
import { toast } from "react-toastify";
import PopUpAddUser from "./PopUpAddUser";
import PopUpReservation from "./PopUpReservation";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  absolute: {
    position: "absolute",
    bottom: theme.spacing(-6),
    right: theme.spacing(1),
  },
}));
const Users = () => {
  document.body.style.overflow = "auto";
  const classes = useStyles();
  const [clients, setClients] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [User, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
  });

  useEffect(async () => {
    await axios.get(`/get/users/count`).then((response) => {
      console.log(response.data);
      setClients(response.data.nbUsers);
    });
    await axios.get(`/get/users`).then((response) => {
      console.log("response data: ", response.data);
      setUsers(response.data);
    });
  }, [refresh]);

  const doSomething = (popupName) => {
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";
    if (popupName == "Update") {
      document.querySelector(".bg-modal").style.display = "flex";
      document.querySelector(".bg-modal").style.position = "absolute";
    }
    if (popupName == "Add") {
      document.querySelector(".bg-modal-add").style.display = "flex";
      document.querySelector(".bg-modal-add").style.position = "absolute";
    }

    if (popupName == "Reservation") {
      document.querySelector(".bg-modal-reservation").style.display = "flex";
      document.querySelector(".bg-modal-reservation").style.position =
        "absolute";
    }
  };
  const doSomething1 = (popupName) => {
    document.body.style.overflow = "auto";
    document.getElementById("table").scrollIntoView();
    if (popupName == "Update") {
      document.querySelector(".bg-modal").style.display = "none";
      document.querySelector(".bg-modal").style.position = "uset";
    }
    if (popupName == "Add") {
      document.querySelector(".bg-modal-add").style.display = "none";
      document.querySelector(".bg-modal-add").style.position = "uset";
    }
    if (popupName == "Reservation") {
      document.querySelector(".bg-modal-reservation").style.display = "none";
      document.querySelector(".bg-modal-reservation").style.position = "uset";
    }
  };

  const deleteUser = async (firstName, lastName, status, _id) => {
    var result = window.confirm(`Confirm deleting ${firstName} ${lastName}`);
    if (result) {
      await axios.delete(`/delete/client/${_id}`).then((response) => {
        console.log(response.data);
        toast.info("User deleted successfully", {
          className: "Toastify__toast",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefresh(!refresh);
      });
    }
  };

  const searchUser = async () => {
    if (search) {
      await axios.get(`/get/user/email/${search}`).then((response) => {
        console.log("searched User", response.data);
        console.log(response.data.length);
        if (response.data == "") {
          setUsers([]);
        } else {
          setUsers([response.data]);
        }
      });
    } else {
      await axios.get(`/get/users`).then((response) => {
        console.log("searched Field User", response.data);
        console.log(response.data.length);
        if (response.data.length == undefined) {
          setUsers([response.data]);
        } else {
          setUsers(response.data);
        }
      });
    }
  };

  return (
    <div className="Home big">
      <div class="bg-modal">
        <div class="modal-contents">
          <div class="close" onClick={() => doSomething1("Update")}>
            x
          </div>
          <PopUpUpdateUser
            _id={User._id}
            firstName={User.firstName}
            lastName={User.lastName}
            phone={User.phone}
            email={User.email}
            address={User.address}
            state={User.state}
            refresh={refresh}
            onChange={(value) => setRefresh(value)}
          />
        </div>
      </div>
      <div class="bg-modal-add">
        <div class="modal-contents-add">
          <div class="close-add" onClick={() => doSomething1("Add")}>
            x
          </div>
          <PopUpAddUser
            refresh={refresh}
            onChange={(value) => setRefresh(value)}
          />
        </div>
      </div>

      <div class="bg-modal-reservation">
        <div class="modal-contents-reservation">
          <div class="close" onClick={() => doSomething1("Reservation")}>
            x
          </div>
          <PopUpReservation
            _id={User._id}
            firstName={User.firstName}
            lastName={User.lastName}
            phone={User.phone}
            email={User.email}
            address={User.address}
            state={User.state}
            refresh={refresh}
            onChange={(value) => setRefresh(value)}
          />
        </div>
      </div>

      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <div class="page-title-icon">
                  <i class="pe-7s-home icon-gradient bg-mean-fruit"></i>
                </div>
                <div>
                  Analytics Users
                  <div class="page-title-subheading">
                    The Users Dashboard contains the most needed statistics of
                    the application
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-xl-4">
              <div class="card mb-3 widget-content">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-heading">Total Users</div>
                    <div class="widget-subheading">Total Users Registred</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-success">
                      <span>{clients}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sub_title">
            <div className="sub_title_text">List of Users :</div>
            <div className="sub_title_text_select_city"></div>
          </div>
          <div className="container">
            <div className="tools_container">
              <div className="search_container">
                <SearchBar
                  value={search}
                  onChange={(newValue) => setSearch(newValue)}
                  onRequestSearch={searchUser}
                />
              </div>
              <div className="addUser_container">
                <span
                  data-toggle="tooltip"
                  data-placement="bottom-start"
                  title="Add User"
                >
                  <IconButton>
                    <PersonAddIcon onClick={() => doSomething("Add")} />
                  </IconButton>
                </span>
              </div>
            </div>
            <div className="table-responsive scrollable" id="table">
              <table class="mb-0 table table-custum-design">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>State</th>
                    <th>Status</th>
                    <th colspan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length == 0 ? (
                    <tr className="exist_style">
                      Field User with tha email does not exist
                    </tr>
                  ) : (
                    users.map((user) => {
                      return (
                        <tr>
                          <th scope="row">{user._id}</th>
                          <td class="address_design">
                            {user.lastName + " " + user.firstName}
                          </td>
                          <td class="address_design ">{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.state}</td>
                          <td>
                            {user.status === "Confirmed" ? (
                              <div class="mb-2 mr-2 badge badge-pill badge-success">
                                Confirmed
                              </div>
                            ) : (
                              <div class="mb-2 mr-2 badge badge-pill badge-warning">
                                Waiting
                              </div>
                            )}
                          </td>
                          <td>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="Modify User"
                            >
                              <IconButton aria-label="add-person">
                                <CreateIcon
                                  style={{ color: "green" }}
                                  onClick={() => {
                                    setUser({
                                      _id: user._id,
                                      firstName: user.firstName,
                                      lastName: user.lastName,
                                      phone: user.phone,
                                      email: user.email,
                                      address: user.address,
                                      state: user.state,
                                    });
                                    doSomething("Update");
                                  }}
                                />
                              </IconButton>
                            </span>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="Delete User"
                            >
                              <IconButton aria-label="add-person">
                                <DeleteIcon
                                  style={{ color: "red" }}
                                  onClick={() =>
                                    deleteUser(
                                      user.firstName,
                                      user.lastName,
                                      user.status,
                                      user._id
                                    )
                                  }
                                />
                              </IconButton>
                            </span>

                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="reservations"
                            >
                              <IconButton aria-label="add-person">
                                <ListIcon
                                  onClick={() => {
                                    setUser({
                                      _id: user._id,
                                      firstName: user.firstName,
                                      lastName: user.lastName,
                                      phone: user.phone,
                                      email: user.email,
                                      address: user.address,
                                      state: user.state,
                                    });
                                    doSomething("Reservation");
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
      </div>
    </div>
  );
};

export default Users;

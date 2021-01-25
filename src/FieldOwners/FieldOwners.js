import React, { useEffect, useState } from "react";

import "./FieldOwners.css";
import "../main.css";
import axios from "../axios";
import PopUpUpdateOwner from "./PopUpUpdateOwner";
import PopUpUpdateField from "./PopUpUpdateField";
import CreateIcon from "@material-ui/icons/Create";
import { toast } from "react-toastify";
import PopUpAddOwner from "./PopUpAddOwner";
import PopUpAddField from "./PopUpAddField";
import PopUpReservation from "./PopUpReservation";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
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
const FieldOwners = () => {
  document.body.style.overflow = "auto";
  const classes = useStyles();

  const states = [
    "All",
    "Ariana",
    "Ben arous",
    "Béja",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Mannouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  const [clients, setClients] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [fieldOwners, setFieldOwners] = useState([]);
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [Owner, setOwner] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
  });
  const [fieldUpdate, setFieldUpdate] = useState({
    _id: "",
    name: "",
    address: "",
    state: "",
    type: "",
    price: "",
  });
  const [fieldOwner, setFieldOwner] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
  });

  useEffect(async () => {
    await axios.get(`/get/fieldOwners/count`).then((response) => {
      console.log(response.data);
      setClients(response.data.nbFieldOwners);
    });
    await axios.get(`/get/fieldOwners`).then((response) => {
      console.log("response data: ", response.data);
      setFieldOwners(response.data);
    });
  }, [refresh]);

  useEffect(async () => {
    await axios.get(`/get/Allfields`).then((response) => {
      console.log("response data: ", response.data);
      setFields(response.data);
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
    if (popupName == "UpdateField") {
      document.querySelector(".bg-modal-updateField").style.display = "flex";
      document.querySelector(".bg-modal-updateField").style.position =
        "absolute";
    }
    if (popupName == "AddField") {
      document.querySelector(".bg-modal-addField").style.display = "flex";
      document.querySelector(".bg-modal-addField").style.position = "absolute";
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
    if (popupName == "AddField") {
      document.querySelector(".bg-modal-addField").style.display = "none";
      document.querySelector(".bg-modal-addField").style.position = "uset";
    }

    if (popupName == "UpdateField") {
      document.querySelector(".bg-modal-updateField").style.display = "none";
      document.querySelector(".bg-modal-updateField").style.position = "uset";
    }
    if (popupName == "Reservation") {
      document.querySelector(".bg-modal-reservation").style.display = "none";
      document.querySelector(".bg-modal-reservation").style.position = "uset";
    }
  };

  const deleteFieldOwner = async (firstName, lastName, status, _id) => {
    var result = window.confirm(`Confirm deleting ${firstName} ${lastName}`);
    if (result) {
      if (status == "Confirmed") {
        await axios.delete(`/deleteclient/${_id}`).then((response) => {
          console.log(response.data);
          axios.delete(`/delete/fields/fieldOwner/${_id}`).then((response) => {
            console.log(response.data);
            toast.info("Field Owner deleted successfully", {
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
        });
      } else {
        await axios.delete(`/delete/fieldOwner/${_id}`).then((response) => {
          console.log(response.data);
          toast.info("Field Owner deleted successfully", {
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
    }
  };

  const confirmFieldOwner = async (firstName, lastName, _id) => {
    var result = window.confirm(`Confirm field Owner ${firstName} ${lastName}`);
    if (result) {
      await axios.patch(`/user/updateStatus/${_id}`).then((response) => {
        console.log(response.data);
        toast.info("Field Owner confirmed successfully", {
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
        console.log("searched Field Owner", response.data);
        console.log(response.data.length);
        if (response.data == "") {
          setFieldOwners([]);
        } else {
          setFieldOwners([response.data]);
        }
      });
    } else {
      await axios.get(`/get/fieldOwners`).then((response) => {
        console.log("searched Field Owner", response.data);
        console.log(response.data.length);
        if (response.data.length == undefined) {
          setFieldOwners([response.data]);
        } else {
          setFieldOwners(response.data);
        }
      });
    }
  };
  const searchFieldEmail = async () => {
    if (searchField) {
      await axios.get(`/get/field/email/${searchField}`).then((response) => {
        console.log("searched Field", response.data);
        console.log(response.data.length);
        if (response.data == "") {
          setFields([]);
        } else {
          console.log(response.data);
          setFields(response.data);
        }
      });
    } else {
      await axios.get(`/get/Allfields`).then((response) => {
        console.log("searched Field ", response.data);
        if (response.data.length == undefined) {
          setFields([response.data]);
        } else {
          setFields(response.data);
        }
      });
    }
  };
  const deleteField = async (name, _id) => {
    var result = window.confirm(`Confirm deleting Field ${name}`);
    if (result) {
      await axios.delete(`/delete/field/${_id}`).then((response) => {
        console.log(response.data);
        toast.info(`Field ${name} deleted successfully`, {
          className: "Toastify__toast",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      setRefresh(!refresh);
    }
  };

  return (
    <div className="Home big">
      <div class="bg-modal">
        <div class="modal-contents">
          <div class="close" onClick={() => doSomething1("Update")}>
            x
          </div>
          <PopUpUpdateOwner
            _id={Owner._id}
            firstName={Owner.firstName}
            lastName={Owner.lastName}
            phone={Owner.phone}
            email={Owner.email}
            address={Owner.address}
            state={Owner.state}
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
          <PopUpAddOwner
            refresh={refresh}
            onChange={(value) => setRefresh(value)}
          />
        </div>
      </div>
      <div class="bg-modal-addField">
        <div class="modal-contents-addField">
          <div class="close-add" onClick={() => doSomething1("AddField")}>
            x
          </div>
          <PopUpAddField
            _id={fieldOwner._id}
            firstName={fieldOwner.firstName}
            lastName={fieldOwner.lastName}
            phone={fieldOwner.phone}
            email={fieldOwner.email}
            address={fieldOwner.address}
            state={fieldOwner.state}
            refresh={refresh}
            onChange={(value) => setRefresh(value)}
          />
        </div>
      </div>
      <div class="bg-modal-updateField">
        <div class="modal-contents-updateField">
          <div class="close-add" onClick={() => doSomething1("UpdateField")}>
            x
          </div>
          <PopUpUpdateField
            _id={fieldUpdate._id}
            name={fieldUpdate.name}
            address={fieldUpdate.address}
            state={fieldUpdate.state}
            type={fieldUpdate.type}
            price={fieldUpdate.price}
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
            _id={fieldUpdate._id}
            name={fieldUpdate.name}
            address={fieldUpdate.address}
            state={fieldUpdate.state}
            type={fieldUpdate.type}
            price={fieldUpdate.price}
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
                  Analytics Field Owners
                  <div class="page-title-subheading">
                    The Field Owners Dashboard contains the most needed
                    statistics of the application
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
                    <div class="widget-heading">Total Field Owners</div>
                    <div class="widget-subheading">
                      Total Field Owners Registred
                    </div>
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
            <div className="sub_title_text">List of Field Owners :</div>
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
                  title="Add Owner"
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
                  {fieldOwners.length == 0 ? (
                    <tr className="exist_style">
                      Field Owner with tha email does not exist
                    </tr>
                  ) : (
                    fieldOwners.map((fieldOwner) => {
                      return (
                        <tr>
                          <th scope="row">{fieldOwner._id}</th>
                          <td class="address_design">
                            {fieldOwner.lastName + " " + fieldOwner.firstName}
                          </td>
                          <td class="address_design ">{fieldOwner.email}</td>
                          <td>{fieldOwner.phone}</td>
                          <td>{fieldOwner.state}</td>
                          <td>
                            {fieldOwner.status === "Confirmed" ? (
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
                              title="Modify Owner"
                            >
                              <IconButton aria-label="add-person">
                                <CreateIcon
                                  style={{ color: "green" }}
                                  onClick={() => {
                                    setOwner({
                                      _id: fieldOwner._id,
                                      firstName: fieldOwner.firstName,
                                      lastName: fieldOwner.lastName,
                                      phone: fieldOwner.phone,
                                      email: fieldOwner.email,
                                      address: fieldOwner.address,
                                      state: fieldOwner.state,
                                    });
                                    doSomething("Update");
                                  }}
                                />
                              </IconButton>
                            </span>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="Delete Owner"
                            >
                              <IconButton aria-label="add-person">
                                <DeleteIcon
                                  style={{ color: "red" }}
                                  onClick={() =>
                                    deleteFieldOwner(
                                      fieldOwner.firstName,
                                      fieldOwner.lastName,
                                      fieldOwner.status,
                                      fieldOwner._id
                                    )
                                  }
                                />
                              </IconButton>
                            </span>

                            {fieldOwner.status === "Confirmed" ? (
                              <span
                                data-toggle="tooltip"
                                data-placement="bottom-start"
                                title="Add Field"
                              >
                                <IconButton aria-label="add-person">
                                  <AddIcon
                                    tooltip="Add field"
                                    onClick={() => {
                                      setFieldOwner({
                                        _id: fieldOwner._id,
                                        firstName: fieldOwner.firstName,
                                        lastName: fieldOwner.lastName,
                                        phone: fieldOwner.phone,
                                        email: fieldOwner.email,
                                        address: fieldOwner.address,
                                        state: fieldOwner.state,
                                      });
                                      doSomething("AddField");
                                    }}
                                  />
                                </IconButton>
                              </span>
                            ) : (
                              ""
                            )}

                            <button
                              disabled={fieldOwner.status === "Confirmed"}
                              class="mb-2 mr-3 btn btn-info confirm_button"
                              onClick={() =>
                                confirmFieldOwner(
                                  fieldOwner.firstName,
                                  fieldOwner.lastName,
                                  fieldOwner._id
                                )
                              }
                            >
                              Confirm
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub_title">
            <div className="sub_title_text">List of Fields :</div>
            <div className="sub_title_text_select_city"></div>
          </div>
          <div className="container">
            <div className="tools_container">
              <div className="search_container">
                <SearchBar
                  value={searchField}
                  onChange={(newValue) => setSearchField(newValue)}
                  onRequestSearch={searchFieldEmail}
                />
              </div>
              <div
                className="addUser_container"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Tooltip on bottom"
              ></div>
            </div>
            <div className="table-responsive scrollable" id="table">
              <table class="mb-0 table table-custum-design">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Field Name</th>
                    <th>Field Owner Email</th>
                    <th>Phone</th>
                    <th>State</th>
                    <th>Price</th>
                    <th colspan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.length == 0 ? (
                    <tr className="exist_style">
                      Field with that user email does not exist
                    </tr>
                  ) : (
                    fields.map((field) => {
                      return (
                        <tr>
                          <th scope="row">{field._id}</th>
                          <td>{field.name}</td>
                          <td class="address_design ">
                            {field.fieldOwner.email}
                          </td>
                          <td class="address_design">
                            {field.fieldOwner.phone}
                          </td>
                          <td>{field.state}</td>
                          <td>
                            <div class="mb-2 mr-2 badge badge-pill badge-alternate">
                              {field.price} DT
                            </div>
                          </td>
                          <td>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="Modify Field"
                            >
                              <IconButton aria-label="add-person">
                                <CreateIcon
                                  style={{ color: "green" }}
                                  onClick={() => {
                                    setFieldUpdate({
                                      _id: field._id,
                                      name: field.name,
                                      address: field.address,
                                      state: field.state,
                                      type: field.type,
                                      price: field.price,
                                    });
                                    doSomething("UpdateField");
                                  }}
                                />
                              </IconButton>
                            </span>
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom-start"
                              title="Delete Field"
                            >
                              <IconButton aria-label="add-person">
                                <DeleteIcon
                                  style={{ color: "red" }}
                                  onClick={() =>
                                    deleteField(field.name, field._id)
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
                                    setFieldUpdate({
                                      _id: field._id,
                                      name: field.name,
                                      address: field.address,
                                      state: field.state,
                                      type: field.type,
                                      price: field.price,
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

export default FieldOwners;

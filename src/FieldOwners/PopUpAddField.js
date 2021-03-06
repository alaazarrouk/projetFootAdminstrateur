import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PopUpAddField.css";
import "../main.css";
import axios from "../axios";

const PopUpAddField = ({
  _id,
  firstName,
  lastName,
  phone,
  email,
  address,
  state,
  refresh,
  onChange,
}) => {
  const states = [
    "Not-Selected",
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

  const types = ["Not-Selected", "Tarton", "Gazon"];
  const [field, setField] = useState({
    name: "",
    address: "",
    state: "Not-Selected",
    type: "Not-Selected",
    price: "",
    fieldOwnerId: _id,
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    state: "",
    type: "",
    price: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setField({ ...field, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const val = validateForm();
    console.log("form status", val);
    if (val) {
      field.fieldOwnerId = _id;
      await axios.post(`/create/field`, field).then((response) => {
        toast.success("Field successfully updated", {
          className: "Toastify__toast",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onChange(!refresh);
        setField({
          name: "",
          address: "",
          state: "Not-Selected",
          type: "Not-Selected",
          price: "",
          fieldOwnerId: _id,
        });
      });
    }
  };
  function validateForm() {
    var containsError = false;
    var nameError = "",
      addressError = "",
      typeError = "",
      stateError = "",
      priceError = "";
    console.log("Im in validation");

    if (field.name.length < 4) {
      nameError = "Minimum Length is 4 ";

      containsError = true;
    }
    if (field.name.length > 3 && field.name.includes(" ")) {
      nameError = "Enter a valid name";
      containsError = true;
    }

    if (field.address.length < 4) {
      addressError = "Minimum Length is 4";
      containsError = true;
    }
    if (field.type === "Not-Selected") {
      typeError = "You must select a type";
      containsError = true;
    }
    if (field.state === "Not-Selected") {
      stateError = "You must select a state";
      containsError = true;
    }
    if (field.price.length < 2) {
      priceError = "Enter a valid price";
      containsError = true;
    }
    setErrors({
      name: nameError,
      address: addressError,
      type: typeError,
      state: stateError,
      price: priceError,
    });

    console.log(" contains errors:", containsError);

    return !containsError;
  }

  return (
    <div className="PopUpAddField">
      <ToastContainer />

      <h2> Create Field</h2>
      <form class="update_Form">
        <div className="first_Container">
          <div className="first_Name_container">
            <label htmlFor="first_Name"> Field Name :</label>
            <input
              name="name"
              id="first_Name"
              placeholder="Field Name"
              type="text"
              value={field.name}
              onChange={handleChange}
              class={errors.name ? " form-control error_input" : "form-control"}
            />
            {errors.name ? <div class="error_div">{errors.name}</div> : ""}
          </div>
          <div className="last_Name_container">
            <label htmlFor="last_Name">Price :</label>
            <input
              name="price"
              id="last_Name"
              placeholder="Price"
              type="text"
              onChange={handleChange}
              value={field.price}
              class={
                errors.price ? " form-control error_input" : "form-control"
              }
            />
            {errors.price ? <div class="error_div">{errors.price}</div> : ""}
          </div>
        </div>

        <div className="third_Container">
          <div className="address_Container">
            <label htmlFor="address"> Address:</label>
            <input
              name="address"
              id="address"
              placeholder="Address"
              type="text"
              onChange={handleChange}
              value={field.address}
              class={
                errors.address ? " form-control error_input" : "form-control"
              }
            />
            {errors.address ? (
              <div class="error_div">{errors.address}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="forth_Container">
          <div className="state_Container">
            <label htmlFor="state">State:</label>
            <select
              name="state"
              id="state"
              value={field.state}
              class={
                errors.state ? " form-control error_input" : "form-control"
              }
              onChange={handleChange}
            >
              {states.map((city) => {
                return <option value={city}>{city}</option>;
              })}
            </select>
            {errors.state ? (
              <div class="error_div extra_style">{errors.state}</div>
            ) : (
              ""
            )}
          </div>
          <div className="state_Container">
            <label htmlFor="state">Type:</label>
            <select
              name="type"
              id="state"
              value={field.type}
              class={errors.type ? " form-control error_input" : "form-control"}
              onChange={handleChange}
            >
              {types.map((type) => {
                return <option value={type}>{type}</option>;
              })}
            </select>
            {errors.state ? (
              <div class="error_div extra_style">{errors.type}</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <button id="submit" class="mt-1 btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PopUpAddField;

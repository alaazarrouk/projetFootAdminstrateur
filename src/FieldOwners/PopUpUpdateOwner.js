import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PopUpUpdateOwner.css";
import "../main.css";
import axios from "../axios";

const PopUpUpdateOwner = ({
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

  useEffect(async () => {
    setPerson({
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      address: address,
      state: state,
      type: "Field Owner",
      password: "",
    });
  }, [_id]);
  const [person, setPerson] = useState({
    _id: _id,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    address: address,
    state: state,
    type: "Field Owner",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setPerson({ ...person, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const val = validateForm();
    console.log("form status", val);
    if (val) {
      await axios
        .patch(`/user/updateClient/${email}`, person)
        .then((response) => {
          toast.success("User successfully updated", {
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
          console.log(response.data);
        });
    }
  };
  function validateForm() {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const confirmEmail = !person.email.match(mailformat);
    var containsError = false;
    var firstNameError = "",
      lastNameError = "",
      phoneError = "",
      emailError = "",
      addressError = "",
      stateError = "",
      passwordError = "";
    console.log("Im in validation");

    if (person.firstName.length < 4) {
      firstNameError = "Minimum Length is 4 ";

      containsError = true;
    }
    if (person.firstName.length > 3 && person.firstName.includes(" ")) {
      firstNameError = "Enter a valid first name";
      containsError = true;
    }
    if (person.lastName.length < 4) {
      lastNameError = "Minimum Length is 4";
      containsError = true;
    }
    if (person.lastName.length > 3 && person.lastName.includes(" ")) {
      lastNameError = "Enter a valid last name";
      containsError = true;
    }
    if (person.email === "") {
      emailError = "Field is Empty";
      containsError = true;
    }
    if (person.phone.length < 8) {
      phoneError = "Minimum Length is 8";
      containsError = true;
    }
    if (person.phone.length > 8) {
      phoneError = "Maximum Length is 8";
      containsError = true;
    }
    if (confirmEmail) {
      emailError = "Enter a valid email";
      containsError = true;
    }
    if (person.address.length < 4) {
      addressError = "Minimum Length is 4";
      containsError = true;
    }
    if (person.password.length > 0 && person.password.length < 4) {
      passwordError = "Minimum Length is 4";
      containsError = true;
    }
    if (person.password.length > 3 && person.password.includes(" ")) {
      passwordError = "Enter a valid password";
      containsError = true;
    }
    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      phone: phoneError,
      email: emailError,
      address: addressError,
      state: stateError,
      password: passwordError,
    });

    console.log(" contains errors:", containsError);

    return !containsError;
  }

  return (
    <div className="PopUpUpdateOwner">
      <ToastContainer />
      <h2> Update Field Owner</h2>
      <form class="update_Form">
        <div className="first_Container">
          <div className="first_Name_container">
            <label htmlFor="first_Name"> First Name :</label>
            <input
              name="firstName"
              id="first_Name"
              placeholder="First Name"
              type="text"
              value={person.firstName}
              onChange={handleChange}
              class={
                errors.firstName ? " form-control error_input" : "form-control"
              }
            />
            {errors.firstName ? (
              <div class="error_div">{errors.firstName}</div>
            ) : (
              ""
            )}
          </div>
          <div className="last_Name_container">
            <label htmlFor="last_Name">Last Name :</label>
            <input
              name="lastName"
              id="last_Name"
              placeholder="Last Name"
              type="text"
              onChange={handleChange}
              value={person.lastName}
              class={
                errors.lastName ? " form-control error_input" : "form-control"
              }
            />
            {errors.lastName ? (
              <div class="error_div">{errors.lastName}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="second_Container">
          <div className="email_Container">
            <label htmlFor="first_Name"> Email Address:</label>
            <input
              name="email"
              id="email"
              placeholder="Email Address"
              type="text"
              onChange={handleChange}
              value={person.email}
              class={
                errors.email ? " form-control error_input" : "form-control"
              }
            />
            {errors.email ? <div class="error_div">{errors.email}</div> : ""}
          </div>
          <div className="phone_Number_Container">
            <label htmlFor="phone_Number">Phone Number :</label>
            <input
              name="phone"
              id="phone_Number"
              placeholder="Phone Number"
              type="text"
              value={person.phone}
              onChange={handleChange}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              class={
                errors.phone ? " form-control error_input" : "form-control"
              }
            />
            {errors.phone ? <div class="error_div">{errors.phone}</div> : ""}
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
              value={person.address}
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
              class="form-control"
              onChange={handleChange}
              value={person.state}
            >
              {states.map((city) => {
                return <option value={city}>{city}</option>;
              })}
            </select>
          </div>
          <div className="password_Container">
            <label htmlFor="password">Password :</label>
            <input
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              class={
                errors.password ? " form-control error_input" : "form-control"
              }
              value={person.password}
              onChange={handleChange}
            />
            {errors.password ? (
              <div class="error_div">{errors.password}</div>
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

export default PopUpUpdateOwner;

import React, { useEffect, useState } from "react";
import "./Home.css";
import "./main.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "./axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Home = () => {
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
  const [totalGains, setTotalGains] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [state, setState] = useState("All");
  const [fields, setFields] = useState([]);

  useEffect(async () => {
    await axios.get(`/get/allUsers/count`).then((response) => {
      console.log(response.data);
      setClients(response.data.nbUsers);
    });
    await axios.get(`/get/gains/administrator`).then((response) => {
      console.log(response.data);
      setTotalGains(response.data.administrator_gains);
    });
    await axios.get(`/get/total/fields`).then((response) => {
      console.log(response.data);
      setTotalFields(response.data.total_Fields);
    });
  }, []);

  useEffect(async () => {
    await axios.get(`/get/bestRatedFields/${state}`).then((response) => {
      console.log(response.data);
      setFields(response.data);
    });
  }, [state]);

  const handleChange = (event) => {
    const newState = event.target.value;
    console.log(newState);
    setState(newState);
  };

  return (
    <div className="Home">
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <div class="page-title-icon">
                  <i class="pe-7s-home icon-gradient bg-mean-fruit"></i>
                </div>
                <div>
                  Analytics Dashboard
                  <div class="page-title-subheading">
                    The Main Dashboard contains the most needed statistics of
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
                    <div class="widget-heading">Total Clients</div>
                    <div class="widget-subheading">Total Clients Registred</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-success">
                      <span>{clients}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xl-4">
              <div class="card mb-3 widget-content">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-heading">Gains</div>
                    <div class="widget-subheading">Total Money Gained</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-primary">
                      <span>$ {totalGains}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xl-4">
              <div class="card mb-3 widget-content">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-heading">Total Fields</div>
                    <div class="widget-subheading">Total Fields Registred</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-warning">
                      <span>{totalFields}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sub_title">
            <div className="sub_title_text">Best Rated Fields :</div>
            <div className="sub_title_text_select_city">
              <span>Select a city :</span>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  City
                </InputLabel>
                <Select
                  native
                  value={state}
                  onChange={handleChange}
                  label="Age"
                >
                  {states.map((city) => {
                    return <option value={city}>{city}</option>;
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="container">
            <div className="table-responsive scrollable">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover table-custum-design ">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Name</th>
                    <th className="text-center">City</th>
                    <th className="text-center">Field Owner</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Total reservations</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((ratedField) => {
                    return (
                      <tr>
                        <td className="text-center text-muted">
                          {ratedField.fieldData._id}
                        </td>
                        <td>
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3"></div>
                              <div className="widget-content-left flex2">
                                <div className="widget-heading">
                                  {ratedField.fieldData.name}
                                </div>
                                <div className="widget-subheading opacity-7">
                                  {ratedField.fieldData.type}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          {ratedField.fieldData.state}
                        </td>
                        <td className="text-center text-muted">
                          {ratedField.fieldData.fieldOwner.email}
                        </td>
                        <td className="text-center text-muted">
                          {ratedField.fieldData.fieldOwner.phone}
                        </td>
                        <td className="text-center text-muted">
                          <i class=" pe-7s-angle-up-circle "></i>{" "}
                          <span class="reservation_field">
                            {" "}
                            {ratedField.nbrReservations}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="d-block text-center card-footer">
              <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
                <i className="pe-7s-trash btn-icon-wrapper"> </i>
              </button>
              <button className="btn-wide btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import "./App.css";
import Home from "./Home";
import Users from "./Users/Users";
import FieldOwners from "./FieldOwners/FieldOwners";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/field-owners">
            <FieldOwners />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

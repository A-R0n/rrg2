import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login.js";
import Home from "./Home.js";
import SignUp from "./SignUp.js";
import { AuthProvider } from "./Auth.js";

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />

      </div>
    </Router>
    </AuthProvider>
  )
}

export default App;

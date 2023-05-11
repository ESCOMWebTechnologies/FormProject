import React from "react";
import Login from "./Components/LogIn.jsx";
import ReactDOM from 'react-dom';
class LogInApp extends React.Component {
  render() {
    return (
      <Login/>
    );
  }
}
export default LogInApp;
const wrapper = document.getElementById("main-app");
wrapper && ReactDOM.render(<LogInApp />, wrapper);
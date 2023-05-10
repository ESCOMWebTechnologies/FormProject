import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Menu from './Components/Menu.jsx';
class MainMenuApp extends React.Component {
  render() {
    return (
        <div>
            <Menu/>
        </div>
    );
  }
}
export default MainMenuApp;
const wrapper = document.getElementById("main-app");
wrapper ? ReactDOM.render(<MainMenuApp />, wrapper) : false;
import React from "react";
import Login from "./LogInApp.jsx";
import Menu from "./MainMenuApp.jsx";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
ReactDOM.render(
    <BrowserRouter>
        <Switch>
          <Route path='/FormProject/Login/Menu'>
            <Menu/>
          </Route>
          <Route path="/FormProject/Login/*" render={()=><h1>404</h1>}></Route>
          <Route path='/FormProject'>
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>,
    document.getElementById('main-app')
);
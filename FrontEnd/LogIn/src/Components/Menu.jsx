import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
class Menu extends React.Component {
    render() {
        return (
            <div class="row">
                <div class="alert alert-success" role="alert" id="success-alert">
                    <div>Login successful</div>
                    <button type="button" class="btn btn-close" aria-label="Close"></button>
                </div>
                <h1>Welcome!</h1>
                <ul>
                    <li>Bisogno Gandarilla Ricardo</li>
                    <li>Ruiz Salgado Nayeli Adriana</li>
                    <li>Ulrich Tamayo Daniel</li>
                </ul>
            </div>
        );
    }
}
export default Menu;
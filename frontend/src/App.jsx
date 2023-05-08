import React from "react";
import ReactDOM from "react-dom/client";
// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

ReactDOM.createRoot(document.getElementById("cuerpo")).render(
  <React.StrictMode>
    <h1>Hello, Bootstrap and Webpack!</h1>
    <button class="btn btn-primary">Primary button</button>
  </React.StrictMode>
);
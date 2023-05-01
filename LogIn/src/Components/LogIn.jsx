import React from 'react';
import { Redirect } from 'react-router-dom';
class LogIn extends React.Component {
    constructor(){
        super();
        this.state = {
            condition: false
        };
        this.validateUser = this.validateUser.bind(this);
    }
    validateUser = (event) => {
        event.preventDefault();
        let user = document.getElementById("user").value;
        let password = document.getElementById("password").value;
        const requestOptions = {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: user, password: password})
        }
        //fetch('LogInForm',requestOptions)
        fetch("LogInForm?username="+user+"&password="+password)
        .then(response => response.text()).then( resp =>{
                let exist = resp.includes("OK");
                if(exist){
                    this.setState({condition:true});
                }else{
                    this.setState({ condition: false});
                    document.getElementById("user").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("alertShow").style.display = "flex";
                }
            }
        );
    }
    render() {
        if(this.state.condition){
            return <Redirect to='/FormProject/Login/Menu'/>;
        }
        return (
            <div className="row" id="login" style={{display:'none'}}>
                <div className="alert alert-danger alert-dismissible" role="alert" id="alertShow" style={{display:'none'}}>
                    <div>User not found</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form onSubmit={this.validateUser}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Username</span>
                        <input className="form-control" type="text" id="user" placeholder="Set your user here" arial-label="Set your user here" required/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Password</span>
                        <input type="password" className="form-control" id="password" placeholder="Set your password here" arial-label="Set your password here" required/>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-outline-success" type="submit">Login</button>
                        <button className="btn btn-outline-warning" type="reset">Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default LogIn;
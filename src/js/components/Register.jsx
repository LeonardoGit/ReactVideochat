"use strict";

import React from "react";
import ReactMixin from "react-mixin";
import { Jumbotron, Button } from "react-bootstrap";
import Auth from "../services/Auth";

export default class Register extends React.Component {
    constructor() {
        this.state = {
            userName: "",
            email:    "",
            password: ""
        };
    }

    /**
     * @param {Event} e
     */
    signup(e) {
        e.preventDefault();

        Auth.signup(this.state.userName, this.state.email, this.state.password)
//            .catch(function (err) {
//                alert("Error creating account. Try again.");
//                console.log("Error creating account", err);
//            });
    }

    render() {
        return (
            <Jumbotron className="login">
                <h2>Sign up</h2>

                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input type="text" valueLink={this.linkState("userName")}
                               className="form-control" id="userName"
                               placeholder="Username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">E-mail</label>

                        <input type="text" valueLink={this.linkState("email")}
                               className="form-control" id="email"
                               placeholder="E-mail" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input type="password" valueLink={this.linkState("password")}
                               className="form-control" id="password"
                               placeholder="Password" />
                    </div>

                    <Button type="submit" onClick={this.signup.bind(this)}>Submit</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Register.prototype, React.addons.LinkedStateMixin);
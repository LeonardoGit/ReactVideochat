import React from "react/addons";
import ReactMixin from "react-mixin";
import { Jumbotron, Button } from "react-bootstrap";
import Auth from "../services/Auth";

export default class Login extends React.Component {
    constructor() {
        this.state = {
            user:     "",
            password: ""
        };
    }

    /**
     * @param {Event} e
     */
    login(e) {
        e.preventDefault();

        Auth.login(this.state.user, this.state.password)
//            .catch(function (err) {
//                alert("Error logging in. Try again.");
//                console.log("Error logging in", err);
//            });
    }

    render() {
        return (
            <Jumbotron className="login">
                <h2>Login</h2>

                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input type="text" valueLink={this.linkState("user")}
                               className="form-control" id="username"
                               placeholder="Username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input type="password" valueLink={this.linkState("password")}
                               className="form-control" id="password"
                               placeholder="Password" />
                    </div>

                    <Button type="submit" onClick={this.login.bind(this)}>Submit</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
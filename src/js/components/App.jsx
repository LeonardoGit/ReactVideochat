"use strict";

import React from "react";
import { Nav, Navbar, NavItem, MenuItem, Button } from "react-bootstrap";
import { RouteHandler, Link } from "react-router";
import LoginStore from "../stores/LoginStore";
import AuthService from "../services/Auth";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getLoginState();
    }

    _getLoginState() {
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.changeListener);
    }

    logout(e) {
        e.preventDefault();
        AuthService.logout();
    }

    render() {
        return (
            <div>
                <Navbar brand="React Video Chat" inverse toggleNavKey={0}>
                    <Nav right eventKey={0}> {/* This is the eventKey referenced */}
                        {this.headerItems}
                    </Nav>
                </Navbar>

                <div className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }

    get headerItems() {
        if (!this.state.userLoggedIn) {
            return (
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="login">Login</Link>
                        </li>

                        <li>
                            <Link to="signup">Signup</Link>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="home">Home</Link>
                        </li>

                        <li>
                            <a href="#" onClick={this.logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            )
        }
    }
}

export default App;

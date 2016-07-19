"use strict";

import io from 'socket.io-client';
import { LOGIN_URL, SIGNUP_URL } from "../constants/LoginConstants";
import LoginActions from "../actions/LoginActions";

class AuthService {
    constructor() {
        this.socket = io.connect("http://localhost:8088"); //FIXME: Hardcode
    }

    login(login, password) {
        this.socket.emit("login", {login: login, password: password});
        console.info("Login sent");

        LoginActions.loginUser(); //TODO: Delete me

        this.socket.on("setToken", LoginActions.loginUser);
    }

    logout() {
        console.info("logout")

        LoginActions.logoutUser();
    }

    signup(userName, email, password) {
        this.socket.emit("register", {userName: userName, email: email, password: password});
        console.info("Register sent");
    }
}

export default new AuthService();
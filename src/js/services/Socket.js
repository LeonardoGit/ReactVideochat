"use strict";

import io from "socket.io-client";
import { LOGIN_URL, SIGNUP_URL } from "../constants/LoginConstants";
import LoginActions from "../actions/LoginActions";

class SocketService {
    constructor() {
        this.socket = io.connect("http://localhost:8088"); //FIXME: Hardcode

        socket.on("usersList", function (message) {
            console.info("usersList", message);
        });

        socket.on("newUser", function (message) {
            console.info("newUser", message);
        });

        socket.on("usersNotFound", function () {
            console.info("usersNotFound");
        });

        socket.on("roomsList", function (message) {
            console.info("roomsList", message);
        });

        socket.on("userDisconnected", function (message) {
            console.info("userDisconnected", message);
        });

        socket.on("userDisconnectedFromRoom", function (message) {
            console.info("userDisconnectedFromRoom", message);
        });

        socket.on("roomCreated", function (message) {
            console.info("roomCreated", message);
        });

        socket.on("userJoined", function (message) {
            console.info("userJoined", message);
        });

        socket.on("newMessage", function (message) {
            console.info("newMessage", message);
        });
    }
}

export default new SocketService();
"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import RouterContainer from "../services/RouterContainer";
import {LOGIN_USER, LOGOUT_USER} from "../constants/LoginConstants.js";
import {Navigation} from "react-router";

export default {
    loginUser: (token) => {
        token = "yhju"; //FIXME: Debug purposes

        if (!token) {
            console.error("Token is undefined");
        }

        var savedToken = sessionStorage.getItem("videoChat");

        if (savedToken !== token) {
            let nextPath = RouterContainer.get().getCurrentQuery().nextPath || "/chat";

            RouterContainer.get().transitionTo(nextPath);
            console.info("transitionTo", nextPath);

            sessionStorage.setItem("videoChat", token);
        }

        ChatAppDispatcher.dispatch({
            actionType: LOGIN_USER,
            token:      token
        });
    },

    logoutUser: () => {
        RouterContainer.get().transitionTo("/login");
        sessionStorage.removeItem("videoChat");

        ChatAppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}
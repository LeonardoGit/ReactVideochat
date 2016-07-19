"use strict";

// React
import React from "react";

// Components
import App from "../components/App.jsx";
import Home from "../components/Home.jsx";
import NotFound from "../components/NotFound.jsx";
import About from "../components/About.jsx";
import Login from "../components/Login.jsx";
import ChatApp from "../components/ChatApp.jsx";
import Register from "../components/Register.jsx";

// Actions
import LoginActions from "../actions/LoginActions";

// Routing
import ReactRouter from "react-router";
import { Route, DefaultRoute, NotFoundRoute } from "react-router";
import RouterContainer from "../services/RouterContainer";

window.React = React; // export for http://fb.me/react-devtools

let routes = (
    <Route path="/" handler={App}>

        <NotFoundRoute handler={NotFound} />
        <Route name="home" path="/" handler={Home}/>
        <Route path="about" handler={About} />
        <Route path="chat" handler={ChatApp} />
        <Route name="signup" handler={Register} />
        <Route name="login" handler={Login} />
    </Route>
);

let router = ReactRouter.create({routes});
RouterContainer.set(router);

let token = sessionStorage.getItem("videoChat");

if (token) {
    LoginActions.loginUser(token);
}

router.run(function (Handler) {
    React.render(<Handler />, document.getElementById("app"));
});

// Via HTML5 history API:
//
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.querySelector('app'));
// });
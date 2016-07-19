"use strict";

import React from "react";

import ChatExampleData from "../ChatExampleData";
import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";
import MessageSection from "./chat/MessageSection.jsx";
import ThreadSection from "./chat/ThreadSection.jsx";
import AuthenticatedComponent from "./AuthenticatedComponent.jsx";

export default AuthenticatedComponent(class ChatApp extends React.Component {
    constructor() {
        ChatExampleData.init(); // load example data into localstorage
        ChatWebAPIUtils.getAllMessages();
    }

    render() {
        return (
            <div className="chatapp row">
                <ThreadSection />
                <MessageSection />
            </div>
        );
    }
});
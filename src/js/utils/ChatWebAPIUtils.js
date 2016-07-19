"use strict";

import ChatServerActionCreators from "../actions/ChatServerActionCreators";

//TODO: Implement logic

export default {
    getAllMessages: function () {
        // simulate retrieving data from a database
        let rawMessages = JSON.parse(localStorage.getItem("messages"));

        // simulate success callback
        ChatServerActionCreators.receiveAll(rawMessages);
    },

    createMessage: function (message, threadName) {
        // simulate writing to a database
        let rawMessages = JSON.parse(localStorage.getItem("messages")),
            timestamp   = Date.now(),
            id          = 'm_' + timestamp,
            threadID    = message.threadID || ('t_' + Date.now());

        let createdMessage = {
            id:         id,
            threadID:   threadID,
            threadName: threadName,
            authorName: message.authorName,
            text:       message.text,
            timestamp:  timestamp
        };

        rawMessages.push(createdMessage);
        localStorage.setItem("messages", JSON.stringify(rawMessages));

        // simulate success callback
        setTimeout(function () {
            ChatServerActionCreators.receiveCreatedMessage(createdMessage);
        }, 0);
    }
};
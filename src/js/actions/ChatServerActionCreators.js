"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import ChatConstants from "../constants/ChatConstants";

let ActionTypes = ChatConstants.ActionTypes;

export default {
    receiveAll(rawMessages) {
        ChatAppDispatcher.dispatch({
            type:        ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    },

    receiveCreatedMessage(createdMessage) {
        ChatAppDispatcher.dispatch({
            type:       ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createdMessage
        });
    }
};
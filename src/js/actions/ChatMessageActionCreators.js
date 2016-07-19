"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import ChatConstants from "../constants/ChatConstants";
import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";
import ChatMessageUtils from "../utils/ChatMessageUtils";

let ActionTypes = ChatConstants.ActionTypes;

export default {
    createMessage(text, currentThreadID) {
        ChatAppDispatcher.dispatch({
            type:            ActionTypes.CREATE_MESSAGE,
            text:            text,
            currentThreadID: currentThreadID
        });

        let message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
        ChatWebAPIUtils.createMessage(message);
    }
};
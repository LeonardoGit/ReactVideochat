"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import ChatConstants from "../constants/ChatConstants";

let ActionTypes = ChatConstants.ActionTypes;

export default {
    clickThread(threadID) {
        ChatAppDispatcher.dispatch({
            type:     ActionTypes.CLICK_THREAD,
            threadID: threadID
        });
    }
};
"use strict";

import keyMirror from "react/lib/keyMirror";

export default {
    ActionTypes: keyMirror({
        CLICK_THREAD:                null,
        CREATE_MESSAGE:              null,
        RECEIVE_RAW_CREATED_MESSAGE: null,
        RECEIVE_RAW_MESSAGES:        null
    })
};
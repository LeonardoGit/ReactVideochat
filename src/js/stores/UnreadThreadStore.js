"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import ChatConstants from "../constants/ChatConstants";
import MessageStore from "../stores/MessageStore";
import ThreadStore from "../stores/ThreadStore";
import assign from "object-assign";
import { EventEmitter } from "events";

let ActionTypes  = ChatConstants.ActionTypes,
    CHANGE_EVENT = "change";

let UnreadThreadStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCount: function () {
        let threads     = ThreadStore.getAll(),
            unreadCount = 0;

        for (let id in threads) {
            if (!threads[id].lastMessage.isRead) {
                unreadCount++;
            }
        }

        return unreadCount;
    }
});

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    ChatAppDispatcher.waitFor([
        ThreadStore.dispatchToken,
        MessageStore.dispatchToken
    ]);

    switch (action.type) {
        case ActionTypes.CLICK_THREAD:
            UnreadThreadStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            UnreadThreadStore.emitChange();
            break;

        default:
        // do nothing
    }
});

export default UnreadThreadStore;
"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import ChatConstants from "../constants/ChatConstants";
import ChatMessageUtils from "../utils/ChatMessageUtils";
import ThreadStore from "../stores/ThreadStore";
import assign from "object-assign";
import { EventEmitter } from "events";

let ActionTypes  = ChatConstants.ActionTypes,
    CHANGE_EVENT = "change",
    _messages    = {};

function _addMessages(rawMessages) {
    rawMessages.forEach(function (message) {
        if (!_messages[message.id]) {
            _messages[message.id] = ChatMessageUtils.convertRawMessage(
                message,
                ThreadStore.getCurrentID()
            );
        }
    });
}

function _markAllInThreadRead(threadID) {
    for (let id in _messages) {
        if (_messages[id].threadID === threadID) {
            _messages[id].isRead = true;
        }
    }
}

let MessageStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function (id) {
        return _messages[id];
    },

    getAll: function () {
        return _messages;
    },

    /**
     * @param {string} threadID
     */
    getAllForThread: function (threadID) {
        let threadMessages = [];

        for (let id in _messages) {
            if (_messages[id].threadID === threadID) {
                threadMessages.push(_messages[id]);
            }
        }

        threadMessages.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            }

            return 0;
        });

        return threadMessages;
    },

    getAllForCurrentThread: function () {
        return this.getAllForThread(ThreadStore.getCurrentID());
    }
});

MessageStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    switch (action.type) {
        case ActionTypes.CLICK_THREAD:
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();

            break;

        case ActionTypes.CREATE_MESSAGE:
            let message = ChatMessageUtils.getCreatedMessageData(
                action.text,
                action.currentThreadID
            );

            _messages[message.id] = message;
            MessageStore.emitChange();

            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            _addMessages(action.rawMessages);
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();

            break;

        default:
        // do nothing
    }
});

export default MessageStore;
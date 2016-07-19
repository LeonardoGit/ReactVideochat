"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import ChatConstants from "../constants/ChatConstants";
import ChatMessageUtils from "../utils/ChatMessageUtils";
import assign from "object-assign";
import { EventEmitter } from "events";

let ActionTypes  = ChatConstants.ActionTypes,
    CHANGE_EVENT = "change";

let _currentID = null,
    _threads   = {};

var ThreadStore = assign({}, EventEmitter.prototype, {
    init: function (rawMessages) {
        rawMessages.forEach(function (message) {
            let threadID = message.threadID,
                thread   = _threads[threadID];

            if (thread && thread.lastMessage.timestamp > message.timestamp) {
                return;
            }

            _threads[threadID] = {
                id:          threadID,
                name:        message.threadName,
                lastMessage: ChatMessageUtils.convertRawMessage(message, _currentID)
            };
        }, this);

        if (!_currentID) {
            let allChrono = this.getAllChrono();
            _currentID = allChrono[allChrono.length - 1].id;
        }

        _threads[_currentID].lastMessage.isRead = true;
    },

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

    /**
     * @param {string} id
     */
    get: function (id) {
        return _threads[id];
    },

    getAll: function () {
        return _threads;
    },

    getAllChrono: function () {
        let orderedThreads = [];

        for (let id in _threads) {
            let thread = _threads[id];
            orderedThreads.push(thread);
        }

        orderedThreads.sort(function (a, b) {
            if (a.lastMessage.date < b.lastMessage.date) {
                return -1;
            } else if (a.lastMessage.date > b.lastMessage.date) {
                return 1;
            }

            return 0;
        });

        return orderedThreads;
    },

    getCurrentID: function () {
        return _currentID;
    },

    getCurrent: function () {
        return this.get(this.getCurrentID());
    }

});

ThreadStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    switch (action.type) {
        case ActionTypes.CLICK_THREAD:
            _currentID = action.threadID;
            _threads[_currentID].lastMessage.isRead = true;
            ThreadStore.emitChange();

            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            ThreadStore.init(action.rawMessages);
            ThreadStore.emitChange();

            break;

        default:
        // do nothing
    }
});

export default ThreadStore;
"use strict";

export default {
    convertRawMessage: function (rawMessage, currentThreadID) {
        return {
            id:         rawMessage.id,
            threadID:   rawMessage.threadID,
            authorName: rawMessage.authorName,
            date:       new Date(rawMessage.timestamp),
            text:       rawMessage.text,
            isRead:     rawMessage.threadID === currentThreadID
        };
    },

    getCreatedMessageData: function (text, currentThreadID) {
        let timestamp = Date.now();

        return {
            id:         "m_" + timestamp,
            threadID:   currentThreadID,
            authorName: "Me", // FIXME: Hardcode
            date:       new Date(timestamp),
            text:       text,
            isRead:     true
        };
    }
};
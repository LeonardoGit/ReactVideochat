"use strict";

import React from "react";
import { ListGroupItem } from "react-bootstrap";

let ReactPropTypes = React.PropTypes;

class MessageListItem extends React.Component {
    render() {
        let message = this.props.message;

        return (
            <ListGroupItem className="message-list-item">
                <span className="message-time">
                    [{message.date.toLocaleTimeString()}]
                </span>

                <span className="message-author-name">{message.authorName}:</span>

                <span className="message-text">{message.text}</span>
            </ListGroupItem>
        );
    }
}

MessageListItem.propTypes = {
    message: ReactPropTypes.object
};

export default MessageListItem;
"use strict";

import React from "react";
import { Panel, ListGroup } from "react-bootstrap";

import MessageComposer from "./MessageComposer.jsx";
import MessageListItem from "./MessageListItem.jsx";
import MessageStore from "../../stores/MessageStore";
import ThreadStore from "../../stores/ThreadStore";

function getStateFromStores() {
    return {
        messages: MessageStore.getAllForCurrentThread(),
        thread:   ThreadStore.getCurrent()
    };
}

function getMessageListItem(message) {
    return (
        <MessageListItem
            key={message.id}
            message={message}
            />
    );
}

class MessageSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromStores();
    }

    componentDidMount() {
        this._scrollToBottom();
        MessageStore.addChangeListener(this._onChange.bind(this));
        ThreadStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange.bind(this));
        ThreadStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        let messageListItems = this.state.messages.map(getMessageListItem);

        console.log(this.state.thread)

        return (
            <div className="col-lg-8">
                <Panel
                    className="message-section "
                    header={this.state.thread.name}>

                    <ListGroup ref="messageList" fill className="message-list">
                        {messageListItems}
                    </ListGroup>
                </Panel>

                <MessageComposer threadID={this.state.thread.id} />
            </div>
        );
    }

    componentDidUpdate() {
        this._scrollToBottom();
    }

    _scrollToBottom() {
        //noinspection JSUnresolvedVariable
        let ul = React.findDOMNode(this.refs.messageList);
        ul.scrollTop = ul.scrollHeight;
    }

    /**
     * Event handler for 'change' events from the MessageStore
     */
    _onChange() {
        this.setState(getStateFromStores());
    }

}

export default MessageSection;
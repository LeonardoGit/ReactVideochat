"use strict";

import React from "react";
import { Panel, ListGroup } from "react-bootstrap";

import MessageStore from "../../stores/MessageStore";
import ThreadListItem from "./ThreadListItem.jsx";
import ThreadUnread from "./ThreadUnread.jsx";
import ThreadStore from "../../stores/ThreadStore";
import UnreadThreadStore from "../../stores/UnreadThreadStore";

function getStateFromStores() {
    return {
        threads:         ThreadStore.getAllChrono(),
        currentThreadID: ThreadStore.getCurrentID(),
        unreadCount:     UnreadThreadStore.getCount()
    };
}

class ThreadSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromStores();
    }

    componentDidMount() {
        ThreadStore.addChangeListener(this._onChange.bind(this));
        UnreadThreadStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        ThreadStore.removeChangeListener(this._onChange.bind(this));
        UnreadThreadStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        let threadListItems = this.state.threads.map(function (thread) {
            return (
                <ThreadListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                    />
            );
        }, this);

        return (
            <div className="thread-section col-lg-4">
                <ThreadUnread unreadCount={this.state.unreadCount} />

                <Panel className="thread-list">
                    <ListGroup fill>
                        {threadListItems}
                    </ListGroup>
                </Panel>
            </div>
        );
    }

    /**
     * Event handler for 'change' events from the stores
     */
    _onChange() {
        this.setState(getStateFromStores());
    }
}

export default ThreadSection;
"use strict";

import React from "react";
import { Panel } from "react-bootstrap";

let ReactPropTypes = React.PropTypes;

class ThreadUnread extends React.Component {
    render() {
        if (!this.props.unreadCount) {
            return null
        }

        return (
            <Panel className="thread-count">
                Unread threads: {this.props.unreadCount}
            </Panel>
        );
    }
}

export default ThreadUnread;
"use strict";

import React from "react";
import ReactMixin from "react-mixin";
import { Input } from "react-bootstrap";
import ChatMessageActionCreators from "../../actions/ChatMessageActionCreators";

let ENTER_KEY_CODE = 13;

class MessageComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ""};
    }

    render() {
        return (
            <Input type="textarea"
                   placeholder="Type your message here and hit Enter!"
                   name="message"
                   valueLink={this.linkState("text")}
                   onKeyDown={this._onKeyDown.bind(this)}
                />
        );
    }

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();

            var text = this.state.text.trim();

            if (text) {
                ChatMessageActionCreators.createMessage(text, this.props.threadID);
            }

            this.setState({text: ""});
        }
    }
}

MessageComposer.propTypes = {
    threadID: React.PropTypes.string.isRequired
};

ReactMixin(MessageComposer.prototype, React.addons.LinkedStateMixin);

export default MessageComposer;
"use strict";

import React from "react";

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state.src = props.src;
    }

    render() {
        return (
            <div>
                <video src={this.state.src} autoplay></video>
            </div>
        );
    }
}

export default VideoPlayer;
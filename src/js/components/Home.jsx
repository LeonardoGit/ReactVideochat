"use strict";

import React from "react";

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2 className="text-center">React Chat</h2>

                <div id="app"></div>
            </div>
        )
    }
}

export default Home;
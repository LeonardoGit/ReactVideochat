var config = require("./config.json"),
    server = require("./server");

config.PORT = process.env.PORT || config.PORT;

server.run(config);

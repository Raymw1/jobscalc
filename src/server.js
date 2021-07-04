const express = require("express");
const server = express();


server.get("/", (req, res) => {
    return res.send("Hello!")
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log(`Go to http://127.0.0.1:${PORT}`);
})

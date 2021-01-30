const express = require("express");
const app = express();

let envelopes = [
    
];

app.get("/", (req, res, next) => {
    res.send("Hello World");
    console.log("He's here!");
})

app.listen(3000);
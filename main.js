const express = require("express");
const app = express();

let envelopes = [
    {
        id: 1,
        gas: 40,
        rent: 1400,
        groceries: 60,
        savings: 95,
    },
];

app.post("/chng-env/:id", (req, res, next) => {
    for (let env of envelopes) {
        if (env.id == req.params.id) {
            let holder = env[req.query.item1];
            env[req.query.item1] = env[req.query.item2];
            env[req.query.item2] = holder;
            res.send("Success");
        }
    }
    res.status(500).send();
})

app.delete("/del-env/:id", (req, res, next) => {
    for (let env of envelopes) {
        if (env.id == req.params.id){
            env.id = null;
            env.gas = null;
            env.rent = null;
            env.groceries = null;
            env.savings = null;
            res.send("Success");
            return;
        }
    }
    res.status(500).send();
})

app.post("/crt-env", (req, res, next) => {
    envelopes.push({
        id: req.query.id,
        gas: req.query.gas,
        rent: req.query.rent,
        groceries: req.query.groceries,
        savings: req.query.savings
    });
    res.send("Successful");
});

app.put("/adj-env/:id", (req, res, next) => {
    for (let env of envelopes) {
        if (env.id == req.params.id) {
            env.gas = req.query.gas;
            env.rent = req.query.rent;
            env.groceries = req.query.groceries;
            env.savings = req.query.savings;
            res.send("Success ");
            return;
        }
    }
    res.status(500).send("ERROR");
})

app.get("/env/:id", (req, res, next) => {
    for (let env of envelopes) {
        // console.log(env.id);
        if (env.id == req.params.id) {
            res.send(env);
            return;
        }
    }
    res.status(500).send("ERROR");

})

app.get("/all-env", (req, res, next) => {
    res.send(envelopes);
})

app.get("/", (req, res, next) => {
    res.send("Hello World");
    console.log("He's here!");
})

app.listen(3000);
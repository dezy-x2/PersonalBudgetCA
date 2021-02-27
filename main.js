const express = require("express");
const app = express();
const { Client } = require("pg");

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'danieldesmond',
    port: 5432
});

client.connect();

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

app.post("/crt-env", async (req, res, next) => {
    const id = req.query.id;
    const gas = req.query.gas;
    const rent = req.query.rent;
    const groceries = req.query.groceries;
    const savings = req.query.savings;
    const query = `INSERT INTO personal_budget (id, gas, rent, groceries, savings)
                   VALUES (${id}, ${gas}, ${rent}, ${groceries}, ${savings})`;
    try {
        const dbRes = await client.query(query);
        console.log('Client added');
        res.send("Successful");
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("ERROR")
    }
});

app.put("/adj-env/:id", async (req, res, next) => {
    const id = req.params.id;
    const gas = req.query.gas;
    const rent = req.query.rent;
    const groceries = req.query.groceries;
    const savings = req.query.savings
    const query = `UPDATE personal_budget SET gas = ${gas}, rent = ${rent}, groceries = ${groceries}, savings = ${savings} WHERE id = ${id}`

    try {
        const dbRes = await client.query(query);
        console.log('user adjusted');
        res.send("Successful");
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("ERROR")
    }
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
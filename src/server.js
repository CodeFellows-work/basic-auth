'use strict'; 

const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('../src/auth/routes/signInOut.js');

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

module.exports = {
    app: app,
    start: (PORT) => {
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    },
}
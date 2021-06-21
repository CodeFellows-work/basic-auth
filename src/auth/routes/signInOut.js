'use strict'

const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt');
const base64 = require('base-64'); 

const basic = require('./middleware/basic.js')
const Users = require('../model/userModel.js');

router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) { 
        res.status(403).send("Error Creating User"); 
    }
});

router.post('/signin', basic, signIn);

async function signIn(req, res)  {
    res.status(200).json(req.user)
}
// router.post('/signin', async (req, res) => {

//     // expecting a header object with `authorization: "Basic kajsdnf87qy38"
//     let authHeaders = req.headers.authorization;
//     let basicString = authHeaders.split(' ')[1]; 
//     let decodedString = base64.decode(basicString); 


//     let [username, password] = decodedString.split(':');

//     let userFromDB = await Users.findOne({ where:{ username: username }});
//     let isValid = await bcrypt.compare(password, userFromDB.password);

//     if (isValid) {
//         res.send(userFromDB);
//     } else {
//         res.status(401).send('Authentication Error');
//     }
// });

module.exports = router;

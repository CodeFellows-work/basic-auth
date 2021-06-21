'use strict'

const bcrypt = require('bcrypt'); 
const base64 = require('base-64');
const Users = require('../middleware/modelForMiddle.js');

module.exports = async (req, res, next) => {
    let authHeaders = req.headers.authorization;
    let basicString = authHeaders.split(' ')[1]; 
    let decodedString = base64.decode(basicString); 
    let [username, password] = decodedString.split(':');

    try{
        let userFromDB = await Users.findOne({ where:{ username: username }});
        let isValid = await bcrypt.compare(password, userFromDB.password);
    
        if (isValid) {
            res.send(userFromDB);
            next();
        } else {
            res.status(401).send('Authentication Error');
        }
    } catch(error){
        res.status(403).send('Invalid Login');
    }
}
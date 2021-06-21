// 'use strict';

// // 3rd Party Resources
// const express = require('express');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { Sequelize, DataTypes } = require('sequelize');

// const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
// const PORT = process.env.PORT || 3000;

// // Prepare the express app
// const app = express();

// // Process JSON input and put the data on req.body
// app.use(express.json());

// const sequelize = new Sequelize(DATABASE_URL);

// // Process FORM intput and put the data on req.body
// app.use(express.urlencoded({ extended: true }));

// // Create a Sequelize model
// const Users = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// });


// app.post('/signup', async (req, res) => {

//   try {
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     const record = await Users.create(req.body);
//     res.status(200).json(record);
//   } catch (e) { res.status(403).send("Error Creating User"); }
// });


// app.get('/signin', async (req, res) => {

//   let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
//   let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
//   let decodedString = base64.decode(encodedString); // "username:password"
//   let [username, password] = decodedString.split(':'); // username, password

//   try {
//     const user = await Users.findOne({ where: { username: username } });
//     const valid = await bcrypt.compare(password, user.password);
//     if (valid) {
//       res.status(200).json(user);
//     }
//     else {
//       throw new Error('Invalid User')
//     }
//   } catch (error) { res.status(403).send("Invalid Login"); }

// });

// // make sure our tables are created, start up the HTTP server.
// sequelize.sync()
//   .then(() => {
//     app.listen(PORT, () => console.log('server up'));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });
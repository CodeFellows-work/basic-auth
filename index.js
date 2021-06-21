'use strict'

require('dotenv').config(); 


const server = require('./src/server.js');
const { Sequelize } = require('sequelize')

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

sequelize.sync().then(() => {
    server.start(process.env.PORT || 3000, () => {
      console.log('app is up');
    });
  });
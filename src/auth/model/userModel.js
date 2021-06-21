'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

const UserModel = sequelize.define('Users', {
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false
    },
});

module.exports = UserModel; 
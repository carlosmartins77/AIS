const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Log = require('../framework/database/model/LogModel');

// Login Endpoint
exports.LogGetLogPersistence = async(username) => {
    try {
        const generate_log = await Log.find();
        console.log(generate_log)
        return ({ status: "200", message: generate_log})
    } catch (Error) {
        return ({ status: "403", message: Error})
    }
}
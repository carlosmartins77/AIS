const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Log = require('../framework/database/model/LogModel');

// Login Endpoint
exports.LogGetLogsUserPersistence = async(username) => {
    try {
        const generate_log = await Log.find({username: username});
        console.log(generate_log)
        return ({ status: "200", message: generate_log})
    } catch (Error) {
        res.status(404).send(Error)
    }
}
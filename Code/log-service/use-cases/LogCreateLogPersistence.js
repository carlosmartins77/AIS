const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Log = require('../framework/database/model/LogModel');


// Login Endpoint
exports.LogCreateLogPersistence = async(username, log_id) => {
    try {
        console.log(username, log_id);
        const generate_log = await Log.create({ username, log_description: log_id });
        console.log(generate_log)
    } catch (Error) {
        res.status(404).send(Error)
    }
}
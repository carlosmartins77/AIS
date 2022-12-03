const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Pub = require('../framework/dabatase/model/pubModel');

exports.pubCreatePubPersistence = async(username, content) => {

    try {

        let date = new Date();
        const new_pub = await Pub.create({ username: username, content: content,  });

        return ({ status: "200", message: "Publication was been created" })
        
        //axios.post('http://localhost:7060/createLog', {
        ////  username: username,
        // // log_id: 7
        //})
        //.then((game) => {
        //    console.log(game.status);
        //});
     } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Friend = require('../framework/dabatase/model/friendModel');

exports.friendListFriendPersistence = async(username) => {

    try {
        // retornar equipas do utilizador e depois jogos
        const listfriend = await Friend.find({ username : username}); // Or expression
        return ({ status: "200", message: listfriend })
        
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
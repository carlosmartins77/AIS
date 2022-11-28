const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Game = require('../framework/dabatase/model/teamModel');



exports.teamAddMemberPersistente = async(game) => {

    const { membros, idTeam} = game;
     try {

        const team = await Game.find({idTeam});

        const new_array = [...team.membros,...membros]

        console.log(new_array)

         const schedule_game = await Game.updateOne({ idTeam }, {
            $set: { "membros": new_array }
        })
 
         //axios.post('http://localhost:7060/createLog', {
           //  username: username,
            // log_id: 5
         //})
         //.then((game) => {
         //    console.log(game.status);
         //});
 
         return ({ status: "200", message: "Member Added Sucessufly!"})
     } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }
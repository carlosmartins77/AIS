const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Game = require('../framework/dabatase/model/teamModel');


// Login Endpoint
exports.teamCreateTeamPersistente = async(game) => {

   const { name, username, date, membros} = game;
    try {
        const schedule_game = await Game.create({
            name,
            username,
            date,
            membros
        })

        //axios.post('http://localhost:7060/createLog', {
          //  username: username,
           // log_id: 5
        //})
        //.then((game) => {
        //    console.log(game.status);
        //});

        return ({ status: "200", message: "Team Created!"})
    } 
    catch (Error) {
        console.log(Error) // Com base no codigo de erro retornar algo 
    }
}

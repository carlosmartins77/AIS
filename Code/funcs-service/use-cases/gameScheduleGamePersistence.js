const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Game = require('../framework/dabatase/model/gameModel');


// Login Endpoint
exports.gameScheduleGamePersistence = async(game) => {

   const { username, idTeam1, idTeam2, gameDateTime, status } = game;
    try {
        const schedule_game = await Game.create({
            username,
            idTeam1,
            idTeam2,
            gameDateTime,
            status
        })

        axios.post('http://localhost:7060/createLog', {
            username: username,
            log_id: 5
        })
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: "Game Scheduled"})
    } 
    catch (Error) {
        console.log(Error) // Com base no codigo de erro retornar algo 
    }
}

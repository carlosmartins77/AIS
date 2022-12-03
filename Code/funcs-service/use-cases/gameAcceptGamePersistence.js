const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Game = require('../framework/dabatase/model/gameModel');
const Team = require('../framework/dabatase/model/teamModel');

// Login Endpoint
exports.gameAcceptGamePersistence = async(game) => {

    try 
    {
        const {username, idGame} = game 
        
        //const findgame = await Game.findById(game)
        //const team = await Team.find( { username : username });
          
        const acepptGame = await Game.updateOne({ $and: [{ username : username }, { _id : idGame}] }, {
            $set: { status: "Accepted" }
        })
 
        //axios.post('http://localhost:7060/createLog', {
        //    username: username,
        //    log_id: 8
        //})
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: "Game Accepted"})
        
    } 
    catch (Error) {
        console.log(Error) // Com base no codigo de erro retornar algo 
    }
}

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Game = require('../framework/dabatase/model/gameModel');
const Team = require('../framework/dabatase/model/teamModel');


// Login Endpoint
exports.gameScheduleGamePersistence = async(game) => {

   const { username, idTeam1, idTeam2, gameDateTime, status } = game;
    try 
    {
        const date = gameDateTime.split("/")
        const teamfind = Team.find( { idTeam : idTeam1 } )
        let date2= new Date(Number.parseInt(date[2]),Number.parseInt(date[1]),Number.parseInt(date[0]));

        if(teamfind.username == username)
        {
        const schedule_game = await Game.create({
            username,
            idTeam1,
            idTeam2,
            gameDateTime: date2,
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
    }
    catch (Error) {
        console.log(Error) // Com base no codigo de erro retornar algo 
    }
}

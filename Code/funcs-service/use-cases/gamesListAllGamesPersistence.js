const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Game = require('../framework/dabatase/model/gameModel');

const Team = require('../framework/dabatase/model/teamModel');


exports.gamesListAllGamesPersistence = async(username) => {

    try {

        // retornar equipas do utilizador e depois jogos
        const team = await Team.find({ $or: [{ membros : username }, { username : username}] }); // Or expression
        let all_teams = []
        console.log(team)
        team.forEach(x => { console.log(x.name)
            all_teams.push(x.name)} )
        console.log("F", all_teams)
        
        const game = await Game.find( { $or: [ { idTeam1: { $in : all_teams }}, { idTeam2: { $in : all_teams }} ] } ); // ou in apenas

        return ({ status: "200", message: game})
        
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
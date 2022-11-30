const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Team = require('../framework/dabatase/model/teamModel');



exports.teamAddMemberPersistence = async(team) => {

    const { membros, name, username} = team;
     try {
        const team = await Team.find({name});
        if(username == team[0].username)
        {
            //console.log("taemmembros", team[0].membros)
            //console.log("membros", membros)
            const new_array = [];

            team[0].membros.forEach(x => new_array.push(x))
            new_array.push(membros[0])

            console.log("asdasd", new_array)

            const schedule_game = await Team.updateOne({ name }, {
                $set: { "membros": new_array }
            })
            return ({ status: "200", message: "Member Added Sucessufly!"})
        }
        else return  ({ status: "403", message: "Permission Denied!"})
 
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
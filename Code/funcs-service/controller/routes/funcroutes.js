const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { gameScheduleGamePersistence } = require('../../use-cases/gameScheduleGamePersistence');
const { teamCreateTeamPersistence } = require('../../use-cases/teamCreateTeamPersistence');
const { teamAddMemberPersistence } = require('../../use-cases/teamAddMemberPersistence');
const { teamRemoveMemberPersistente } = require('../../use-cases/teamRemoveMemberPersistente');
const { teamListAllTeamsPersistence } = require('../../use-cases/teamListAllTeamsPersistence');

const { gamesListAllGamesPersistence } = require('../../use-cases/gamesListAllGamesPersistence');

const { gameAcceptGamePersistence } = require('../../use-cases/gameAcceptGamePersistence');

const { friendAddFriendPersistence } = require('../../use-cases/friendAddFriendPersistence');

const { friendRemoveFriendPersistence } = require('../../use-cases/friendRemoveFriendPersistence');


const gameInteractor = require('../../use-cases/gameInteractorMongoDB.js');
const teamInteractor = require('../../use-cases/teamInteractorMongoDB');
const friendInteractor = require('../../use-cases/friendInteractorMongoDB');


app.use('/', router);
app.use(express.json());

router.route('/game/schedule')
    .post(async(req, res) => {
        
        try {
            const { idTeam1, idTeam2, gameDateTime } = req.body;
            console.log(idTeam1);

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                console.log(decoded)
                const {username} = decoded; 
                
                const scheduleGame = await gameInteractor.schedulegame({ gameScheduleGamePersistence }, { username, idTeam1, idTeam2, gameDateTime, status: "Pending"});
                
                return res.json(scheduleGame);
            }

            return error

        } catch (error) {
            return error
        }

    });


router.route('/teams/createteam')
    .post(async(req, res) => {
        
        try {
            const { name } = req.body;

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                

                const {username} = decoded
                
                const team = await teamInteractor.createteam({ teamCreateTeamPersistence: teamCreateTeamPersistence }, { name, username });
                
                return res.json(team);
            }

            return error

        } catch (error) {
            return error
        }

    });


    router.route('/teams/addmember')
    .post(async(req, res) => {
        
        try {
            const { new_member, name } = req.body;

            if(new_member != null || new_member != undefined || name != null || name != undefined )
            {
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
                {
                    token = req.headers.authorization.split(" ")[1]
                    
                    const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                    const {username}= decoded
                    
                    // Verificar se o capitao
                    const team = await teamInteractor.addmember({ teamAddMemberPersistence }, { username, new_member, name });
                    
                    return res.json(team);
                }
            }

            return res.json({"Error": "name or new_member can't be null"})

        } catch (error) {
            return res.json({"Error": error})
        }

    });



    router.route('/friend/addfriend')
    .post(async(req, res) => {
        
        try {
            const { friend_username } = req.body;

            if(friend_username != null || friend_username != undefined )
            {
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
                {
                    token = req.headers.authorization.split(" ")[1]
                    
                    const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                    const {username}= decoded
                    console.log(username)
                    
                    // Verificar se o capitao
                    const team = await friendInteractor.addfriend({ friendAddFriendPersistence }, { username, friend_username });
                    
                    return res.json(team);
                }
            }

            return res.json({"Error": "name or new_member can't be null"})

        } catch (error) {
            return res.json({"Error": error})
        }

    });

    router.route('/friend/removefriend')
    .post(async(req, res) => {
        
        try {
            const { friend_username } = req.body;

            if(friend_username != null || friend_username != undefined )
            {
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
                {
                    token = req.headers.authorization.split(" ")[1]
                    
                    const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                    const {username}= decoded
                    
                    // Verificar se o capitao
                    const team = await friendInteractor.removefriend({ friendRemoveFriendPersistence }, { username, friend_username });
                    
                    return res.json(team);
                }
            }

            return res.json({"Error": "name or new_member can't be null"})

        } catch (error) {
            return res.json({"Error": error})
        }

    });

router.route('/teams/removemember')
    .post(async(req, res) => {
        
        try {
            const { remove_member, name } = req.body;

            if(remove_member != null || remove_member != undefined )
            {
                
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
                {
                    token = req.headers.authorization.split(" ")[1]
                    const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                    const {username}= decoded
                    
                    
                    // Verificar se o capitao
                    const team = await teamInteractor.removemember({ teamRemoveMemberPersistente }, { username, remove_member, name });
                    
                    return res.json(team);
                }
            }

            return res.json({"Error": "name or remove_member can't be null"})

        } catch (error) {
            return res.json({"Error": error})
        }

    });

router.route('/teams/listallteams')
    .get(async(req, res) => {
        
        try {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username} = decoded
                console.clear()
                // Verificar se o capitao
                const team = await teamInteractor.listallmembers({ teamListAllTeamsPersistence }, { username });
              
                return res.json(team);
          }

        } catch (error) {
            return res.json({"Error": error})
        }

    });

    router.route('/games/listallgames')
    .get(async(req, res) => {
        
        try {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username} = decoded
                const team = await gameInteractor.listallgames({ gamesListAllGamesPersistence }, { username });
              
                return res.json(team);
          }

        } catch (error) {
            return res.json({"Error": error})
        }

    });

    router.route('/games/acceptgame')
    .post(async(req, res) => {
        const { idGame } = req.body;

        try {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username} = decoded
                const game = {idGame: idGame, username: username}


                const game2 = await gameInteractor.acceptgame({ gameAcceptGamePersistence }, {game});
                
                return res.json(game2);
          }

        } catch (error) {
            return res.json({"Error": error})
        }

    });


// Other Routes

module.exports = router
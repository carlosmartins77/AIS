const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { gameScheduleGamePersistence } = require('../../use-cases/gameScheduleGamePersistence');
const { teamCreateTeamPersistence } = require('../../use-cases/teamCreateTeamPersistence');
const { teamAddMemberPersistente } = require('../../use-cases/teamAddMemberPersistente');
const { teamRemoveMemberPersistente } = require('../../use-cases/teamRemoveMemberPersistente');

const gameInteractor = require('../../use-cases/gameInteractorMongoDB.js');
const teamInteractor = require('../../use-cases/teamInteractorMongoDB');


app.use('/', router);
app.use(express.json());

router.route('/game/schedule')
    .post(async(req, res) => {
        
        try {
            const { idTeam1, idTeam2, gameDateTime } = req.body;
            //console.log(idTeam1);

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                //console.log(decoded)
                const {username} = decoded; 
                
                const scheduleGame = await gameInteractor.schedulegame({ gameScheduleGamePersistence }, { username, idTeam1, idTeam2, gameDateTime, status: "Waiting approval"});
                
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
                
                const team = await teamInteractor.createteam({ teamCreateTeamPersistence }, { name, username });
                
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
            const { idteam } = req.body;

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

                const {username} = decoded
                
                // Verificar se o capitao
                const team = await teamInteractor.addmember({ teamAddMemberPersistente }, { username, idteam });
                
                return res.json(team);
            }

            return error

        } catch (error) {
            return error
        }

    });

    router.route('/teams/removemember')
    .post(async(req, res) => {
        
        try {
            const { idteam } = req.body;

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

                const {username} = decoded
                
                // Verificar se o capitao
                const team = await teamInteractor.removemember({ teamRemoveMemberPersistente }, { username, idteam });
                
                return res.json(team);
            }

            return error

        } catch (error) {
            return error
        }

    });

    

// Other Routes

module.exports = router
const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { gameScheduleGamePersistence } = require('../../use-cases/gameScheduleGamePersistence');

const gameInteractor = require('../../use-cases/gameInteractorMongoDB.js');


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


// Other Routes

module.exports = router
const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { LogCreateLogPersistence } = require('../../use-cases/LogCreateLogPersistence');
const { LogGetLogPersistence } = require('../../use-cases/LogGetLogPersistence');
const { LogGetLogsUserPersistence } = require('../../use-cases/LogGetLogsUserPersistence');

const LogInteractor = require('../../use-cases/LogInteractorDB');

app.use('/', router);
app.use(express.json());


/**
 * @api {post} /createLog Criar Log
 * @apiName Criar Log
 * @apiGroup Log
 *
 * @apiBody {String} secret_key Key.
 * @apiBody {String} username Username.
 * @apiBody {String} log_id Descrição do Log.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Log generated"
 * }
 */
router.route('/createLog')
    .post(async(req, res) => {
        
        try {
            const {  username, log_id, code } = req.body;

            if (code == process.env.SECRET_KEY)
            {
                const log = await LogInteractor.createLog({ LogCreateLogPersistence }, { username, log_id});
                return res.json(log);
            }
            return error
        } catch (error) {
            return error
        }

    });


/**
 * @api {post} /getLogs Ver Log
 * @apiName Visualizar Logs
 * @apiGroup Log
 *
 * @apiBody {String} secret_key Key.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "{
    "status": "200",
    "message": [
        {
            "_id": "6391d3884264b4d7392d3860",
            "username": "carlos",
            "log_description": "Login",
            "createdAt": "2022-12-08T12:07:36.756Z",
            "updatedAt": "2022-12-08T12:07:36.756Z",
            "__v": 0
        },
        {
            "_id": "6391d3d953e111a81e3eef4c",
            "username": "carlos",
            "log_description": "Login",
            "createdAt": "2022-12-08T12:08:57.664Z",
            "updatedAt": "2022-12-08T12:08:57.664Z",
            "__v": 0
        },
        {
            "_id": "6391d3f653e111a81e3eef4e",
            "username": "carlos",
            "log_description": "Criar Equipa",
            "createdAt": "2022-12-08T12:09:26.739Z",
            "updatedAt": "2022-12-08T12:09:26.739Z",
            "__v": 0
        },
        {
            "_id": "6391d42e22e9805b26b1a798",
            "username": "carlos",
            "log_description": "Login",
            "createdAt": "2022-12-08T12:10:22.389Z",
            "updatedAt": "2022-12-08T12:10:22.389Z",
            "__v": 0
        },
        {
            "_id": "6391d4d822e9805b26b1a79a",
            "username": "ricardo",
            "log_description": "Registo",
            "createdAt": "2022-12-08T12:13:12.716Z",
            "updatedAt": "2022-12-08T12:13:12.716Z",
            "__v": 0
        }
    ]
}"
 * }
 */
router.route('/getLogs')
    .post(async(req, res) => {
        
        try {
            const { code } = req.body;

            if (code == process.env.SECRET_KEY)
            {
                const log = await LogInteractor.getLogs({ LogGetLogPersistence }, { });
                return res.json(log);
            }
            return error
        } catch (error) {
            return error
        }

    });


/**
 * @api {post} /getLogsUser Ver Log do Utilizador
 * @apiName Visualizar Logs do Utilizador
 * @apiGroup Log
 *
 * @apiBody {String} secret_key Key.
 * @apiBody {String} username Username.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "{
    "status": "200",
    "message": [
        {
            "_id": "6391d4d822e9805b26b1a79a",
            "username": "ricardo",
            "log_description": "Registo",
            "createdAt": "2022-12-08T12:13:12.716Z",
            "updatedAt": "2022-12-08T12:13:12.716Z",
            "__v": 0
        }
    ]
}"
 * }
 */
router.route('/getLogsUser')
    .post(async(req, res) => {
        
        try {
            const { code, username} = req.body;

            if (code == process.env.SECRET_KEY)
            {
                const log = await LogInteractor.getLogsUser({ LogGetLogsUserPersistence }, { username});
                return res.json(log);
            }
            return error
        } catch (error) {
            return error
        }

    });


module.exports = router
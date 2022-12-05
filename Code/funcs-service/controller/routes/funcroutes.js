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

const { friendListFriendPersistence } = require('../../use-cases/friendListFriendPersistence');

const { pubCreatePubPersistence } = require('../../use-cases/pubCreatePubPersistence');

const { gameRejectGamePersistence } = require('../../use-cases/gameRejectGamePersistence');

const { pubListAllPubsPersistence } = require('../../use-cases/pubListAllPubsPersistence');

const { pubListAllPubsbyUserPersistence } = require('../../use-cases/pubListAllPubsbyUserPersistence');

const gameInteractor = require('../../use-cases/gameInteractorMongoDB.js');
const teamInteractor = require('../../use-cases/teamInteractorMongoDB');
const friendInteractor = require('../../use-cases/friendInteractorMongoDB');
const pubInteractor = require('../../use-cases/pubInteractorMongoDB');


app.use('/', router);
app.use(express.json());


/**
 * @api {post} /game/schedule Criar um Jogo
 * @apiName Criar um Jogo
 * @apiGroup Jogos
 *
 * @apiBody {String} idTeam1 Nome da Equipa 1.
 * @apiBody {String} idTeam2 Nome da Equipa 2.
 * @apiBody {String} gameDateTime Data do Jogo.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Game Scheduled"
 * }
 */
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


/**
 * @api {post} /teams/createteam Criar uma Equipa
 * @apiName Criar Equipa
 * @apiGroup Equipas
 *
 * @apiBody {String} name Nome da Equipa.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "User Created successfully"
 * }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Cannot create team"
 * }
 */
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


/**
 * @api {post} /teams/addmember Adicionar um membro a Equipa
 * @apiName Adicionar Membro
 * @apiGroup Equipas
 *
 * @apiBody {String} new_member Nome do novo membro.
 * @apiBody {String} name Nome da Equipa.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Member Added Sucessufly!"
 * }
 * 
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!"
 * }
 */
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

/**
 * @api {post} /friend/addfriend Adicionar Amigo
 * @apiName Adicionar Amigo
 * @apiGroup Amigos
 *
 * @apiBody {String} friend_username Username para adicionar a lista de amizades.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Friend Created"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Already have this Friend in the friend list."
 * }
 */
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

/**
 * @api {post} /friend/removefriend Remover Amigo
 * @apiName Remover Amigo
 * @apiGroup Amigos
 *
 * @apiBody {String} friend_username Username para remover da lista de amizades.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "You and username do not have a friend relationship"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "You dont have any friend"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "This user is not you friend"
 * }
 */
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

 /**
 * @api {get} /friend/listfriend Visualizar a lista de amigos
 * @apiName Lista de Amigos
 * @apiGroup Amigos
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : " {
 *           "_id": "638b1a7bdsabb19530017bf4",
 *           "username": "Luis",
 *           "friends": [
 *               "manuel",
 *               "carlos"
 *           ],
 *           "__v": 0
 *       }"
 * }
 */
router.route('/friend/listfriend')
.get(async(req, res) => {
    
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username}= decoded
            
            // Verificar se o capitao
            const team = await friendInteractor.listfriend({ friendListFriendPersistence }, { username });
            
            return res.json(team);
        }

        return res.json({"Error": "name or new_member can't be null"})

    } catch (error) {
        return res.json({"Error": error})
    }

});

 /**
 * @api {post} /teams/removemember Remover Membro
 * @apiName Remover Membro
 * @apiGroup Equipas
 *
 * @apiBody {String} remove_member Nome do Membro a Remover.
 * @apiBody {String} name Nome da Equipa.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Member Removed Sucessufly!"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!d"
 * }
 */
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

 /**
 * @api {get} /teams/listallteams Visualizar todas as equipas
 * @apiName Visualizar Equipas
 * @apiGroup Equipas
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : " {
 *           "_id": "6388c21fc568f4f291315407",
 *           "name": "Espanha",
 *           "username": "ricardo",
 *           "date": "2022-12-01T15:02:55.971Z",
 *           "membros": [
 *               "helder",
 *               "ricardo",
 *               "miguel"
 *           ],
 *           "__v": 0
 *       }"
 * }
 */
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



 /**
 * @api {get} /pub/listallpubs Visualizar todas as publicações
 * @apiName Visualizar Publicações
 * @apiGroup Publicação
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "[
        {
            "_id": "638b316905ca39d8cee8c6d9",
            "username": "ricardo",
            "content": "Alguem Jogar hoje?",
            "createdAt": "2022-12-03T11:22:17.610Z",
            "updatedAt": "2022-12-03T11:22:17.610Z",
            "__v": 0
        },
        {
            "_id": "638b317b05ca39d8cee8c6db",
            "username": "carlos",
            "content": "Ganhamos...",
            "createdAt": "2022-12-03T11:22:35.840Z",
            "updatedAt": "2022-12-03T11:22:35.840Z",
            "__v": 0
        }
    ]"
 * }
 */
  router.route('/pub/listallpub')
  .get(async(req, res) => {
      
      try {
          if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
          {
              token = req.headers.authorization.split(" ")[1]
              const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
              const {username} = decoded
              // Verificar se o capitao
              const team = await pubInteractor.listallpub({ pubListAllPubsPersistence }, { });
            
              return res.json(team);
        }

      } catch (error) {
          return res.json({"Error": error})
      }

  });


 /**
 * @api {get} /pub/listpubsbyuser Visualizar todas as publicações de um utilizador
 * @apiName Visualizar Publicações de um Utilizador
 * @apiGroup Publicação
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "[
        {
            "_id": "638b316905ca39d8cee8c6d9",
            "username": "ricardo",
            "content": "Alguem Jogar hoje?",
            "createdAt": "2022-12-03T11:22:17.610Z",
            "updatedAt": "2022-12-03T11:22:17.610Z",
            "__v": 0
        },
        {
            "_id": "638b317b05ca39d8cee8c6db",
            "username": "ricardo",
            "content": "Ganhamos...",
            "createdAt": "2022-12-03T11:22:35.840Z",
            "updatedAt": "2022-12-03T11:22:35.840Z",
            "__v": 0
        }
    ]"
 * }
 */
    router.route('/pub/listpubsbyuser')
    .get(async(req, res) => {
        
        try {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username} = decoded
                // Verificar se o capitao
                const team = await pubInteractor.listallpubbyUser({ pubListAllPubsbyUserPersistence }, { username });
              
                return res.json(team);
          }
  
        } catch (error) {
            return res.json({"Error": error})
        }
  
    });

/**
 * @api {get} /games/listallgames Visualizar todos os Jogos
 * @apiName Visualizar Jogos
 * @apiGroup Jogos
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "{
 *           "_id": "6388d1f5d4d2382adad8b389",
 *           "username": "ricardo",
 *           "idTeam1": "Espanha",
 *           "idTeam2": "Iraque",
 *           "gameDateTime": "2023-02-22T00:00:00.000Z",
 *           "status": "Rejected",
 *           "__v": 0
 *       },
 *       {
 *           "_id": "6388d1fdd4d2382adad8b38b",
 *           "username": "ricardo",
 *           "idTeam1": "Espanha",
 *           "idTeam2": "Polonia",
 *           "gameDateTime": "2023-02-22T00:00:00.000Z",
 *           "status": "true",
 *           "__v": 0
 *       },
 * }
 */
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

/**
 * @api {post} /games/acceptgame Aceitar um Jogo
 * @apiName Aceitar um Jogo
 * @apiGroup Jogos
 *
 * @apiBody {String} idGame Id do Jogo.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Game Accepted"
 * }
  *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!d"
 * }
 */
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

/**
 * @api {post} /games/rejectgame Rejeitar um Jogo
 * @apiName Rejeitar um Jogo
 * @apiGroup Jogos
 *
 * @apiBody {String} idGame Id do Jogo.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Game Rejected"
 * }
  *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!"
 * }
 */
router.route('/games/rejectgame')
.post(async(req, res) => {
    const { idGame } = req.body;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username} = decoded
            const game = {idGame: idGame, username: username}
            const result = await gameInteractor.rejectgame({ gameRejectGamePersistence }, {game});
            return res.json(result);
        }

    } catch (error) {
        return res.json({"Error": error})
    }

});

/**
 * @api {post} /pub/createpub Criar uma Publicação
 * @apiName Criar uma Publicação
 * @apiGroup Publicação
 *
 * @apiBody {String} content Conteudo da Publicação.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Publication was been created"
 * }
*@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!"
 * }
 */
router.route('/pub/createpub')
.post(async(req, res) => {
    const { content } = req.body;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username} = decoded

            const pub = await pubInteractor.createpub({ pubCreatePubPersistence }, {username, content});
            
            return res.json(pub);
        }

    } catch (error) {
        return res.json({"Error": error})
    }

});

module.exports = router
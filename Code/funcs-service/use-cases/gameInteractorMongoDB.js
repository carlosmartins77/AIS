const { GameEntity } = require("../entities/GameEntity")

exports.schedulegame = async({ gameScheduleGamePersistence }, { username, idTeam1, idTeam2, gameDateTime, status }) => {
    try {
        const game = new GameEntity({
            username,
            idTeam1,
            idTeam2,
            gameDateTime,
            status
        })

        console.log(game)

        const schedulegame = await gameScheduleGamePersistence(game)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.listallgames = async({ gamesListAllGamesPersistence }, {username}) => {
    try {
        const listGames = await gamesListAllGamesPersistence(username)
        return listGames
    } catch (error) {
        console.log(error)
        throw error
    }
}

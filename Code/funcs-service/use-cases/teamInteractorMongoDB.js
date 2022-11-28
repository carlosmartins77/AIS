const { TeamEntity } = require("../entities/TeamEntity")

exports.createteam = async({ teamScheduleTeamPersistence }, { name, username}) => {
    try {

        let date = new Date.now()
        const membros = new Array();

        const team = new TeamEntity({
            name,
            username,
            date,
            membros
        })

        console.log(team)

        const schedulegame = await teamScheduleTeamPersistence(team)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.addmember = async({ teamAddMemberPersistente }, { username, idteam}) => {
    try {

        // Procurar equipa
        let date = new Date.now()
        const membros = new Array();
        membros.push(idteam);

        console.log(membros)

        const team = new TeamEntity({
            membros,
            idteam
        })

        console.log(team)

        const schedulegame = await teamAddMemberPersistente(team)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.removemember = async({ teamRemoveMemberPersistente }, { username, idteam}) => {
    try {

        // Procurar equipa
        let date = new Date.now()
        const membros = new Array();
        membros.push(idteam);

        console.log(membros)

        const team = new TeamEntity({
            membros,
            idteam
        })

        console.log(team)

        const schedulegame = await teamRemoveMemberPersistente(team)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


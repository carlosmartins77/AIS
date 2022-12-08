exports.createLog = async({ LogCreateLogPersistence }, { username, log_id }) => {
    try {
        const schedulegame = await LogCreateLogPersistence(username, log_id)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.getLogs = async({ LogGetLogPersistence }, {  }) => {
    try {
        const logs = await LogGetLogPersistence()
        return logs
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.getLogsUser = async({ LogGetLogsUserPersistence }, { username }) => {
    try {
        const logs = await LogGetLogsUserPersistence(username)
        return logs
    } catch (error) {
        console.log(error)
        throw error
    }
}



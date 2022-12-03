
exports.createpub = async({ pubCreatePubPersistence }, { username, content }) => {
    try {
        const pub = await pubCreatePubPersistence(username, content)
        return pub
    } catch (error) {
        console.log(error)
        throw error
    }
}



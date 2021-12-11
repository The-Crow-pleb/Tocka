const moongose = require('mongoose')
module.exports = moongose.connect(process.env.MONGODB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    keepAlive: true,
})
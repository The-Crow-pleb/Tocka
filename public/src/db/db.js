const moongose = require('mongoose')
module.exports = moongose.connect("mongodb+srv://ApplePie:Bolinho321@applepie.y5bil.mongodb.net/ApplePie?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    keepAlive: true,
})
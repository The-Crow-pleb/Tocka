const mongoose = require("mongoose")

const errors = new mongoose.Schema({
    _id: { required: true, type: String }, //guild ID,
    response: { required: true, type: Object }
})

module.exports = mongoose.model("errors", errors)
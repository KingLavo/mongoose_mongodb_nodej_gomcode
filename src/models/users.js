const mongoose = require("mongoose")

const personModel = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods:{
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("Person", personModel)

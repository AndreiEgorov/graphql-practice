//creating author model/ collection
const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const authorSchema = new Schema({
    name: String,
    age: Number,
})

// define a collection Author and base it on authorSchema shape,

module.exports = mongoose.model("Author", authorSchema)
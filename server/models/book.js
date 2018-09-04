//creating book model/ collection / how the data is organized on MongoDB
const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
})

// define a collection Book and base it on bookSchema shape,

module.exports = mongoose.model("Book", bookSchema)
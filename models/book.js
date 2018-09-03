//creating book model/ collection
const mongoose = require("mongoose"),
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
})

// define a collection Book and base it on bookSchema shape,

module.exports = mongoose.model("Book", bookSchema)
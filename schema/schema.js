const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//dummy data

var books = [
  { name: "Blue Sky", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Smoking Blaster Bosh", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "Don't fire the missile", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Solid Mystery", genre: "Thriller", id: "4", authorId: "3" },
  { name: "Bongo is Back", genre: "Action", id: "5", authorId: "2" },
  { name: "Little Boy", genre: "History", id: "6", authorId: "3" }
];

var authors = [
  { name: "Bob Dillon", age: 53, id: "1" },
  { name: "Tom Bosh", age: 76, id: "2" },
  { name: "Rob Shonshon", age: 64, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      //set relationship/connection to the authors type
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: { //display a list of books by an author
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof args.id);
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books:{
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return books
        }
    },
    authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            return authors
        }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});

const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//dummy data

var books = [
  { name: "Bob Dillon", genre: "Fantasy", id: "1" },
  { name: "Tom Bosh", genre: "Fantasy", id: "2" },
  { name: "Rob Shonshon", genre: "Sci-Fi", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
          console.log(typeof(args.id))
        return _.find(books, { id: args.id });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});
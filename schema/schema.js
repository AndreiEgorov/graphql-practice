const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book")
const Author = require("../models/author.js")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;




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
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId) //updating resolver  
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
        // return _.filter(books, { authorId: parent.id });
        return Book.find({authorId: parent.id}) //updating resolver 
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
        
        // return _.find(books, { id: args.id });
        return Book.findById(args.id) //updating resolver 
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id) //updating resolver 
      }
    },
    books:{
        type: new GraphQLList(BookType),
        resolve(parent, args){
            // return books
            return Book.find({}) //updating resolver 
        }
    },
    authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            // return authors
            return Author.find({}) //updating resolver 
        }
    }
  }
});

//query examples
// {
//     books{
//       name
//       author{
//         name
//         id
//       }
//     }
//     },

// {
//     book(id:"5b8db543ede64243c765241d"){
//       name
//       author{
//         id
//         name
//       }
//     }
//   }
    


const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name:{type: GraphQLString},
                age:{type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId:{type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            
            }
        }
    }
})

//mutation example on graphiql sandbox
// mutation{
//     addAuthor(name: "Bob Dillom", age: 42){
//       name 
//       age
//     }
//   }





module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

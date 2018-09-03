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
        // console.log(typeof args.id);
        // return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      }
    },
    books:{
        type: new GraphQLList(BookType),
        resolve(parent, args){
            // return books
        }
    },
    authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            // return authors
        }
    }
  }
});


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



// const Mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields:{
//         addAuthor:{
//             type: AuthorType,
//             args:{
//                 name: {type: GraphQLString},
//                 age:{type: GraphQLInt}
//             },
//             resolve(parent, args){
//                 //create an instance of Author collection
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 })
//                 //save the instance of the datatype to database
//                 return author.save()
//             }
//         },

//     } 
// })


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

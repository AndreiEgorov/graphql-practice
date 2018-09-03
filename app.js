const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

//connect to mlab database
mongoose.connect(
  "mongodb://usera123456:usera123456@ds141942.mlab.com:41942/graphql-practice"
);
mongoose.connection.once('open', ()=>{
    console.log('Connected to database')
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true //to use graphigl sandbox
  })
);

app.listen(4000, () => {
  console.log("Listening to port 4000");
});

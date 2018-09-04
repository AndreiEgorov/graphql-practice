import React, { Component } from "react";
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from "react-apollo" //to bind apollo to react
import BookList from "./components/BookList"
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql" //request sent to this endpoint
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <h1>I am batman</h1>
        <BookList/>
      </div>
      </ApolloProvider>
    );
  }
}
 
export default App;

import React, { Component } from "react";
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`


class BookList extends Component {
  render() {
    console.log(this.props)
    return (
       
     <div>
         <ul id="book-list">
         <li>I am a book item</li>
         </ul>
     </div>
    );
  }
}

// export default BookList;
export default graphql(getBooksQuery)(BookList) //bind the query to Book list compnent

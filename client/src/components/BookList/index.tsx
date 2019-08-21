import React, { Fragment } from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { FixedSizeList } from 'react-window';
import BookRenderer from './BookRenderer';
import BookListHeader from './BookListHeader';

export const BOOK_QUERY = gql`
  query GetBooks {
    books {
      id
      title
      author {
        name
      }
      genre
      pages
      publicationYear
    }
  }
`;

const BookList = () => (
  <Query query={BOOK_QUERY}>
    {({ loading, error, data }: QueryResult) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.message}</p>;
      return (
        <Fragment>
          <BookListHeader />
          <FixedSizeList
            height={800}
            itemCount={data.books.length}
            itemSize={35}
            width="75%"
            itemData={data.books}
          >
            {BookRenderer}
          </FixedSizeList>
        </Fragment>
      );
    }}
  </Query>
);

export default BookList;

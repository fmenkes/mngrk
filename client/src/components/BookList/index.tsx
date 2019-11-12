import React from 'react';
import { useQuery } from 'react-apollo-hooks';
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

const BookList = () => {
  const { data, loading, error } = useQuery(BOOK_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { books } = data;

  return (
    <>
      <BookListHeader />
      <FixedSizeList
        height={800}
        itemCount={books.length}
        itemSize={35}
        width="75%"
        itemData={books}
      >
        {BookRenderer}
      </FixedSizeList>
    </>
  );
};

export default BookList;

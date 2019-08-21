import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FixedSizeList } from 'react-window';

// The component AND the query need to be exported
import BookList, { BOOK_QUERY } from '../index';

jest.mock('react-window', () => {
  const reactWindow = require.requireActual('react-window');
  const mockedReactWindow = {
    ...reactWindow,
    FixedSizeList: jest.fn(() => null),
  };

  return mockedReactWindow;
});

const bookList = [
  {
    id: '1',
    title: 'The Great Gatsby',
    genre: 'Classic',
    publicationYear: 1926,
    pages: 180,
    author: { name: 'F. Scott Fitzgerald' },
  },
  {
    id: '2',
    title: 'Ubik',
    genre: 'Science Fiction',
    publicationYear: 1969,
    pages: 216,
    author: { name: 'Philip K. Dick' },
  },
];

const mocks = [
  {
    request: {
      query: BOOK_QUERY,
    },
    result: {
      data: {
        books: bookList,
      },
    },
  },
];

it('should render loading state initially', async () => {
  await act(async () => {
    const { getByText } = render(
      <MockedProvider addTypename={false}>
        <BookList />
      </MockedProvider>,
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});

it('should render a List of books', async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookList />
      </MockedProvider>,
    );
  });

  const context = expect.any(Object);

  await wait();

  expect(FixedSizeList).toHaveBeenCalledWith(
    expect.objectContaining({
      itemData: bookList,
    }),
    context,
  );
});

it('should show an error', async () => {
  const errorMock = {
    request: {
      query: BOOK_QUERY,
    },
    error: new Error('test error'),
  };

  await act(async () => {
    const { findByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <BookList />
      </MockedProvider>,
    );

    await wait();

    expect(await findByText(/test error/)).toBeDefined();
  });
});

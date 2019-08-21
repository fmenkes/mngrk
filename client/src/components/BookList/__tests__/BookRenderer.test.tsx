import React, { CSSProperties } from 'react';
import { render } from '@testing-library/react';
import BookRenderer, { Book } from '../BookRenderer';

describe('BookRenderer', () => {
  it('when called with props it renders those props', async () => {
    const style: CSSProperties = {};
    const index = 0;
    const data: [Book] = [
      {
        title: 'The Great Gatsby',
        genre: 'Classic',
        publicationYear: 1926,
        pages: 180,
        author: { name: 'F. Scott Fitzgerald' },
      },
    ];

    const { findByText } = render(
      <BookRenderer style={style} index={index} data={data} />,
    );

    expect(await findByText(/^1$/)).toBeDefined();
    expect(await findByText(/The Great Gatsby/)).toBeDefined();
    expect(await findByText(/Classic/)).toBeDefined();
    expect(await findByText(/1926/)).toBeDefined();
    expect(await findByText(/180/)).toBeDefined();
    expect(await findByText(/F\. Scott Fitzgerald/)).toBeDefined();
  });
});

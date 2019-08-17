import React, { PureComponent, CSSProperties } from 'react';
import './styles.css';

interface Author {
  name: string;
}

interface Book {
  title: string;
  author: Author;
  genre?: string;
  pages?: number;
  publicationYear?: number;
}

interface BookRendererProps {
  style: CSSProperties;
  index: number;
  data: [Book];
}

class BookRenderer extends PureComponent<BookRendererProps> {
  public render() {
    const { style, index, data } = this.props;
    const book = data[index];
    return (
      <div style={style} className="bookListItem">
        <div>
          <span>{index + 1}</span>
        </div>
        <div>
          <span>{book.title}</span>
        </div>
        <div>
          <span>{book.author.name}</span>
        </div>
        <div>
          <span>{book.genre}</span>
        </div>
        <div>
          <span>{book.pages}</span>
        </div>
        <div>
          <span>{book.publicationYear}</span>
        </div>
      </div>
    );
  }
}

export default BookRenderer;

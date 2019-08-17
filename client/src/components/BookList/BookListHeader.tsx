import React from 'react';
import './styles.css';

const BookListHeader = () => (
  <div className="bookListItem bookListHeader">
    <div>
      <strong>#</strong>
    </div>
    <div>
      <strong>Title</strong>
    </div>
    <div>
      <strong>Author</strong>
    </div>
    <div>
      <strong>Genre</strong>
    </div>
    <div>
      <strong>Pages</strong>
    </div>
    <div>
      <strong>Publication Year</strong>
    </div>
  </div>
);

export default BookListHeader;

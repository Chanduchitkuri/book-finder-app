import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p className="text-center text-xl mt-8">No results found. Try a different search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

export default BookList;
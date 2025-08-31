import React from 'react';

const BookCard = ({ book }) => {
  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 transform transition-transform hover:scale-105">
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-500 text-center p-2">No Cover Available</span>
        </div>
      )}
      <div className="text-center flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600">by {book.author_name?.join(', ') || 'Unknown Author'}</p>
        <p className="text-xs text-gray-500 mt-1">First Published: {book.first_publish_year || 'N/A'}</p>
      </div>
    </div>
  );
};

export default BookCard;
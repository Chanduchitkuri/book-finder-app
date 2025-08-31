import { useState, useEffect } from 'react';
import BookList from './components/BookList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [query, searchType]); // Dependency array to re-fetch on query or type change

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    setShowResults(false);
    try {
      const url = `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data.docs.filter(book => book.cover_i)); // Filter out books without a cover
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
      setShowResults(true);
    }
  };

  const handleSearch = (newQuery, newSearchType) => {
    setQuery(newQuery);
    setSearchType(newSearchType);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto flex-grow py-8 px-4">
        <SearchBar onSearch={handleSearch} />
        {loading && <p className="text-center text-lg mt-8">Loading books...</p>}
        {error && <p className="text-center text-lg mt-8 text-red-500">{error}</p>}
        {showResults && !loading && !error && <BookList books={books} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
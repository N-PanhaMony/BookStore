import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import BookCard from "./components/BookCard.jsx";

const API_BASE_URL = "https://openlibrary.org";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async (query = "") => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    // request edition_count and only needed fields for smaller payload
    const fields = [
      "key",
      "title",
      "author_name",
      "first_publish_year",
      "cover_i",
      "edition_count",
    ].join(",");

    const endpoint = query
      ? `${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}&fields=${fields}&limit=50`
      : `${API_BASE_URL}/search.json?q=the&fields=${fields}&limit=50`;

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      setErrorMessage("No books found");
      setBookList([]);
      return;
    }

    // sort by edition_count (descending). If edition_count missing, treat as 0.
    const sorted = data.docs
      .map((d) => ({ ...d, edition_count: d.edition_count || 0 })) // normalize
      .sort((a, b) => b.edition_count - a.edition_count);

    setBookList(sorted.slice(0, 20));
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    setErrorMessage("Try again later...");
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="/book poster.jpg" alt="" />
            <h1>
              Find Your <span className="text-gradient">Favorite Books</span> Here
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="book-catalog">
            <h1 className="mt-[20px]">All Books</h1>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {bookList.map((book) => (
                  <BookCard key={book.key || book.title} book={book} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;

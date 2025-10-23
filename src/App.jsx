import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import BookCard from "./components/BookCard.jsx";
import useDebounce from "./hooks/useDebounce.js";


const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 300);


  const fetchBooks = async (query = "") => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    // Google Books: q=search term, maxResults up to 40
    const q = query ? query : "the";
    const endpoint = `${API_BASE_URL}?q=${encodeURIComponent(q)}&maxResults=20`;

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      setErrorMessage("No books found");
      setBookList([]);
      return;
    }

    // Map Google Books structure to the shape your app expects:
    const formatted = data.items.map((item) => {
      const v = item.volumeInfo || {};
      return {
        key: item.id,
        title: v.title || "Untitled",
        author_name: v.authors ? v.authors.join(", ") : ["Unknown Author"],
        first_publish_year: v.publishedDate ? v.publishedDate.split("-")[0] : null,
        // For compatibility with your BookCard component, put the image URL in cover_i
        cover_i: v.imageLinks ? v.imageLinks.thumbnail || v.imageLinks.smallThumbnail : null,
        // you can keep edition_count if your UI relied on it; Google doesn't provide it, so set 0
        edition_count: 0,
      };
    });

    setBookList(formatted);
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    setErrorMessage("Try again later...");
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchBooks(debouncedSearch);
}, [debouncedSearch]);

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

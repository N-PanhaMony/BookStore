import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = "https://openlibrary.org";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/search.json?author=tolkien&sort=new`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed");

      const data = await response.json();
      console.log(data);

      if (!data.docs || data.docs.length === 0) {
        setErrorMessage("No books found");
        setBookList([]);
        return;
      }

      setBookList(data.docs);
    } catch (error) {
      console.error(`Error fetching books ${error}`);
      setErrorMessage("Try again later...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="/book poster.jpg" alt="" />
            <h1>
              Find Your <span className="text-gradient">Favorites Books</span> Here
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="book-catalog">
            <h1>All Books</h1>

            {isLoading ? (
              <p className="text-black">Loading...</p>
            ) : errorMessage ? (
              <p className="text-black">{errorMessage}</p>
            ) : (
              <ul>
                {bookList.map((book) => (
                  <li key={book.key} className="text-black">
                    {book.title}
                  </li>
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

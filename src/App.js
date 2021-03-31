import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d6544dc8292ffc40b17b6b73e768df92&page=1";

const Search_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=d6544dc8292ffc40b17b6b73e768df92&query=";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch(FEATURED_API)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(Search_API + searchTerm)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm("");
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handleSubmit} action="">
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <Movie key={movie.id} {...movie} />;
          })}
      </div>
    </>
  );
};

export default App;

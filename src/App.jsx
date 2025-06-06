import { use, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);

  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };
  useEffect(() => {
    // Fetch trending movies when the component mounts
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error(err));
  }, []); // Empty dependency array to run only once

  //create an onClick function to log the movie title when a poster is clicked
  //create an onClick function to display movie details in a modal when a poster is clicked

  return (
    <>
      <div>
        <h1 className="title">Trending Movies</h1>
        <div className="movie-list">
          {movieList.map((movie) => (
            <img
              key={movie.id}
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

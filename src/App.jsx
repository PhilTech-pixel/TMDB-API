import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [imdbRatings, setImdbRatings] = useState({}); // Store ratings per movie

  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error(err));
  }, []);

  const handleMovieClick = (movie) => {
    // Fetch IMDb ID for the clicked movie
    const imdbUrl = `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?language=en-US`;
    fetch(imdbUrl, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.imdb_id) {
          // Fetch IMDb rating
          fetch(
            `https://www.omdbapi.com/?i=${data.imdb_id}&apikey=${
              import.meta.env.VITE_OMDB_API_KEY
            }`
          )
            .then((res) => res.json())
            .then((ratingData) => {
              setImdbRatings((prev) => ({
                ...prev,
                [movie.id]: ratingData.imdbRating,
              }));
              console.log(
                `IMDb Rating for ${movie.title}: ${ratingData.imdbRating}`
              );
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <h1 className="title">Trending Movies</h1>
        <div className="movie-list">
          {movieList.map((movie) => (
            <div key={movie.id}>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onClick={() => handleMovieClick(movie)}
                loading="lazy"
              />
              {imdbRatings[movie.id] && (
                <div>IMDb Rating: {imdbRatings[movie.id]}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

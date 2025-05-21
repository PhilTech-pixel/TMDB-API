import { useState } from "react";
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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGFhM2JiODMyMjgwOTgwMGRjN2ZlMWQ1ZTRlNGVhNiIsIm5iZiI6MTczMjAwNjAxMC4zNzEsInN1YiI6IjY3M2M1MDdhNjBiN2IzYmM5NGEwYjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lyhSivXIHyRGIobTzKQP1q3CAMggYcITiCf_FJdXvdU",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setMovieList(response.results);
    })
    .catch((err) => console.error(err));

  return (
    <>
      <div>
        <h1>Trending Movies</h1>
        <ul>
          {movieList.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

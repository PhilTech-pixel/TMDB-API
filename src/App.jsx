import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handlePosterClick = (movieId) => {
    setSelectedMovieId(movieId);
    setIsDetailsOpen(true);
  };

  return (
    <div className="app-container">
      <MovieList onPosterClick={handlePosterClick} />
      <MovieDetails
        movieId={selectedMovieId}
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
      />
    </div>
  );
}

export default App;

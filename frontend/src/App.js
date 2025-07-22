import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const res = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
    setMovies(res.data);
  };

  return (
    <div>
      <h1>Movie Finder</h1>
      <input onChange={e => setQuery(e.target.value)} placeholder="Search movie..." />
      <button onClick={searchMovies}>Search</button>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title} ({movie.release_date})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

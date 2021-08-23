import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function addMovieHandler () {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://swapi.dev/api/films')
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
     
      const data = await response.json();
     
        const transformedData = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
  
          }
        })
        setMovies(transformedData);
        setLoading(false)
      
    } catch (error) {
      setError(error.message)
    }
  }
    return (
      <React.Fragment>
        <section>
          <button onClick={addMovieHandler}>Fetch Movies</button>
        </section>
        <section>
          {!loading && movies.length > 0 && <MoviesList movies={movies} />}
          {!loading && movies.length == 0 && <p>No movies found</p>}
          {!loading && error && <p>{error}</p>}
          {loading && <p>Loading</p>}
        </section>
      </React.Fragment>
    );
  
  }


export default App;

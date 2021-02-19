import { useEffect, useState } from 'react';
import { MovieResponse } from 'moviedb-promise/dist/request-types';

function MovieList() {
  const [movies, setMovie] = useState<Array<MovieResponse> | null>(null);
  useEffect(() => {
    const data = async (): Promise<void> => {
      const res = await fetch('http://localhost:3000/movies/').then((data) => data.json());
      setMovie(res.results as Array<MovieResponse>);
    };
    void data();
  }, []);
  if (movies === null) return null;
  console.log(movies);
  return (
    <div>
      {movies.map((movie) => (
        <div className="group border-indigo-500 hover:bg-white hover:shadow-lg hover:border-transparent ...">
          <p className="text-indigo-600 group-hover:text-gray-900 ...">{JSON.stringify(movie.title)}</p>
          <p className="text-indigo-500 group-hover:text-gray-500 ...">{JSON.stringify(movie.genres)}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;

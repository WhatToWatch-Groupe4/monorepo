import { FunctionComponent, useEffect, useState } from 'react';
import { MovieResponse } from 'moviedb-promise/dist/request-types';
import { Link } from 'react-router-dom';
import { Configuration } from '../configuration';
import { useKeycloak } from '@react-keycloak/web';

const WishList: FunctionComponent = () => {
  const [movies, setMovie] = useState<Array<MovieResponse> | null>([]);
  const { initialized, keycloak } = useKeycloak();
  useEffect(() => {
    const data = async (): Promise<void> => {
      const wishList = await fetch(
        `${Configuration.apiBaseURL}/wishlist/?user=${keycloak.tokenParsed?.sub}`
      ).then((data) => data.json());
      const res = [];
      console.log(wishList);
      for (const wishListElement of wishList) {
        const movieById = await fetch(`${Configuration.apiBaseURL}/movies/${wishListElement.movie}`).then((data) =>
          data.json()
        );
        res.push(movieById);
      }
      setMovie(res as Array<MovieResponse>);
    };
    if (initialized) {
      void data();
    }
  }, [initialized]);

  if (movies === null) return null;

  return (
    <div className="container mx-auto ">
      <h1 className="text-4xl text-white uppercase font-bold mb-4 pt-3">
        TOUS LES FILMS / SÉRIES QUE J'AI ENVIE DE VOIR
      </h1>
      <div id="movie-list" className="grid md:grid-flow-col grid-cols-6 grid-rows-3 gap-0">
        {movies.map((movie) => (
          <Link key={movie.id} to={'/movies/' + movie.id}>
            <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="bg-gray-300 h-64 rounded-lg shadow-md bg-cover bg-center"
              />
              <div className="py-2 text-center text-white font-bold uppercase tracking-wide">{movie.title}</div>
              <div className="flex items-center text-white justify-between py-2 px-3 ">
                <p className="text-white">
                  {JSON.stringify(movie.vote_average)}/10 ⭐{/*{movie.genres?.map((genre) => (*/}
                  {/*  <p>{genre}</p>*/}
                  {/*))}*/}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WishList;

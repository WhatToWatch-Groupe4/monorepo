import { FunctionComponent, useEffect, useState } from 'react';
import { MovieResponse } from 'moviedb-promise/dist/request-types';
import { useParams } from 'react-router-dom';
import ButtonView from './ButtonView';
import Comments from './Comments';
import WishButton from './WishButton';
import FormComment from './FormComment';
import { useKeycloak } from '@react-keycloak/web';

interface Comment {
  id: number;
  message: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

const MovieShow: FunctionComponent = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const [movie, setMovie] = useState<MovieResponse | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const { keycloak, initialized } = useKeycloak();

  const handleComments = async (): Promise<void> => {
    const res = await fetch(`http://localhost:3000/comments?movie_id=${id}`).then((data) => data.json());
    setComments(res as Comment[]);
  };

  useEffect(() => {
    void handleComments();
    const fetchData = async (): Promise<void> => {
      const res = await fetch(`http://localhost:3000/movies/${id}`).then((data) => data.json());
      setMovie(res as MovieResponse);
    };
    void fetchData();
  }, []);

  if (id === undefined || movie === null) return null;

  return (
    <div className="text-white w-1/3">
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
      <h1 className="font-medium text-2xl">{movie.title}</h1>
      <div className="text-gray-400 mt-10">
        <div>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Inconnu'} |{' '}
          {movie.runtime ? `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}` : 'Inconnu'}
        </div>
        <div>{movie.genres?.map((g) => g.name).join(', ')}</div>
      </div>

      <h2 className="font-medium text-2xl mt-10 mb-8">Synopsis</h2>
      <p className="text-gray-400">{movie.overview}</p>
      <ButtonView movie={+id} />
      <Comments commentsList={comments} />
      {initialized && keycloak.authenticated && <FormComment movieId={+id} refreshComments={handleComments} />}
      <WishButton movieId={+id} />
    </div>
  );
};

export default MovieShow;

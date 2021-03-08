import { FunctionComponent, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Comment {
  id: number;
  message: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  movieId: number;
}

const Comments: FunctionComponent<Props> = ({ movieId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await fetch(`http://localhost:3000/comments?movie_id=${movieId}`).then((data) => data.json());
      setComments(res as Comment[]);
    };
    void fetchData();
  }, []);

  return (
    <div className="text-white">
      <h2 className="font-medium text-2xl mt-10 mb-8">Comments ({comments.length})</h2>
      {comments.map((c) => (
        <div className="flex text-left">
          <img
            className="rounded-full"
            src="https://via.placeholder.com/75"
            alt=""
            style={{ height: '75px', width: '75px' }}
            height="75px"
            width="75px"
          />
          <div className="ml-4">
            <div className="font-medium mb-4 text-gray-400">
              {c.username} - Publiée le {format(Date.parse(c.createdAt), 'd MMMM yyyy', { locale: fr })}
            </div>
            <p>{c.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;

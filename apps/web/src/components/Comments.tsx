import { FunctionComponent } from 'react';
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
  commentsList: Array<Comment>;
}

const Comments: FunctionComponent<Props> = ({ commentsList }: Props) => {
  return (
    <div className="text-white">
      <h2 className="font-medium text-2xl mt-10 mb-8">Comments ({commentsList.length})</h2>
      {commentsList.map((c) => (
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

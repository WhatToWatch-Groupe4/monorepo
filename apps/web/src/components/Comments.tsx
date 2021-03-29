import { FunctionComponent } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakTokenParsed } from 'keycloak-js';
import deleteWhite from '../assets/icons/delete-primary.png';
import { Configuration } from '../configuration';

interface Comment {
  id: number;
  message: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  commentsList: Array<Comment>;
  refreshComments: () => void;
}

interface TokenParsed extends KeycloakTokenParsed {
  groups: Array<string>;
}

const Comments: FunctionComponent<Props> = ({ commentsList, refreshComments }: Props) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  const token = keycloak.tokenParsed as TokenParsed;
  const isAdmin = keycloak.authenticated ? token.groups.includes('admin') : false;

  const deleteComment = async (id: number): Promise<void> => {
    if (keycloak.authenticated && isAdmin) {
      await fetch(`${Configuration.apiBaseURL}/comments/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
      })
        .then((data) => data.json())
        .then(() => {
          refreshComments();
        })
        .catch(() => console.error('Error: delete Comment'));
    }
  };

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
          {isAdmin && (
            <img
              src={deleteWhite}
              className="h-8 ml-8 cursor-pointer hover:opacity-50"
              onClick={() => deleteComment(c.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;

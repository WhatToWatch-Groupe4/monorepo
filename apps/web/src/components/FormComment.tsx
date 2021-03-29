import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Configuration } from '../configuration';

interface Props {
  movieId: number;
  refreshComments: () => void;
}

const FormComment: FunctionComponent<Props> = ({ movieId, refreshComments }: Props) => {
  const { keycloak } = useKeycloak();
  const [message, setMessage] = useState<string>();

  const createComment = async (): Promise<void> => {
    if (keycloak.authenticated) {
      const body = {
        message: message,
        movieId: movieId,
      };
      await fetch(`${Configuration.apiBaseURL}/comments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
        body: JSON.stringify(body),
      })
        .then((data) => data.json())
        .then(() => {
          setMessage('');
          refreshComments();
        })
        .catch(() => console.error('Error: add view'));
    }
  };

  function handleMessage(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessage(event.target.value);
  }

  return (
    <div id="comment-form">
      <div>
        <label htmlFor="message" className="block mb-2 text-md text-gray-400">
          Your Comment
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Your Comment"
          className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none text-black"
          required
          onChange={handleMessage}
          value={message}
        />
      </div>

      <button onClick={createComment} className="w-full px-3 py-4 text-white bg-primary rounded-md focus:outline-none">
        Send Comment
      </button>
    </div>
  );
};

export default FormComment;

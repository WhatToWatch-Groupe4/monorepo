import React, { FunctionComponent, useEffect, useState } from 'react';
import binoculars from '../assets/icons/binoculars.png';
import binocularsPrimary from '../assets/icons/binoculars-primary.png';
import { useKeycloak } from '@react-keycloak/web';

interface Props {
  movie: number;
}

const ButtonView: FunctionComponent<Props> = ({ movie }: Props) => {
  const [view, setView] = useState<number | null>(null);
  const { keycloak } = useKeycloak();

  function toggleView(): void {
    if (!view) {
      void addView();
    } else {
      void removeView();
    }
  }

  const getView = async (): Promise<void> => {
    await fetch(`http://localhost:3000/views/${movie}?user_uuid=${keycloak.tokenParsed?.sub}`)
      .then((data) => data.json())
      .then((res) => setView(res.id))
      .catch(() => setView(null));
  };

  const addView = async (): Promise<void> => {
    if (keycloak.authenticated) {
      const body = {
        movie: movie,
        user_uuid: keycloak.tokenParsed?.sub,
      };
      await fetch(`http://localhost:3000/views`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(body),
      })
        .then((data) => data.json())
        .then((res) => setView(res.id))
        .catch(() => console.error('Error: add view'));
    }
  };

  const removeView = async (): Promise<void> => {
    if (keycloak.authenticated) {
      await fetch(`http://localhost:3000/views/${view}`, {
        method: 'DELETE',
      })
        .then((data) => data.json())
        .then(() => setView(null))
        .catch(() => console.error('Error: Remove view'));
    }
  };

  useEffect(() => {
    if (keycloak.authenticated) {
      void getView();
    }
  }, [keycloak.authenticated]);

  if (!view) {
    return (
      <button
        className="btn-movie-not-view border-primary border-4 cursor-pointer rounded-xl hover:shadow-xl hover:opacity-90 focus:outline-none disabled:opacity-50"
        onClick={toggleView}
        disabled={!keycloak.authenticated}
      >
        <img src={binocularsPrimary} alt="logo" className="px-24 py-4 inline w-11/12" />
      </button>
    );
  }

  return (
    <button
      className="btn-movie-view bg-primary border-4 border-primary cursor-pointer rounded-xl hover:shadow-xl hover:opacity-90 focus:outline-none"
      onClick={toggleView}
    >
      <img src={binoculars} alt="logo" className="px-24 py-4 inline w-11/12" />
    </button>
  );
};

export default ButtonView;

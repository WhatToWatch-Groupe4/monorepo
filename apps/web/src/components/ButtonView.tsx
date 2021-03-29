import React, { FunctionComponent, useEffect, useState } from 'react';
import binoculars from '../assets/icons/binoculars.png';
import binocularsPrimary from '../assets/icons/binoculars-primary.png';
import { useKeycloak } from '@react-keycloak/web';
import { Configuration } from '../configuration';

interface Props {
  movie: number;
}

const ButtonView: FunctionComponent<Props> = ({ movie }: Props) => {
  const [view, setView] = useState<boolean>(false);
  const { keycloak, initialized } = useKeycloak();

  function toggleView(): void {
    if (!view) {
      void addView();
    } else {
      void removeView();
    }
  }

  const getView = async (): Promise<void> => {
    await fetch(`${Configuration.apiBaseURL}/views/${movie}`, {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          setView(true);
        }
      })
      .catch(() => setView(false));
  };

  const addView = async (): Promise<void> => {
    if (keycloak.authenticated) {
      const body = {
        movie: movie,
      };
      await fetch(`${Configuration.apiBaseURL}/views`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setView(true);
          }
        })
        .catch((e) => {
          console.error('Error: add view');
          throw e;
        });
    }
  };

  const removeView = async (): Promise<void> => {
    if (keycloak.authenticated) {
      await fetch(`${Configuration.apiBaseURL}/views/${movie}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
      })
        .then((res) => {
          if (res.status === 204 || res.status === 200) {
            setView(false);
          }
        })
        .catch((e) => {
          console.error('Error: Remove view');
          throw e;
        });
    }
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      void getView();
    }
  }, [initialized]);

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

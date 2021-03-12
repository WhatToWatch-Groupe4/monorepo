import { useKeycloak } from '@react-keycloak/web';
import { FunctionComponent, useEffect, useState } from 'react';
import { Configuration } from '../configuration';

interface Wish {
  userId: string;
  movieId: number;
}

interface Props {
  movieId: number;
}

const WishButton: FunctionComponent<Props> = ({ movieId }: Props) => {
  const [wish, setWish] = useState<Wish | null>(null);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      void checkWishList();
    }
  }, [keycloak.authenticated]);

  const switchWish = async (): Promise<void> => {
    if (!wish) {
      await addToWishList();
    } else {
      await removeToWishList();
    }
  };

  /* jscpd:ignore-start */
  const checkWishList = async (): Promise<void> => {
    await fetch(`${Configuration.apiBaseURL}/wishlist/${keycloak.tokenParsed?.sub}/${movieId}`)
      .then((data) => data.json())
      .then((res) => {
        setWish(res.userUuid);
      })
      .catch((e) => {
        setWish(null);
        throw e;
      });
  };

  const addToWishList = async (): Promise<void> => {
    await fetch(`${Configuration.apiBaseURL}/wishlist`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId: keycloak.tokenParsed?.sub, movieId: movieId }),
    })
      .then((data) => data.json())
      .then((res) => {
        setWish(res.userUuid);
      })
      .catch((e) => {
        setWish(null);
        throw e;
      });
  };
  /* jscpd:ignore-end */

  const removeToWishList = async (): Promise<void> => {
    await fetch(`${Configuration.apiBaseURL}/wishlist/${keycloak.tokenParsed?.sub}/${movieId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    setWish(null);
  };

  if (!wish) {
    return (
      <div>
        <button onClick={(): Promise<void> => switchWish()}>☆</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={(): Promise<void> => switchWish()}>★</button>
    </div>
  );
};
export default WishButton;

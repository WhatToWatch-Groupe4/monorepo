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
    await fetch(`${Configuration.apiBaseURL}/wishlist/${movieId}`, {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
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

  const addToWishList = async (): Promise<void> => {
    await fetch(`${Configuration.apiBaseURL}/wishlist`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
      body: JSON.stringify({ movieId: movieId }),
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
    await fetch(`${Configuration.apiBaseURL}/wishlist/${movieId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${keycloak.token}` },
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

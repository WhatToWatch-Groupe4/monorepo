import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

interface Wish {
  userId: string;
  movieId: number;
}

interface Props {
  movieId: number;
}

function WishButton({ movieId }: Props) {
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

  const checkWishList = async () => {
    await fetch(`http://localhost:3000/wishlist/${keycloak.tokenParsed?.sub}/${movieId}`)
      .then((data) => data.json())
      .then((res) => {
        setWish(res.userUuid);
      })
      .catch((e) => {
        setWish(null);
        throw e;
      });
  };

  const addToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist`, {
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

  const removeToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist/${keycloak.tokenParsed?.sub}/${movieId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    setWish(null);
  };

  if (!wish) {
    return (
      <div>
        <button onClick={() => switchWish()}>☆</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => switchWish()}>★</button>
    </div>
  );
}
export default WishButton;

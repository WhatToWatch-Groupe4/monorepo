import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

interface Wish {
  userId: string;
  movieId: number;
}

interface Props {
  movieId: number | undefined;
}

function WishButton({ movieId }: Props) {
  const [wish, setWish] = useState<Wish | null>(null);
  const { keycloak } = useKeycloak();

  function switchWish(): void {
    if (!wish) {
      void addToWishList();
    } else {
      void removeToWishList();
    }
  }
  const checkWishList = async () => {
    await fetch(`http://localhost:3000/wishlist/${keycloak.tokenParsed?.sub}/${movieId}`)
      .then((data) => data.json())
      .then((res) => {
        setWish(res.idMovie);
      })
      .catch(() => setWish(null));
  };

  const addToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ userId: keycloak.tokenParsed?.sub, movieId: movieId }),
    })
      .then((data) => data.json())
      .then((res) => {
        setWish(res.idMovie);
      });
  };

  const removeToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist`, {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ userId: keycloak.tokenParsed?.sub, movieId: movieId }),
    });
    setWish(null);
  };

  useEffect(() => {
    if (keycloak.authenticated) {
      void checkWishList();
    }
  });

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

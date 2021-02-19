import { useEffect, useState } from 'react';

interface Wish {
  userId: string;
  movieId: number;
}

function WishButton() {
  const [wish, setWish] = useState<Wish | null>(null);
  const id = 664767;
  const user_id = '22C32';

  function switchWish(): void {
    if (!wish) {
      void addToWishList();
    } else {
      void removeToWishList();
    }
  }
  const checkWishList = async () => {
    await fetch(`http://localhost:3000/wishlist/${user_id}/${id}`)
      .then((data) => data.json())
      .then((res) => {
        setWish(res.idMovie);
        console.log(wish);
      })
      .catch(() => setWish(null));
  };

  const addToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ userId: user_id, movieId: id }),
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
      body: JSON.stringify({ userId: user_id, movieId: id }),
    });
    setWish(null);
  };

  useEffect(() => {
    void checkWishList();
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

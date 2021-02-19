import { useEffect, useState } from 'react';

interface Wish {
  userId: string;
  movieId: number;
}

function WishButton() {
  const [wish, setWish] = useState<Wish | null>(null);
  const id = 664767;
  const user_id = '22C32';

  const addToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ userId: user_id, movieId: id }),
    });
  };

  const removeToWishList = async () => {
    await fetch(`http://localhost:3000/wishlist`, {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ userId: user_id, movieId: id }),
    });
  };

  return (
    <div>
      <button onClick={() => addToWishList()}>Ajouter</button>
      <button onClick={() => removeToWishList()}>Supprimer</button>
    </div>
  );
}
export default WishButton;

import { useEffect } from "react";

function WishList(){
    const id = 664767;

    const user_id = "22C32";

    useEffect(() => {
        const res = fetch(`http://localhost:3000/wishlist`, {method: 'POST'})
    },[]);
}
export default WishList();

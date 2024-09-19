import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function ProductShelf({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cookies, setCookie] = useCookies(["myCart"]);

  useEffect(() => {
    const storedCart = cookies.myCart || [];
    const cartItem = storedCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cookies.myCart, item.name]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const updateCookies = (newQuantity) => {
    let myCart = cookies.myCart || [];

    if (newQuantity === 0) {
      myCart = myCart.filter((cartItem) => cartItem.name !== item.name);
    } else {
      const existingItem = myCart.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        existingItem.quantity = newQuantity;
      } else {
        myCart.push({ ...item, quantity: newQuantity });
      }
    }

    setCookie("myCart", myCart, { path: "/" });
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCookies(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCookies(newQuantity);
    } else {
      setQuantity(0);
      updateCookies(0);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    updateCookies(newQuantity);
  };

  const addToCart = () => {
    updateCookies(quantity);
  };

  return (
    <li key={item.name} className="col-span-1">
      <img src={item.image.mobile} alt={item.name} className="hidden w-full" />
      <img src={item.image.desktop} alt={item.name} className="block w-full" />
      <div
        onClick={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <button onClick={addToCart}>Add to Cart</button>
        {isHovered && (
          <div className="absolute bg-white w-full top-0">
            <button onClick={decreaseQuantity}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: "40px", textAlign: "center" }}
            />
            <button onClick={increaseQuantity}>+</button>
          </div>
        )}
      </div>
      <p>${item.price.toFixed(2)}</p>
      <p>{item.category}</p>
      <p>{item.name}</p>
      <hr />
    </li>
  );
}

export default ProductShelf;

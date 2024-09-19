import { useState, useEffect } from "react";

function ProductShelf({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    const cartItem = storedCart.find((cartItem) => cartItem.name === item.name);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [item.name]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const updateLocalStorage = (newQuantity) => {
    let myCart = JSON.parse(localStorage.getItem("myCart")) || [];

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
    localStorage.setItem("myCart", JSON.stringify(myCart));
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateLocalStorage(newQuantity);
    } else {
      setQuantity(0);
      updateLocalStorage(0);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
  };

  const addToCart = () => {
    updateLocalStorage(quantity);
  };

  return (
    <li key={item.name}>
      {/* <img src={item.image.mobile} alt={item.name} />
      <img src={item.image.desktop} alt={item.name} /> */}
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

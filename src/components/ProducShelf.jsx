import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function ProductShelf({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(0);
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
    <li key={item.name} className="col-span-1 mb-5">
      <img
        src={item.image.mobile}
        alt={item.name}
        className={`block md:hidden w-full rounded-md border-2 ${
          isHovered ? "border-[#C83B0E]" : "border-transparent"
        }`}
      />
      <img
        src={item.image.desktop}
        alt={item.name}
        className={`hidden md:block w-full rounded-md border-2 ${
          isHovered ? "border-[#C83B0E]" : "border-transparent"
        }`}
      />
      <div
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex justify-center mt-[-20px] mb-4"
      >
        <button
          onClick={addToCart}
          className="border-2 border-black rounded-3xl flex items-center font-bold justify-center gap-3 py-2 w-full bg-white max-w-[170px]"
        >
          <img src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          Add to Cart
        </button>
        {isHovered && (
          <div className="absolute bg-[#C83B0E] border-2 border-[#C83B0E] max-w-[170px] h-[44px] rounded-3xl w-full top-0 flex justify-between items-center px-3">
            <button
              onClick={decreaseQuantity}
              className="border-2 border-white rounded-2xl w-[20px] h-[20px] flex justify-center items-center"
            >
              <img
                src="/assets/images/icon-decrement-quantity.svg"
                alt="Decrement Quantity"
              />
            </button>
            <span className="text-white">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="border-2 border-white rounded-2xl w-[20px] h-[20px] flex justify-center items-center"
            >
              <img
                src="/assets/images/icon-increment-quantity.svg"
                alt="Increment Quantity"
              />
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
      <p className="font-bold  mb-2">{item.name}</p>
      <p className="font-bold text-[#C83B0E]  mb-2">${item.price.toFixed(2)}</p>
    </li>
  );
}

export default ProductShelf;

import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

function MiniCart() {
  const [cookies, setCookie] = useCookies(["myCart"]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateCartItems = () => {
      try {
        const items = cookies.myCart ? cookies.myCart : [];
        setCartItems(items);
      } catch (e) {
        console.error("Error parsing cart items", e);
        setCartItems([]);
      }
    };

    updateCartItems();
  }, [cookies.myCart]);

  const handleDelete = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCookie("myCart", JSON.stringify(updatedCart), { path: "/" });
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCookie("myCart", JSON.stringify([]), { path: "/" });
    setIsModalOpen(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };
  
  return (
    <>
      <h2>Your Cart ({cartItems.length})</h2>
      <div>
        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="relative">
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => handleDelete(item.name)}
                  >
                    Delete
                  </button>
                  <p>{item.name}</p>
                  <p>
                    {item.quantity}x - {item.price.toFixed(2)} -{" "}
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                  <hr />
                </li>
              ))}
            </ul>
            <p>This is a carbon-neutral delivery</p>
            <button onClick={handleConfirmOrder}>Confirm Order</button>
          </>
        ) : (
          <p>Your added items will appear here</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
            {cartItems.length > 0 ? (
              <>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="relative">
                      <img src={item.image.thumbnail} alt={item.name} />
                      <p className="absolute right-2">
                        {(item.quantity * item.price).toFixed(2)}
                      </p>
                      <p>{item.name}</p>
                      <p>
                        {item.quantity}x - {item.price.toFixed(2)}
                      </p>
                      <hr />
                    </li>
                  ))}
                  <li>
                    <p>Order Total</p>
                    <p>{calculateTotal()}</p>
                  </li>
                </ul>
                <button onClick={handleCloseModal}>Start New Order</button>
              </>
            ) : (
              <p>no items added to cart</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MiniCart;

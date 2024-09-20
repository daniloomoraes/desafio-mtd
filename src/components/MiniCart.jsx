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
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <h2 className="text-2xl text-[#C83B0E] font-bold mb-3">
        Your Cart ({cartItems.length})
      </h2>
      <div>
        {cartItems.length > 0 ? (
          <>
            <ul className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="relative border-b-slate-100 border-b-2 pb-3"
                >
                  <button
                    className="absolute top-2 right-2 border-2 border-slate-400 rounded-2xl w-[20px] h-[20px] flex justify-center items-center"
                    onClick={() => handleDelete(item.name)}
                  >
                    <img
                      src="/assets/images/icon-remove-item.svg"
                      alt="remove item"
                    />
                  </button>
                  <p className="font-bold">{item.name}</p>
                  <p>
                    <span className="text-[#C83B0E] font-bold">
                      {item.quantity}x {"  "}
                    </span>
                    <span className="text-slate-500">
                      {"  "}@ {item.price.toFixed(2)} {"  "}
                    </span>
                    <span className="text-slate-500 font-bold">
                      {(item.quantity * item.price).toFixed(2)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="flex justify-between items-center py-6">
              <p>Order Total</p>
              <p className="text-2xl text-black font-bold">
                ${calculateTotal()}
              </p>
            </p>
            <p className="w-full bg-[#FCF8F5] rounded-md flex items-center justify-center py-2 mb-5">
              <img
                src="/assets/images/icon-carbon-neutral.svg"
                alt="carbon neutral"
              />
              This is a <span className="font-bold">carbon-neutral</span> delivery
            </p>
            <button
              className="border-2 border-[#C83B0E] rounded-3xl flex items-center font-bold justify-center gap-3 py-2 w-full text-white bg-[#C83B0E]"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
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

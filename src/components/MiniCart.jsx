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
            <p className="text-2xl text-black font-bold">${calculateTotal()}</p>
          </p>
          <p className="w-full bg-[#FCF8F5] rounded-md flex items-center justify-center py-2 mb-5 gap-1">
            <img
              src="/assets/images/icon-carbon-neutral.svg"
              alt="carbon neutral"
            />
            This is a <span className="font-bold">carbon-neutral</span>
            delivery
          </p>
          <button
            className="border-2 border-[#C83B0E] rounded-3xl flex items-center font-bold justify-center gap-3 py-2 w-full text-white bg-[#C83B0E]"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center p-3">
          <img src="/assets/images/illustration-empty-cart.svg" alt="empty cart" />
          <p>Your added items will appear here</p>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay flex justify-center items-end md:items-center">
          <div className="modal-content w-full max-w-[480px]">
            <img
              src="/assets/images/icon-order-confirmed.svg"
              alt="order confirmed"
            />
            <h2 className="font-bold text-2xl md:text-4xl mt-2 mb-1">
              Order Confirmed
            </h2>
            <p className="mb-3">We hope you enjoy your food!</p>
            {cartItems.length > 0 ? (
              <>
                <ul className="w-full bg-[#FCF8F5] rounded-md flex gap-5 flex-col items-center justify-center p-4 mb-5">
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="relative w-full flex gap-4 items-center"
                    >
                      <img
                        src={item.image.thumbnail}
                        alt={item.name}
                        className="max-w-[60px]"
                      />
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p>
                          <span className="text-[#C83B0E] font-bold">
                            {item.quantity}x {"  "}
                          </span>
                          <span className="text-slate-500">
                            {"  "}@ {item.price.toFixed(2)} {"  "}
                          </span>
                        </p>
                      </div>
                      <p className="absolute font-bold right-2">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <hr />
                    </li>
                  ))}
                  <li className="flex w-full justify-between items-center">
                    <p>Order Total</p>
                    <p className="text-2xl text-black font-bold">
                      ${calculateTotal()}
                    </p>
                  </li>
                </ul>
                <button
                  className="border-2 border-[#C83B0E] rounded-3xl flex items-center font-bold justify-center gap-3 py-2 w-full text-white bg-[#C83B0E]"
                  onClick={handleCloseModal}
                >
                  Start New Order
                </button>
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

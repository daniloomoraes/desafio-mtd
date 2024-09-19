import { useCookies } from "react-cookie";

function MiniCart() {
  const [cookies, setCookie] = useCookies(["myCart"]);

  const handleDelete = (itemName) => {
    const updatedCart = cookies.myCart.filter((item) => item.name !== itemName);
    setCookie("myCart", JSON.stringify(updatedCart), { path: "/" });
  };

  return (
    <>
      <h2>Your Cart ({cookies.myCart ? cookies.myCart.length : 0})</h2>
      <div>
        <ul>
          {cookies.myCart && cookies.myCart.length > 0 ? (
            cookies.myCart.map((item, index) => (
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
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default MiniCart;

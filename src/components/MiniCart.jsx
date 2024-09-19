import { useCookies } from "react-cookie";

function MiniCart() {
  const [cookies, setCookie] = useCookies(["myCart"]);

  const handleDelete = (itemName) => {
    const updatedCart = cookies.myCart.filter((item) => item.name !== itemName);
    setCookie("myCart", JSON.stringify(updatedCart), { path: "/" });
  };

  return (
    <>
      <p>Your Cart ({cookies.myCart ? cookies.myCart.length : 0})</p>
      <div>
        <ul>
          {cookies.myCart && cookies.myCart.length > 0 ? (
            cookies.myCart.map((item, index) => (
              <li key={index}>
                <p>
                  {item.quantity}x - {item.name}
                </p>
                <button onClick={() => handleDelete(item.name)}>Delete</button>
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

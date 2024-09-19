import products from "../../data/products";
import ProducShelf from "../../components/ProducShelf";
import MiniCart from "../../components/MiniCart";

function Home() {
  return (
    <>
      <div className="grid grid-cols-3 gap-[2vw]">
        <div className="col-span-2">
          <ul>
            {products.map((item, index) => (
              <ProducShelf item={item} />
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <div>
            <p>Your Cart ()</p>
            <MiniCart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

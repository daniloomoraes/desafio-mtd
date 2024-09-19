import products from "../data/products";
import ProducShelf from "../components/ProducShelf";
import MiniCart from "../components/MiniCart";

export default function Root() {
  return (
    <>
      <div className="grid grid-cols-3 gap-[2vw]">
        <div className="col-span-2">
          <h1>Desserts</h1>
          <ul className="grid grid-cols-3 gap-5">
            {products.map((item) => (
              <ProducShelf item={item} />
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <div>
            <MiniCart />
          </div>
        </div>
      </div>
    </>
  );
}

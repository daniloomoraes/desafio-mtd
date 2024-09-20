import products from "../data/products";
import ProducShelf from "../components/ProducShelf";
import MiniCart from "../components/MiniCart";

export default function Root() {
  return (
    <>
      <div className=" bg-[#FCF8F5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw] w-full max-w-[1200px] m-auto p-5 md:p-10">
          <div className="col-span-2">
            <h1 className="py-5 md:py-10 font-bold text-2xl md:text-4xl">Desserts</h1>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
      </div>
    </>
  );
}

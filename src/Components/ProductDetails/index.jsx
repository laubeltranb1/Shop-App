import { useContext } from "react";
import "./styles.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

export const ProductDetails = () => {
  const context = useContext(ShoppingCartContext);
  const productDetailInfo = context.productToShow;
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between item-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div
          className="cursor-pointer"
          onClick={() => context.closeProductDetail()}
        >
          <XMarkIcon className="h-6 w-6 text-black" />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src="https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          // src={productDetailInfo.images}
          alt={productDetailInfo.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl ">
          ${productDetailInfo.price}
        </span>
        <span className="font-medium text-md mb-2">
          {productDetailInfo.title}
        </span>
        <span className="font-light text-sm ">
          {productDetailInfo.description}
        </span>
      </p>
    </aside>
  );
};

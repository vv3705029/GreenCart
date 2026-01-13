import React from "react";
import Productcard from "./Productcard";
import { useAppContext } from "../context/AppContext";

const Bestseller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 8)
          .map((product) => (
            <Productcard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Bestseller;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const product = products.find((item) => item._id === id);
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Set initial thumbnail
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // Set related products
  useEffect(() => {
    if (product && products.length > 0) {
      const related = products
        .filter(
          (item) =>
            item.category === product.category && item._id !== product._id
        )
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [products, product]);

  if (!product) return <p className="p-6">Loading product...</p>;

  return (
    <div className="max-w-6xl w-full px-6 mt-6">
      {/* Breadcrumb */}
      <p className="text-sm mb-4 text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /
        <Link to="/products" className="hover:underline">
          {" "}
          Products
        </Link>{" "}
        /
        <Link
          to={`/products/${
            typeof product.category === "string"
              ? product.category.toLowerCase()
              : "unknown"
          }`}
          className="hover:underline"
        >
          {product.category || "Unknown"}
        </Link>{" "}
        /<span className="text-indigo-500 font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left side - Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setThumbnail(img)}
                className="w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer"
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-72 h-72 border border-gray-300 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Main view"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Info */}
        <div className="flex-1 text-sm">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={
                    i < product.rating
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  className="w-4 h-4"
                  alt="star"
                />
              ))}
            <span className="ml-2 text-gray-500">({product.rating})</span>
          </div>

          <div className="mt-6">
            <p className="line-through text-gray-500">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium">
              Price: {currency}
              {product.offerPrice}
            </p>
            <p className="text-sm text-gray-400">(inclusive of all taxes)</p>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            {product.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 transition rounded"
            >
              Add to Cart
            </button>
            <button className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((item, i) => (
              <div key={i} className="text-sm border p-3 rounded hover:shadow">
                <img
                  src={item.image[0]}
                  className="w-full h-36 object-cover rounded"
                  alt={item.name}
                />
                <p className="mt-2 font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs">
                  {currency}
                  {item.offerPrice}
                </p>
                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="text-indigo-500 text-xs mt-1 hover:underline"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

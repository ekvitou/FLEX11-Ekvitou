import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import Helmet from "react-helmet";

const ProductDetailPage = () => {
  const { uuid } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://ishop-api.istad.co/api/v1/products/${uuid}`
        );
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [uuid]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`${product.name} - ${product.description}. Shop now for the best deals on this product!`}
        />
        <meta
          name="keywords"
          content={`${product.name}, ${product.brand?.name}, ${product.category?.name}, online shopping`}
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content={`${product.name} - Flex11`} />
        <meta
          property="og:description"
          content={`${product.name}: ${product.description} - Available now at Flex11.`}
        />
        <meta property="og:image" content={product.thumbnail} />
        <meta
          property="og:url"
          content={`https://flex11-ekvitou.vercel.app/products/${uuid}`}
        />
        <meta name="twitter:title" content={`${product.name} - Flex11`} />
        <meta
          name="twitter:description"
          content={`${product.name}: ${product.description} - Available now at Flex11.`}
        />
        <meta name="twitter:image" content={product.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="canonical"
          content={`https://flex11-ekvitou.vercel.app/products/${uuid}`}
        />
        <title>{`${product.name} - Flex11`}</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-auto shadow"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-red-500 mb-4">
              ${product.priceOut.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Brand: {product.brand?.name || "No Brand"}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              In Stock: {product.stockQuantity || 0}
            </p>

            {/* Quantity control */}
            <div className="flex items-center mt-4 gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-200"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-gray-200"
              >
                +
              </button>
            </div>

            {/* Total price */}
            <p className="mt-2 text-gray-700">
              Total: ${(product.priceOut * quantity).toFixed(2)}
            </p>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;

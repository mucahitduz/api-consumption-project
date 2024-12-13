import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const fetchProducts = async (offset: number) => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = `products_offset_${offset}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setProducts(JSON.parse(cachedData));
      } else {
        const response = await apiClient.get(
          `products?offset=${offset}&limit=${limit}`
        );
        const newProducts = response.data;
        setProducts(newProducts);
        localStorage.setItem(cacheKey, JSON.stringify(newProducts));
      }
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(offset);
  }, [offset]);

  const nextPage = () => {
    setOffset(offset + limit);
  };

  const prevPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Products</h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex p-4 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-lg mr-6"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">
                  {product.title}
                </h2>
                <p className=" text-white">{product.description}</p>
                <p className="text-lg font-bold text-white mt-2">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevPage}
          disabled={offset === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Prev
        </button>

        <p className="text-lg font-semibold text-white">Page {currentPage}</p>

        <button
          onClick={nextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

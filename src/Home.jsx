import React, { useState, useEffect, useRef, memo } from "react";

const ProductCard = memo(
  ({ title, salePrice, originalPrice, thumbnailSrc }) => {
    // const [cardHeight, setCardHeight] = useState(0);
    // const cardRef = useRef(null);

    useEffect(() => {
      const handleResize = () => {
        // if (cardRef.current) {
        //   const imageHeight = cardRef.current.querySelector("img").offsetHeight;
        //   const contentHeight = cardRef.current.querySelector(".content").offsetHeight;
        //   setCardHeight(imageHeight + contentHeight);
        // }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div
        className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
        // style={{ height: `${cardHeight}px` }}
        // ref={cardRef}
      >
        <div className="relative overflow-hidden">
          <img
            className="w-full object-contain transition-transform duration-300 hover:scale-105"
            src={
              thumbnailSrc ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU"
            }
            alt="Product Thumbnail"
          />
        </div>
        <div className="p-4 flex flex-col content">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-baseline mt-auto">
            <span className="text-green-600 font-bold mr-2 text-xl">
              ₹{salePrice || originalPrice}
            </span>
            <span className="text-gray-500 line-through text-sm">
              ₹{originalPrice || ""}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      console.log(selectedCategory);
      filtered = filtered.filter(
        (product) => product.catagory === selectedCategory
      );
    }

    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://vh-apis.onrender.com/getAllProducts"
      );
      const data = await response.json();
      setProducts(data.allProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="text-3xl font-bold">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 lg:m-32 m-10">
          {/* Render skeleton loaders */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <div className="w-full h-60 bg-gray-400 rounded-3xl"></div>
              <div className="mt-4 h-16 overflow-hidden">
                <h3 className="w-full bg-gray-400 h-5 rounded-full"></h3>
              </div>
              <p className="w-full h-3 bg-gray-400 rounded-full"></p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7l py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {/* Mobile Category Dropdown */}
        <div className="mb-4 sm:hidden flex items-center gap-4 mx-6">
          <label htmlFor="category" className="font-semibold text-gray-700">
            Shop by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-fit"
          >
            <option value="">All</option>
            <option value="Headsets">Headsets</option>
            <option value="Mices">Mices</option>
            <option value="Gaming Chairs">Gaming Chairs</option>
          </select>
        </div>

        <div className="flex">
          {/* Desktop Sidebar */}
          {/* Desktop Sidebar */}
          <div className="hidden sm:block w-64 pr-8">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div>
              <button
                className={`block w-full py-2 px-3 text-left rounded-md mb-2 ${
                  selectedCategory === ""
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
              <button
                className={`block w-full py-2 px-3 text-left rounded-md mb-2 ${
                  selectedCategory === "Headsets"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory("Headsets")}
              >
                Headsets
              </button>
              <button
                className={`block w-full py-2 px-3 text-left rounded-md mb-2 ${
                  selectedCategory === "Mices"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory("Mices")}
              >
                Mices
              </button>
              <button
                className={`block w-full py-2 px-3 text-left rounded-md mb-2 ${
                  selectedCategory === "Gaming Chairs"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory("Gaming Chairs")}
              >
                Gaming Chairs
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <a
                  key={product._id}
                  href={`/productpage?id=${product._id}`}
                  className="group"
                >
                  <ProductCard
                    title={product.title}
                    salePrice={product.discountedPrice || ""}
                    originalPrice={product.price}
                    thumbnailSrc={product.thumbnail}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

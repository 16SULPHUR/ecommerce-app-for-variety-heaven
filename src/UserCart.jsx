import React, { useEffect, useState } from "react";
import { getCart, getProducts, removeFromCart } from "./getUser"; // Assuming you have functions to fetch cart items and products

const UserCart = (props) => {
  const [cartIds, setCartIds] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartIdsRaw = await getCart(localStorage.getItem("c"));
        setCartIds(cartIdsRaw);

        if (cartIdsRaw) {
          const fetchedProducts = props.products.length
            ? props.products
            : await getProducts();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      if (cartIds.length && products.length) {
        const filteredProducts = products.filter((product) =>
          cartIds.includes(product._id)
        );
        // setCart(filteredProducts);

        setCart(
          filteredProducts.map((product) => ({
            ...product,
            quantity: cartIds.filter((id) => id === product._id).length,
          }))
        );
      }
    };

    filterProducts();
  }, [products, cartIds]); // Update the effect dependency to only depend on cartIds

  const handleRemoveItem = async (productId) => {
    
    try{
        const resp = await removeFromCart(productId)
        console.log(resp)

        setCartIds(resp)

        window.location.href = window.location.href

     }catch(e){
        console.error(e)
    }
  };



  return (
    <div className="container mx-auto py-8 w-10/12 overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">
        <span className="text-5xl">🛒</span> Your Cart{" "}
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thumbnail
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discounted Price</th> */}
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remove
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Map over the cart array and render each cart item as a table row */}
          {cart.map((product, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-32 object-cover"
                />
              </td>
              <td className="px-6 py-4 line-clamp-2 lg:w-11/12 sm:w-4/5 h-16">
                {product.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-semibold text-2xl">
                  ₹{product.discountedPrice}{" "}
                </span>
                <br />
                <strike>₹{product.price}</strike>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{product.discountedPrice}</td> */}
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 justify-center"> */}
                  {/* <button className="bg-blue-800 font-bold text-white px-3 py-1 text-lg rounded-lg focus:outline-none">
                    +
                  </button> */}
                  {/* <span className="text-xl font-semibold">
                    {product.quantity}
                  </span> */}
                  {/* <button className="bg-blue-800 font-bold text-white px-3 py-1 text-lg rounded-lg focus:outline-none">
                    −
                  </button> */}
                {/* </div>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleRemoveItem(product._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCart;

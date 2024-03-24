import React, {useState, useNavigate, useEffect} from 'react'


const Home = () => {

  console.log("home")
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const deleteProduct = async (id) => {
    const isOK = window.confirm("ARE YOU SURE.");
    if (isOK) {
      try {
        const response = await fetch(
          `https://vh-apis.onrender.com/deleteProduct?id=${id}`
        );

        // Fetch updated products data after successful deletion
        fetchProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

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
    return <div className="text-3xl font-bold">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>

    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <a href={`/productpage?id=${product._id}`} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={product.thumbnail}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 h-16 overflow-hidden">
            <h3 className="text-sm text-black font-semibold -line-clamp-2">{product.title}</h3>
          </div>
          <div className='flex gap-2 items-baseline'>
            <p className="mt-1 text-2xl font-medium text-gray-900">₹ {product.price}</p>
            <strike className="mt-1 text-md font-medium text-gray-900">₹ {product.price}</strike>
          </div>
        </a>
      ))}
    </div>
  </div>
</div>


  )
}

export default Home

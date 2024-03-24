import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProductPage = () => {
  const [images, setImages] = useState({
    img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
    img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
    img3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
    img4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
    img5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
  });

  const [activeImg, setActiveImage] = useState(images.img1);

  const [amount, setAmount] = useState(1);

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const [searchParams] = new useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await fetch(`https://vh-apis.onrender.com/getProduct?id=${id}`);
        const response = await fetch(
          `https://vh-apis.onrender.com/getProduct?id=${id}`
        );
        const data = await response.json();
        console.log(data);
        setProduct(data.product[0]);

        setActiveImage(data.product[0].image1)

        setImages({
            img1: data.product[0].image1 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
            img2: data.product[0].image2 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
            img3: data.product[0].image3 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
            img4: data.product[0].image4 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
            img5: data.product[0].image5 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEu5mn0Q0Waa49vsVwm3liZ7PrjGUZAI9XcQ&usqp=CAU",
          });
          
      
    } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start lg:mx-56 mx-6 my-20">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={activeImg}
          alt=""
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
        <div className="flex flex-row justify-between h-24">
          <img
            src={images.img1}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img1)}
          />
          <img
            src={images.img2}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img2)}
          />
          <img
            src={images.img3}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img3)}
          />
          <img
            src={images.img4}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => setActiveImage(images.img4)}
          />
          <img
            src={images.img5}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer text"
            onClick={() => setActiveImage(images.img5)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className=" text-violet-600 font-semibold">
            Special Sneaker
          </span>
          <h1 className="text-3xl font-bold">{product.title}</h1>
        </div>
        <p className="text-gray-700">{product.description}</p>
        <div className="flex gap-2 items-baseline">
          <p className="mt-1 text-3xl font-medium text-gray-900">
            ₹ {product.price}
          </p>
          <strike className="mt-1 text-lg font-medium text-gray-900">
            ₹ {product.price}
          </strike>
        </div>
        <div className="flex lg:flex-row flex-col items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={decrementAmount}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

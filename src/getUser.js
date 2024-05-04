

const decryptPhoneNumber = (encryptedPhoneNumber, shift) => {
  // Check if the input is a valid encrypted phone number
  if (!/^\d{10}$/.test(encryptedPhoneNumber)) {
    return;
  }

  let decryptedPhoneNumber = "";
  for (let i = 0; i < encryptedPhoneNumber.length; i++) {
    const digit = parseInt(encryptedPhoneNumber[i], 10);
    const decryptedDigit = (digit - shift + 10) % 10; // Apply inverse shift to decrypt each digit
    decryptedPhoneNumber += decryptedDigit.toString();
  }
  return decryptedPhoneNumber;
};

const getUser = async (ph) => {
  console.log(decryptPhoneNumber(ph,3))
  // const resp = await fetch(`http://127.0.0.1:3005/signup/user?ph=${decryptPhoneNumber(ph,3)}`);
  const resp = await fetch(`https://vh-apis.onrender.com/signup/user?ph=${decryptPhoneNumber(ph,3)}`);
  const jsonresp = await resp.json()
  // console.log(jsonresp)
  return jsonresp.user;
};

const addToCartRequest = async (ph, id) => {
  const decPh = decryptPhoneNumber(ph, 3);

  const resp = await fetch(
    `https://vh-apis.onrender.com/signup/addToCart?ph=${decPh}&id=${id}`
  );

  const jsonResp = await resp.json();
  console.log(jsonResp);
  return jsonResp;
};

const getCart = async (ph) => {
    const decPh = decryptPhoneNumber(ph, 3);

    
  const resp = await fetch(
    `https://vh-apis.onrender.com/signup/getCart?ph=${decPh}`
  );

  const jsonResp = await resp.json();


  return jsonResp.cart;
};

const getProducts = async()=>{
  const response = await fetch(
    "https://vh-apis.onrender.com/getAllProducts"
  );
  const data = await response.json();

  // console.log(data.allProducts)

  return data.allProducts
}

const removeFromCart = async (id)=>{
  const response = await fetch(`https://vh-apis.onrender.com/signup/removeFromCart?ph=${decryptPhoneNumber(localStorage.getItem("c"), 3)}&id=${id}`)

  const jsonData = await response.json()

  console.log(jsonData)

  return jsonData.cart
}

module.exports = { getUser, addToCartRequest, getCart, getProducts, removeFromCart};

const checkIfSignupComplete = async (phone) => {

const encryptPhoneNumber = (phoneNumber, shift) => {
  // Check if the input is a valid phone number
  if (!/^\d{10}$/.test(phoneNumber)) {
    throw new Error("Invalid phone number");
  }

  let encryptedPhoneNumber = '';
  for (let i = 0; i < phoneNumber.length; i++) {
    const digit = parseInt(phoneNumber[i], 10);
    const encryptedDigit = (digit + shift) % 10; // Shift each digit by the specified amount
    encryptedPhoneNumber += encryptedDigit.toString();
  }

  localStorage.setItem("c", encryptedPhoneNumber)
  return encryptedPhoneNumber;
};


    try {
      const res = await fetch(
        // `http://127.0.0.1:3005/signup/checkIfSignupComplete?phone=${phone}`
        `https://vh-apis.onrender.com/signup/checkIfSignupComplete?phone=${phone}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const response = await res.json();

      console.log(response)

      if (response.isNew || !response.isSignupComplete) {
        // window.location.href = `http://127.0.0.1:3000/?signup=${true}&c=${encryptPhoneNumber(phone,3)}`
        window.location.href = `https://varietyheaven.vercel.app/?signup=${true}&c=${encryptPhoneNumber(phone,3)}`
        return false
      }

      // window.location.href = `http://127.0.0.1:3000/?signup=${false}&c=${encryptPhoneNumber(phone,3)}`
      window.location.href = `https://varietyheaven.vercel.app/?signup=${false}&c=${encryptPhoneNumber(phone,3)}`

      return true


    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Rethrow the error to be caught by the calling function
    }
  // };

};

const auth = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token"); 

  const CLIENT_ID = "14168416091898906021";
  

  const httpRequest = async () => {
    try {
      const url = "https://eapi.phone.email/getuser";
      const data = new FormData();

      data.append("access_token", accessToken);
      data.append("client_id", CLIENT_ID);

      const response = await fetch(url, { method: "POST", body: data });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.status !== 200) {
        throw new Error("Something went wrong");
      }

      const phEmailJwt = responseData.ph_email_jwt;

      const userDetails = {
        countryCode: responseData.country_code,
        phoneNo: responseData.phone_no,
        phEmailJwt: phEmailJwt,
      };

      
      //   console.log(userDetails)
      
      localStorage.setItem("logedInUser", userDetails.phoneNo)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("logedIn", true)

      // window.location.href = `http://127.0.0.1:3000/checkIfSignupComplete?phone=${userDetails.phoneNo}`

      checkIfSignupComplete(userDetails.phoneNo)

      // window.location.href = "https://varietyheaven.vercel.app"

      // Set cookie with 180-day expiration
      const cookieExpire = new Date(
        Date.now() + 180 * 24 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `ph_email_jwt=${phEmailJwt}; expires=${cookieExpire}; path=/`;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  await httpRequest()
};





module.exports= auth
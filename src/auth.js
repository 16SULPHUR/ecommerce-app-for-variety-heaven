const auth = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token"); 

  const CLIENT_ID = "14168416091898906021";

//   const REDIRECT_URL = window.location.href;
//   const AUTH_URL = `https://auth.phone.email/log-in?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}`;

  // Use state to manage user details
  

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

      window.location.href = "http://127.0.0.1:3000"

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
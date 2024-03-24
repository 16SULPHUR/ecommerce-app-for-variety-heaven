import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // const Login = ({ AUTH_URL }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token");
  // Replace with your actual CLIENT_ID
  const CLIENT_ID = "14168416091898906021";

  const REDIRECT_URL = window.location.href;
  const AUTH_URL = `https://auth.phone.email/log-in?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}`;

  // Use state to manage user details
  const [userDetails, setUserDetails] = useState({
    countryCode: "",
    phoneNo: "",
    phEmailJwt: "",
  });

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

      setUserDetails({
        countryCode: responseData.country_code,
        phoneNo: responseData.phone_no,
        phEmailJwt: phEmailJwt,
      });

      // Set cookie with 180-day expiration
      const cookieExpire = new Date(
        Date.now() + 180 * 24 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `ph_email_jwt=${phEmailJwt}; expires=${cookieExpire}; path=/`;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      httpRequest();
    }
  }, [accessToken]);

  return (
    <div>
      <div>
        {/* <h1 style={{ margin: "10px" }}>Sign In</h1>
        <p style={{ color: "#a6a6a6" }}>Welcome to Sign In with Phone</p> */}

        {accessToken ? (
          <span><Link to={"/"}>Sign Out</Link></span>
        ) : (
          <span>
            <button
              //   id="btn_ph_login"
              //   name="btn_ph_login"
              type="button"
              onClick={() =>
                window.open(
                  AUTH_URL,
                  "VARIETY HEAVEN",
                  "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=500, height=560, top=" +
                    (window.screen.height - 600) / 2 +
                    ", left=" +
                    (window.screen.width - 500) / 2
                )
              }
            >Sign in</button>
          </span>
        )}
        {/* Sign In with Phone */}
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import getUser from "./getUser";

export default function SignupModal(props) {
  const [showModal, setShowModal] = useState(props.open || false);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isModified, setIsModified] = useState(false); // State variable to track modifications
  const searchParams = new URLSearchParams(window.location.search);
  const encPh = searchParams.get("c");

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

  const decPh = decryptPhoneNumber(encPh, 3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (decPh) {
          const response = await getUser(decPh);
          setUser(response.user);
          setName(response.user.name);
          setAddress(response.user.address);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [decPh]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsModified(true); // Set the modified state to true when name changes
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setIsModified(true); // Set the modified state to true when address changes
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://vh-apis.onrender.com/signup/updateUser?phone=${decPh}&name=${name}&address=${address}`
      );

      console.log(await response.json());

      setShowModal(false);

      // Reset modified state after submission
      setIsModified(false);

      // Handle any response or error here
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Complete Signup</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-col">
                  <div id="phone">
                    <label
                      htmlFor="phone"
                      className="block font-medium mb-2 text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={decPh}
                      className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div id="name">
                    <label
                      htmlFor="name"
                      className="block font-medium mb-2 text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div id="address">
                    <label
                      htmlFor="address"
                      className="block font-medium mb-2 text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      value={address}
                      cols={50}
                      rows={4}
                      onChange={handleAddressChange}
                      style={{ resize: "none" }} // Disable resizing
                      className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`${
                      isModified
                        ? "bg-emerald-500 text-white active:bg-emerald-600 cursor-pointer"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    } font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isModified} // Disable button if not modified
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

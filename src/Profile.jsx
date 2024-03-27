import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');

  const cartItems = [
    { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  ];

  const orders = [
    { id: 1, date: '2023-04-01', total: 59.98, status: 'Delivered' },
    { id: 2, date: '2023-03-15', total: 89.97, status: 'Processing' },
  ];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the updated profile information here
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden mr-8 mb-4 md:mb-0">
            <img
              src="https://ik.imagekit.io/dqn1rnabh/user-icon.gif?updatedAt=1711192427330"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-3xl font-bold bg-transparent focus:outline-none w-full"
              />
            ) : (
              <h2 className="text-3xl font-bold">{name}</h2>
            )}
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-600 mt-1 bg-transparent focus:outline-none w-full"
              />
            ) : (
              <p className="text-gray-600 mt-1">{email}</p>
            )}
            {isEditing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-gray-600 bg-transparent focus:outline-none w-full"
              />
            ) : (
              <p className="text-gray-600">{phone}</p>
            )}
          </div>
          <div className="ml-auto">
            {isEditing ? (
              <div className="flex flex-col md:flex-row mt-4 md:mt-0">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 mb-2 md:mb-0"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Cart</h3>
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Orders</h3>
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
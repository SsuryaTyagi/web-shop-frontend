import React, { useContext } from 'react'
import { MyContext } from '../../data/Context';

export default function Profile() {
  const { logout } = useContext(MyContext);
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Logout Button */}
        <button
          onClick={logout}
          className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm"
        >
          Logout
        </button>

        {/* App Name */}
        <h2 className="text-2xl font-bold text-center mb-1">
          Food Delivery App
        </h2>

        <p className="text-center text-gray-500 mb-6">User Profile</p>

        {/* Profile Details */}
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-1">
            <span className="font-semibold text-gray-700">Name:</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-semibold text-gray-700">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-semibold text-gray-700">Mobile:</span>
            <span>{user.number}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-semibold text-gray-700">User ID:</span>
            <span className="text-right break-all">{user._id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

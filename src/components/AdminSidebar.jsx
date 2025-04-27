import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center p-4 bg-gray-900">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="flex-grow mt-6">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/admin/users">Users</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/admin/products">Products</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/admin/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <div className="py-4 px-4 bg-gray-900 text-center">
        <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

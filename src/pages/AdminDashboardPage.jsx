// src/pages/AdminDashboardPage.jsx
import React from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../store/userApiSlice";
import Helmet from "react-helmet";

const AdminDashboardPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(uuid).unwrap();
        refetch();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Something went wrong while deleting.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Manage and view all users in the admin dashboard. Delete and edit users' information."
        />
        <meta
          name="keywords"
          content="admin dashboard, user management, admin access, delete users, view users"
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content="Admin Dashboard - Flex11" />
        <meta
          property="og:description"
          content="Manage and view all users in the admin dashboard. Delete and edit users' information."
        />
        <meta
          property="og:image"
          content="/path/to/admin-dashboard-image.jpg"
        />
        <meta
          property="og:url"
          content="https://flex11-ekvitou.vercel.app/admin/dashboard"
        />
        <meta name="twitter:title" content="Admin Dashboard - Flex11" />
        <meta
          name="twitter:description"
          content="Manage and view all users in the admin dashboard. Delete and edit users' information."
        />
        <meta
          name="twitter:image"
          content="/path/to/admin-dashboard-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Admin Dashboard - Flex11</title>
        <link
          rel="canonical"
          href="https://flex11-ekvitou.vercel.app/admin/dashboard"
        />
      </Helmet>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {isLoading && <p>Loading users...</p>}
        {isError && <p>Failed to load users.</p>}

        {!isLoading && !isError && (
          <table className="w-full border border-gray-200 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Roles</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.content?.map((user) => (
                <tr key={user.uuid} className="text-center">
                  <td className="py-2 px-4 border">{user.username}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.phoneNumber}</td>
                  <td className="py-2 px-4 border">
                    {user.roles?.map((r) => r.name).join(", ")}
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                      onClick={() => handleDelete(user.uuid)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
                      onClick={() => alert("Edit coming soon!")}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;

import React, { useEffect, useState } from "react";
import { adminAPI } from "../api";
import toast from "react-hot-toast";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { Eye, EyeOffIcon } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      // Ensure we always have an array
      const usersData = Array.isArray(res.data) ? res.data : [];
      setUsers(usersData.reverse());
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await adminAPI.getOrders();
      // Ensure we always have an array
      const ordersData = Array.isArray(res.data) ? res.data : [];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
      await fetchOrders();
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleDetails = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await adminAPI.deleteUser(id);
      toast.success("User deleted successfully!");
      setUsers(users.filter(user => user.id !== id));
      // Orders are cascade deleted on backend, but let's update frontend state
      setOrders(orders.filter(order => order.user_id !== id));
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const getDisplayName = (user) => user.name || user.username || user.email || user.role;

  const formatPrice = (price) => {
    const num = typeof price === "number" ? price : Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };




  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return b.id - a.id;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="min-h-screen bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#5c2c06] mb-6 text-center">
          <img src={"/people.png"} alt="logout" className="w-5 h-5 ml-70 relative top-7 " />
          User Management</h2>

        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <>
            {currentUsers.map((user) => {
              const isExpanded = expandedUserId === user.id;
              // Filter orders by user_id
              const userOrders = orders.filter(order => order.user_id === user.id);

              return (
                <div
                  key={user.id}
                  className="mb-5 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleDetails(user.id)}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#4b2e2e] flex items-center gap-2">
                        {getDisplayName(user)}
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${user.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                            }`}
                        >
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <span className="text-sm text-gray-500 hover:text-[#5c2c06] transition duration-200">
                      {isExpanded ? <EyeOffIcon /> : <Eye />}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="bg-white border border-[#ebd9c8] rounded-b-2xl px-5 py-4 text-sm text-[#4b2e2e]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        <p><strong>Username:</strong> {user.username || "N/A"}</p>
                        <p><strong></strong> {user.phone || ""}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        {/* <p><strong>Role:</strong> {user.role}</p> */}
                        <p className="md:col-span-2"><strong>Address:</strong> {user.address || "Not Provided"}</p>
                      </div>



                      {user.role !== "admin" && (
                        <div className="mt-4 bg-[#f9f4f1] border border-[#e5cbb5] rounded-lg p-4">
                          <h4 className="font-bold text-[#5c2c06] mb-2">🛒 Purchase History</h4>
                          {userOrders.length === 0 ? (
                            <p className="text-sm text-gray-500">No purchases yet.</p>
                          ) : (
                            <div className="space-y-4">
                              {userOrders.map((order) => (
                                <div
                                  key={order.id}
                                  className="border border-[#e5d3bd] rounded-lg p-4 bg-[#fffefc]"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm font-semibold text-[#4b2e2e]">
                                      Order #{order.id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(order.created_at).toLocaleString()}
                                    </p>
                                  </div>

                                  <div className="flex gap-2 mb-2 text-sm">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${order.status === "pending"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : order.status === "shipped"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "delivered"
                                              ? "bg-green-100 text-green-700"
                                              : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                      {order.status}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${order.payment_method === "cod"
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-pink-100 text-pink-700"
                                        }`}
                                    >
                                      {order.payment_method}
                                    </span>
                                  </div>

                                  <div className="space-y-2 mb-2">
                                    {order.items && order.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-3 bg-[#fdf8f3] p-2 rounded-lg"
                                      >
                                        {/* Image handling - assuming item.product_image from serializer */}
                                        {item.product_image && (
                                          <img
                                            src={item.product_image.startsWith('http') ? item.product_image : `http://localhost:8000${item.product_image}`}
                                            alt={item.product_name}
                                            className="w-12 h-12 object-cover rounded"
                                          />
                                        )}
                                        <div className="flex-1">
                                          <p className="text-sm font-medium">{item.product_name}</p>
                                          <p className="text-xs text-gray-500">
                                            ₹{formatPrice(item.price)} × {item.quantity}
                                          </p>
                                        </div>
                                        <p className="text-sm font-semibold">
                                          ₹{formatPrice(item.price * item.quantity)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  <p className="text-sm text-gray-600">
                                    <strong>Shipping:</strong> {order.shipping_address || "N/A"}
                                  </p>
                                  <p className="text-right text-md font-bold text-[#4b2e2e] mt-2">
                                    Total: ₹{formatPrice(order.total)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1.5 rounded-full text-xs font-semibold transition"
                        >
                          <FaTrash size={14} />
                          Delete User
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}



            <div className="flex justify-center mt-6 gap-2 flex-wrap">


              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${currentPage === i + 1
                      ? "bg-[#5c2c06] text-white"
                      : "bg-gray-100 hover:bg-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}


            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

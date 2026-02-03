import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../Context/UserContext";
import { ordersAPI } from "../api";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();


  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await ordersAPI.getOrders();
        // Backend sorts by descending date already
        setOrders(response.data);
      } catch (err) {
        console.error("Order fetch error:", err);
        setError("Could not load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : Number(price);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef6f3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f4e37] mx-auto"></div>
          <p className="mt-4 text-[#6f4e37]">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fef6f3] flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-[#6f4e37] mb-4">Error</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#5a3f2d]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef6f3] py-10 px-4">
      <h2 className="text-center text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
        My Orders 📦
      </h2>

      {orders.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#6f4e37] hover:bg-[#5a3f2d] text-white px-6 py-2 rounded-lg transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-xl p-6 border border-[#f3e8e3] hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#6f4e37]">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-2 sm:mt-0">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-16 h-16 object-contain bg-white p-1 rounded border border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#6f4e37]">{item.product?.name}</h4>
                      <p className="text-sm text-gray-600">
                        ₹{formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-black">
                      ₹{formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Payment: {String(order.payment_method).toUpperCase()}</p>
                    <p className="text-sm text-gray-600">Shipping to: {order.shipping_address.substring(0, 30)}...</p>
                  </div>
                  <span className="text-lg font-bold text-[#6f4e37]">
                    Total: ₹{formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
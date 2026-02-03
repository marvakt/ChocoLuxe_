import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

function Cart() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { cart, fetchCart, updateQty, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingIds, setUpdatingIds] = useState([]);

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);
        await fetchCart();
      } catch (err) {
        console.error(" Cart fetch failed:", err);
        setError("Failed to load cart. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const startLoading = (id) =>
    setUpdatingIds((prev) => [...new Set([...prev, id])]);

  const stopLoading = (id) =>
    setUpdatingIds((prev) => prev.filter((itemId) => itemId !== id));

  const handleUpdateQty = async (productId, newQty) => {
    if (newQty < 1) return;
    startLoading(productId);
    try {
      await updateQty(productId, newQty);
    } catch (error) {
      // Error handled in context
    } finally {
      stopLoading(productId);
    }
  };

  const handleRemove = async (productId) => {
    startLoading(productId);
    try {
      await removeFromCart(productId);
    } catch (error) {
      // Error handled in context
    } finally {
      stopLoading(productId);
    }
  };

  const getTotal = () =>
    cart.reduce((sum, item) => {
      const price = Number(item.product?.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);

  const formatPrice = (price) =>
    isNaN(price) ? "0.00" : Number(price).toFixed(2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef6f3]">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-[#6f4e37] border-t-transparent rounded-full mx-auto" />
          <p className="mt-3 text-[#6f4e37] font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef6f3]">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#54372a]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fef6f3] min-h-screen p-6">
      <h2 className="text-3xl md:text-4xl text-center font-bold text-[#6f4e37] mb-8">
        Your Cart 🛒
      </h2>

      {cart.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-4">Oops! Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#6f4e37] hover:bg-[#4a3224] text-white px-6 py-2 rounded-lg transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const { product } = item;
              if (!product) return null;

              const isUpdating = updatingIds.includes(product.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row p-4 gap-5 hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 object-contain rounded-md bg-[#fffaf7]"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-xl font-semibold text-[#6f4e37]">{product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{formatPrice(product.price)} × {item.quantity}
                        <span className="ml-2 font-semibold text-black">
                          = ₹{formatPrice(product.price * item.quantity)}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center mt-3 space-x-3">
                      <button
                        onClick={() => handleUpdateQty(product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isUpdating}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(product.id, item.quantity + 1)}
                        disabled={isUpdating}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-bold transition disabled:opacity-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        disabled={isUpdating}
                        className="ml-auto text-red-500 hover:text-red-600 text-sm transition disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 h-fit">
            <h3 className="text-2xl font-bold text-[#6f4e37] mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between mb-6 text-sm text-gray-500">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>₹{formatPrice(getTotal())}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#6f4e37] hover:bg-[#4a3224] text-white py-3 rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

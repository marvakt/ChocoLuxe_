import React, { useState } from "react";
import {
  AiOutlineClose,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { useUser } from "../Context/UserContext";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";

const ProductDetails = ({ product, closeProductDetails }) => {
  const { user } = useUser();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const isInCart = cart?.some((item) => item.productId === product.id);

  const handleAddToCart = async () => {
    if (addingToCart) return;
    setAddingToCart(true);
    toast.dismiss();

    if (!user) {
      toast.error("Please login to add to cart");
      setAddingToCart(false);
      return;
    }

    if (isInCart) {
      toast.error("Already in cart");
      setAddingToCart(false);
      return;
    }

    try {
      await addToCart(product); 
      toast.success("Added to cart");
      closeProductDetails();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = () => {
    toast.dismiss();

    if (!user) {
      toast.error("Please login to manage wishlist");
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={closeProductDetails}
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="relative">
          <button
            onClick={closeProductDetails}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 transition"
          >
            <AiOutlineClose className="text-gray-700 text-xl" />
          </button>

         
          <div className="grid md:grid-cols-2 gap-8 p-6">
            
            <div className="md:sticky md:top-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            
            <div>
              <h2 className="text-3xl font-bold text-[#6f4e37] mb-2">
                {product.name}
              </h2>

              
              <div className="flex items-center mb-4">
                <span className="bg-[#f3e8e3] text-[#6f4e37] text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex ml-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product.rating || 4)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

             
              <p className="text-gray-700 mb-6">{product.description}</p>

             
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#6f4e37] mb-2">
                  Details
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Weight: {product.weight || "100g"}</li>
                  <li>
                    • Ingredients:{" "}
                    {product.ingredients || "Cocoa, Sugar, Milk"}
                  </li>
                  <li>• Allergens: {product.allergens || "Contains milk"}</li>
                </ul>
              </div>

              
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-[#6f4e37]">
                  ₹{product.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className={`bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-2 px-6 rounded-full transition-colors duration-300 flex items-center gap-2 ${
                    addingToCart ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
              </div>

              
              <button
                onClick={handleToggleWishlist}
                className="flex items-center gap-2 text-[#6f4e37] hover:text-[#5a3f2d] transition"
              >
                {isWishlisted ? (
                  <>
                    <AiFillHeart className="text-red-500" />
                    <span>Remove from Wishlist</span>
                  </>
                ) : (
                  <>
                    <AiOutlineHeart />
                    <span>Add to Wishlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

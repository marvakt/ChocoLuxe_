import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../api';
import { useUser } from './UserContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await cartAPI.getCart();
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, [user?.id]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!user?.id) {
      toast.error('Please login to add items to cart');
      return;
    }

    const productId = item.id;

    try {
      await cartAPI.addToCart(productId);
      await fetchCart(); // Refresh cart
      toast.success(`${item.name} added to cart`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      if (err.response?.status === 400) {
        toast.error('Item already in cart');
      } else {
        toast.error('Failed to add to cart');
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      await fetchCart(); // Refresh cart
      toast.success('Item removed from cart');
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      toast.error('Failed to remove from cart');
    }
  };

  // Update quantity
  const updateQty = async (productId, newQty) => {
    try {
      await cartAPI.updateCartItem(productId, newQty);
      await fetchCart(); // Refresh cart
    } catch (err) {
      console.error('Failed to update quantity:', err);
      toast.error('Failed to update quantity');
      throw err; // Re-throw to handle loading state in component
    }
  };

  // Fetch cart when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        fetchCart,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

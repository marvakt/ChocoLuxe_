
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../api';
import { useUser } from './UserContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await wishlistAPI.getWishlist();
      setWishlist(res.data);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    }
  }, [user?.id]);

  const toggleWishlist = async (item) => {
    if (!user?.id) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      const res = await wishlistAPI.toggleWishlist(item.id);
      await fetchWishlist(); // Refresh wishlist

      if (res.data.status === 'added') {
        toast.success(`${item.name} added to wishlist`);
      } else {
        toast.success(`${item.name} removed from wishlist`);
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  // Legacy methods for backward compatibility
  const addToWishlist = async (item) => {
    await toggleWishlist(item);
  };

  const removeFromWishlist = async (productId) => {
    // For Django backend, we use toggle with product info
    await toggleWishlist({ id: productId, name: 'Item' });
  };

  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user?.id, fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => useContext(WishlistContext);

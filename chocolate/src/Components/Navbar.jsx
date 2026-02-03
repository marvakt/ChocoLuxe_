import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Heart, ShoppingCart, User2Icon, Menu as MenuIcon, X } from 'lucide-react';
import { useUser } from "../Context/UserContext";
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';

const Navbar = () => {
  const { user, logout } = useUser();
  const { fetchCart, cart } = useCart();
  const { fetchWishlist, wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchWishlist();
    }
  }, [location.pathname, user, fetchCart, fetchWishlist]);

  return (
    <nav className={`sticky top-0 z-50 shadow-md transition duration-300 
      ${isHome ? "bg-transparent backdrop-blur-xl bg-white/10" : "bg-white"}`}>

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand */}
        <NavLink
          to="/"
          className="text-3xl font-bold hover:text-[#885537] transition"
          style={{ fontFamily: "'Dancing Script', cursive" }}>
          ChocoLuxe
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#885537]' : ''}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'text-[#885537]' : ''}>Products</NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'text-[#885537]' : ''}>Orders</NavLink>

          {user && (
            <>
              <NavLink to="/cart" className="relative group">
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </NavLink>

              <NavLink to="/wishlist" className="relative group">
                <Heart size={22} className="group-hover:scale-110 transition-transform" />
                {wishlist?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            </>
          )}

          {/* User Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2">
              {user && <span className="text-sm">{user.username}</span>}
              <User2Icon size={22} />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                <div className="py-1 text-sm">
                  {!user ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to="/login" className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}>Login</NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to="/register" className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}>Register</NavLink>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => { logout(); navigate("/"); }} className={`w-full text-left px-4 py-2 ${active ? "bg-gray-100" : ""}`}>Logout</button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-transparent backdrop-blur-xl text-lg">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
          <NavLink to="/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
          {user && (
            <>
              <NavLink to="/cart" onClick={() => setMenuOpen(false)}><ShoppingCart/> ({cart?.length || 0})</NavLink>
              <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}><Heart/> ({wishlist?.length || 0})</NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
            </>
          ) : (
            <button onClick={() => { logout(); navigate("/"); setMenuOpen(false); }} className="text-left">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

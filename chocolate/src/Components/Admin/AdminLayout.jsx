import { Loader, LogOut } from 'lucide-react';
import React, { useState,useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();




  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <img src={"/dashboard.png"} alt="logout" className="w-5 h-5" />, path: '/admin/dashboard' },
    { id: 'products', name: 'Products', icon: <img src={"/products.png"} alt="logout" className="w-5 h-5" />, path: '/admin/products' },
    { id: 'orders', name: 'Orders', icon: <img src={"/order.png"} alt="logout" className="w-5 h-5" />, path: '/admin/orders' },
    { id: 'users', name: 'Users', icon: <img src={"/people.png"} alt="logout" className="w-5 h-5" />, path: '/admin/users' },
    { id: 'settings', name: 'Logout',icon: <img src={"/logout.png"} alt="logout" className="w-5 h-5" />, path: '/login' },
  ];

  const [admin, setAdmin] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.role === "admin") {
    setAdmin(storedUser);
  }
}, []);


  const activeMenu = menuItems.find(item => location.pathname.includes(item.path))?.id || 'dashboard';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-56'} bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}>
        <div className="p-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-2xl font-bold text-slate-800">ChocoLuxe</h1>
                <p className="text-sm text-slate-500">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors p-4"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        

        <nav className="flex-1 py-6">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => 
                  `w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
                {!sidebarCollapsed && activeMenu === item.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-slate-800 capitalize">
                  {menuItems.find(item => item.id === activeMenu)?.name || 'Dashboard'}
                </h2>
                <div className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                  Live
                </div>
              </div>
            </div>

            
         

          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800">
                {admin?.username || "Admin"}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold uppercase">
              {admin?.username?.slice(0, 2) || "cp"}
            </div>
          </div>

          </div>
        </header>

        

        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-slate-500">Admin</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-700 font-medium capitalize">{activeMenu}</span>
          </div>
        </div>

        

        <main className="flex-1 p-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

       
      </div>
    </div>
  );
};

export default AdminLayout;
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Package, ShoppingCart, Users, TrendingUp, IndianRupee, Eye } from 'lucide-react';
import { adminAPI } from '../api';
import toast from 'react-hot-toast';

const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

function AdminDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [orderStatus, setOrderStatus] = useState({
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  const getOrderStatusData = () => {
    return [
      { name: 'Pending', value: orderStatus.pending },
      { name: 'Shipped', value: orderStatus.shipped },
      { name: 'Delivered', value: orderStatus.delivered },
      { name: 'Cancelled', value: orderStatus.cancelled }
    ].filter(item => item.value > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard data from Django API
        const dashboardRes = await adminAPI.getDashboard();
        const dashboardData = dashboardRes.data;

        setStats({
          totalRevenue: dashboardData.totalRevenue || 0,
          totalOrders: dashboardData.totalOrders || 0,
          totalUsers: dashboardData.totalUsers || 0,
          totalProducts: dashboardData.totalProducts || 0,
        });

        setOrderStatus(dashboardData.orderStatus || {
          pending: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0
        });

        // Fetch orders for sales data
        const ordersRes = await adminAPI.getOrders();
        const orders = ordersRes.data || [];

        // Process sales data by date
        const dataByDate = {};
        orders.forEach(order => {
          const date = new Date(order.created_at).toLocaleDateString();
          const orderTotal = parseFloat(order.total) || 0;
          dataByDate[date] = (dataByDate[date] || 0) + orderTotal;
        });

        setSalesData(Object.entries(dataByDate).map(([date, total]) => ({ date, total })));

        // Fetch products for category data
        const productsRes = await adminAPI.getProducts();
        const products = productsRes.data || [];

        const categoryCount = {};
        products.forEach(product => {
          const category = product.category || 'Unknown';
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        setCategoryData(Object.entries(categoryCount).map(([category, value]) => ({
          name: category.charAt(0).toUpperCase() + category.slice(1),
          value
        })));

        // Recent activity from orders
        setRecentActivity(orders.slice(0, 4).map((order, index) => ({
          id: index + 1,
          type: 'order',
          message: `New order from ${order.user || 'Customer'}`,
          time: new Date(order.created_at).toLocaleTimeString(),
          amount: `₹${parseFloat(order.total).toFixed(2)}`
        })));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-100 rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-300 to-emerald-500 rounded-xl flex items-center justify-center">
              <IndianRupee size={24} className="text-white" />
            </div>
          </div>
        </div>



        <div className="bg-gradient-to-r from-blue-100 rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalOrders.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-300 to-cyan-500 rounded-xl flex items-center justify-center">
              <ShoppingCart size={24} className="text-white" />
            </div>
          </div>
        </div>



        <div className="bg-gradient-to-r from-violet-100 rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-500 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-100 rounded-2xl p-6 shadow-xl/20 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProducts.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-300 to-red-500 rounded-xl flex items-center justify-center">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        <div className="bg-white rounded-2xl p-6 shadow-xl/30 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3dca0aff] rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#83f65cff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3dca0aff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3dca0aff"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>





        <div className="bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={getOrderStatusData()}
                cx="48.5%"
                cy="50%"
                innerRadius={40}
                outerRadius={99}
                paddingAngle={1}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {getOrderStatusData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} orders`, 'Count']}
                contentStyle={{
                  backgroundColor: { COLORS },
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>




      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'order' ? 'bg-green-100' :
                  activity.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                  {activity.type === 'order' ? <ShoppingCart size={18} className="text-green-600" /> :
                    activity.type === 'user' ? <Users size={18} className="text-blue-600" /> :
                      <Package size={18} className="text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>

                </div>
                {activity.amount && (
                  <div className="text-sm font-semibold text-green-600">
                    {activity.amount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>





      </div>
    </div>
  );
}

export default AdminDashboard;
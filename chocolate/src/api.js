import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const { access } = response.data;
                    localStorage.setItem('access_token', access);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, logout user
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// API endpoints
export const authAPI = {
    register: (data) => api.post('/api/auth/register/', data),
    login: (data) => api.post('/api/auth/login/', data),
};

export const productsAPI = {
    getAll: () => api.get('/api/products/'),
};

export const cartAPI = {
    getCart: () => api.get('/api/cart/'),
    addToCart: (productId) => api.post('/api/cart/add/', { product_id: productId }),
    removeFromCart: (productId) => api.post('/api/cart/remove/', { product_id: productId }),
    updateCartItem: (productId, qty) => api.patch('/api/cart/update/', { product_id: productId, qty }),
};

export const wishlistAPI = {
    getWishlist: () => api.get('/api/wishlist/'),
    toggleWishlist: (productId) => api.post('/api/wishlist/toggle/', { product_id: productId }),
};

// Admin API endpoints
export const adminAPI = {
    // Dashboard
    getDashboard: () => api.get('/api/admin/dashboard/'),

    // Users
    getUsers: () => api.get('/api/admin/users/'),
    deleteUser: (userId) => api.delete(`/api/admin/users/${userId}/`),

    // Products
    getProducts: () => api.get('/api/admin/products/'),
    createProduct: (productData) => api.post('/api/admin/products/add/', productData),
    updateProduct: (productId, productData) => api.put(`/api/admin/products/${productId}/`, productData),
    deleteProduct: (productId) => api.delete(`/api/admin/products/${productId}/delete/`),

    // Orders
    getOrders: () => api.get('/api/admin/orders/'),
    updateOrder: (orderId, orderData) => api.put(`/api/admin/orders/${orderId}/`, orderData),
    deleteOrder: (orderId) => api.delete(`/api/admin/orders/${orderId}/delete/`),
};

export const ordersAPI = {
    createOrder: (orderData) => api.post('/api/orders/create/', orderData),
    getOrders: () => api.get('/api/orders/'),
};

export default api;

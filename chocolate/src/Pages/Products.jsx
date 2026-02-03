// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { FiSearch } from "react-icons/fi";
// import { BsArrowDownUp } from "react-icons/bs";
// import { ArrowLeftCircle, ArrowRightCircle, LucideList } from "lucide-react";
// import ProductCard from "../Components/ProductCard";
// import ProductDetails from "../Components/ProductDetails";
// import toast from "react-hot-toast";
// import { useCart } from "../Context/CartContext"; 

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sortOrder, setSortOrder] = useState("default");
//   const [wishlist, setWishlist] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { addToCart } = useCart(); 

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get("http://localhost:3001/products");
//         const data = Array.isArray(res.data) ? res.data : res.data.products || [];
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:3001/wishlist?userId=${user.id}`)
//         .then((res) => setWishlist(res.data))
//         .catch((err) => console.error("Wishlist error:", err));
//     }
//   }, [user]);

//   const categories = ["All"];
//   products.forEach((product) => {
//     if (!categories.includes(product.category)) {
//       categories.push(product.category);
//     }
//   });

//   let filteredProducts = products;

//   if (search.trim() !== "") {
//     filteredProducts = filteredProducts.filter((p) =>
//       p.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }

//   if (category !== "All") {
//     filteredProducts = filteredProducts.filter((p) => p.category === category);
//   }

//   if (sortOrder === "asc") {
//     filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
//   } else if (sortOrder === "desc") {
//     filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
//   }

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, category, sortOrder]);

//   const toggleWishlist = async (product) => {
//     if (!user) {
//       toast.error("Please login to use wishlist!");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:3001/wishlist?userId=${user.id}&productId=${product.id}`
//       );
//       const existing = res.data[0];

//       if (existing) {
//         await axios.delete(`http://localhost:3001/wishlist/${existing.id}`);
//       } else {
//         await axios.post("http://localhost:3001/wishlist", {
//           userId: user.id,
//           productId: product.id,
//           name: product.name,
//           image: product.image,
//           price: product.price,
//         });
//       }

//       const updated = await axios.get(
//         `http://localhost:3001/wishlist?userId=${user.id}`
//       );
//       setWishlist(updated.data);
//     } catch (err) {
//       console.error("Wishlist Error:", err);
//     }
//   };

//   const wishlistIds = new Set(wishlist.map((item) => item.productId));

//   const openProductDetails = (product) => {
//     setSelectedProduct(product);
//     document.body.style.overflow = "hidden";
//   };

//   const closeProductDetails = () => {
//     setSelectedProduct(null);
//     document.body.style.overflow = "auto";
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#fef6f3]">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-16 w-16 bg-[#6f4e37] rounded-full mb-4"></div>
//           <p className="text-xl text-[#6f4e37] font-serif">Loading chocolates...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-[#fef6f3] min-h-screen">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
//           Our Chocolate Collection
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Handcrafted with premium ingredients for the ultimate chocolate experience
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center gap-4 mb-12 bg-white p-4 rounded-lg shadow-sm">
//         <div className="relative w-full sm:w-64">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search chocolates..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] w-full"
//           />
//         </div>

//         <div className="relative">
//           <LucideList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//             className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="relative">
//           <BsArrowDownUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <select
//             onChange={(e) => setSortOrder(e.target.value)}
//             value={sortOrder}
//             className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
//           >
//             <option value="default">Sort By</option>
//             <option value="asc">Price: Low to High</option>
//             <option value="desc">Price: High to Low</option>
//           </select>
//         </div>
//       </div>

//       {paginatedProducts.length === 0 ? (
//         <div className="text-center py-12">
//           <h3 className="text-2xl text-[#6f4e37] mb-2">No chocolates found</h3>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {paginatedProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               openProductDetails={openProductDetails}
//               toggleWishlist={toggleWishlist}
//               wishlistIds={wishlistIds}
//               addToCart={addToCart}
//             />
//           ))}
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 rounded bg-[#6f4e37] text-white disabled:opacity-50"
//           >
//             <ArrowLeftCircle />
//           </button>
//           <span className="text-[#6f4e37] font-semibold">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 rounded bg-[#6f4e37] text-white disabled:opacity-50"
//           >
//             <ArrowRightCircle />
//           </button>
//         </div>
//       )}

//       {selectedProduct && (
//         <ProductDetails
//           product={selectedProduct}
//           closeProductDetails={closeProductDetails}
//           toggleWishlist={toggleWishlist}
//           wishlistIds={wishlistIds}
//           addToCart={addToCart}
//         />
//       )}
//     </div>
//   );
// }

// export default Products;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsArrowDownUp } from "react-icons/bs";
import { ArrowLeftCircle, ArrowRightCircle, LucideList } from "lucide-react";
import ProductCard from "../Components/ProductCard";
import ProductDetails from "../Components/ProductDetails";
import toast from "react-hot-toast";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { productsAPI } from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist: contextToggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await productsAPI.getAll();
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All"];
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  let filteredProducts = products;

  if (search.trim() !== "") {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "All") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (sortOrder === "asc") {
    filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortOrder]);

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to use wishlist!");
      navigate("/login");
      return;
    }

    await contextToggleWishlist(product);
  };

  const wishlistIds = new Set(wishlist.map((item) => item.productId));

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef6f3] px-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-[#6f4e37] rounded-full mb-4"></div>
          <p className="text-xl text-[#6f4e37] font-serif text-center">Loading chocolates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-[#fef6f3] min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6f4e37] mb-2 font-serif px-4">
          Our Chocolate Collection
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Handcrafted with premium ingredients for the ultimate chocolate experience
        </p>
      </div>

      {/* Controls Section - Responsive Layout */}
      <div className="mb-8 sm:mb-12 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        {/* Search Bar - Full Width on Mobile */}
        <div className="relative mb-4 sm:mb-0">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search chocolates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 sm:py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] w-full text-base"
          />
        </div>

        {/* Category and Sort - Side by Side on Mobile, Inline on Desktop */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center">
          <div className="relative flex-1 sm:flex-none sm:min-w-[180px]">
            <LucideList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="pl-10 pr-8 py-3 sm:py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white w-full text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 sm:flex-none sm:min-w-[180px]">
            <BsArrowDownUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              className="pl-10 pr-8 py-3 sm:py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white w-full text-base"
            >
              <option value="default">Sort By</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12 px-4">
          <h3 className="text-xl sm:text-2xl text-[#6f4e37] mb-2">No chocolates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openProductDetails={openProductDetails}
              toggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}

      {/* Pagination - Responsive */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded bg-[#6f4e37] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Previous</span>
            </button>

            <span className="text-[#6f4e37] font-semibold text-sm sm:text-base whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded bg-[#6f4e37] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <span className="hidden sm:inline mr-2">Next</span>
              <ArrowRightCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden text-xs text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          closeProductDetails={closeProductDetails}
          toggleWishlist={toggleWishlist}
          wishlistIds={wishlistIds}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default Products;
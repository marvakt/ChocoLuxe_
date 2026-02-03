import React, { useEffect, useState } from "react";
import { adminAPI } from "../api";
import toast from "react-hot-toast";
import ProductForm from "../Components/Admin/ProductForm";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      const res = await adminAPI.getProducts();
      console.log("Fetched products:", res.data);
      // Ensure we always have an array
      const productsData = Array.isArray(res.data) ? res.data : [];
      setProducts(productsData.reverse());
    } catch (err) {
      toast.error("Failed to fetch products");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editProduct) {
        await adminAPI.updateProduct(editProduct.id, formData);
        toast.success("Product updated");
      } else {
        await adminAPI.createProduct(formData);
        toast.success("Product added");
      }
      setShowForm(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Error saving product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await adminAPI.deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };


  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen  bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="flex items-center gap-2 text-3xl font-bold mb-6 text-[#5c2c06] ml-70">
            <img src="/products.png" alt="Manage Orders" className="w-7 h-7" />
            Product Management
          </h2>
          <button
            onClick={handleAddClick}
            className="bg-[#5c2c06] hover:bg-[#3f1b04] transition px-5 py-2 text-white rounded-full font-semibold shadow-md "
          >
            + Add Product
          </button>
        </div>




        <div className="mb-6">
          <label className="block text-[#5c2c06] font-semibold mb-2 ">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-black rounded-md shadow-sm bg-white text-[#4b2e2e]"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>



        {/* Product Grid */}
        <div className="space-y-4 ">
          {currentProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white  rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-4 "
            >
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-5   ">
                  <div className="w-28 h-20 flex-shrink-0">
                    <img
                      src={p.image && p.image.startsWith('http') ? p.image : `http://localhost:8000${p.image}`}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/productsimg/default.jpg";
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-[#4b2e2e] tracking-wide">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-semibold text-amber-700">
                        ₹{p.price}
                      </span>{" "}
                      • {p.category}
                    </p>
                  </div>
                </div>


                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#4b2e2e] font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${currentPage === number
                    ? "bg-[#5c2c06] text-white"
                    : "bg-[#e8d0b4] text-[#5c2c06] hover:bg-[#dec1a1]"
                    }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        )}
      </div>


      {showForm && (
        <ProductForm
          initialData={editProduct}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;

import React, { useState, useEffect } from "react";

const ProductForm = ({ initialData, onSubmit, onClose }) => {
 const [formData, setFormData] = useState({
  name: "",
  price: "",
  image: "",
  category: "",
  description: ""  
});


  useEffect(() => {
  if (initialData) {
    setFormData({
      name: initialData.name || "",
      price: initialData.price || "",
      image: initialData.image || "",
      category: initialData.category || "",
      description: initialData.description || ""   
    });
  }
}, [initialData]);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0  bg-black/40 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded shadow-md w-96 rounded-3xl">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={4}
            />

        

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6f4e37] text-white rounded"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

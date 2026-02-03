import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const AdminProductDetails = ({ product, closeProductDetails }) => {
  if (!product) return null;

  
  const getImageSrc = (imgPath) => {
    if (!imgPath) return "/productsimg/default.jpg";

    
    if (imgPath.startsWith("http")) return imgPath;

    // Clean filename and prepend the correct folder
    const fileName = imgPath.replace(/^.*[\\/]/, "");
    return `/productsimg/${fileName}`;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={closeProductDetails}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
          >
            <AiOutlineClose className="text-gray-700 text-xl" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div>
              <img
                src={getImageSrc(product.image)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/productsimg/default.jpg";
                }}
                alt={product.name}
                className="w-full h-64 object-contain mb-4"
              />
            </div>

            
            
            <div>
              <h2 className="text-3xl font-bold text-[#5c2c06] mb-2">
                {product.name}
              </h2>

              <span className="inline-block bg-[#f3e8e3] text-[#6f4e37] text-sm px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>

              <p className="text-gray-700 mb-6">
                {product.description || "No description provided."}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#6f4e37] mb-2">
                  Details
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Price: ₹{product.price}</li>
                  <li>• Weight: {product.weight || "100g"}</li>
                  <li>
                    • Ingredients:{" "}
                    {product.ingredients || "Cocoa, Sugar, Milk"}
                  </li>
                  <li>
                    • Allergens: {product.allergens || "Contains milk"}
                  </li>
                </ul>
              </div>

              <div className="text-right">
                <button
                  onClick={closeProductDetails}
                  className="mt-4 px-5 py-2 bg-[#5c2c06] hover:bg-[#3f1b04] text-white rounded-full font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;

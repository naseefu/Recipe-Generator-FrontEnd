import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";

const FoodInventoryTest = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    expirationDate: "",
    category: "",
    notes: ""
  });

  const [inventory, setInventory] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [errors, setErrors] = useState({});

  const defaultCategories = [
    "Fruits & Vegetables",
    "Dairy",
    "Meat & Poultry",
    "Grains",
    "Beverages",
    "Snacks",
    "Condiments",
    "Custom"
  ];

  const commonFoodItems = [
    "Apple",
    "Banana",
    "Milk",
    "Bread",
    "Eggs",
    "Chicken",
    "Rice",
    "Pasta"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "Custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setFormData({ ...formData, category: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-8">
              <IoFastFoodOutline className="text-4xl text-green-500 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Food Inventory Management</h1>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-9 md:grid-cols-2 text-start">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                    Food Item Name
                  </label>
                  <input
                    list="foodSuggestions"
                    type="text"
                    name="itemName"
                    id="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border border-gray-200 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.itemName ? 'border-red-500' : ''}`}
                    aria-label="Food item name"
                  />
                  <datalist id="foodSuggestions">
                    {commonFoodItems.map((item, index) => (
                      <option key={index} value={item} />
                    ))}
                  </datalist>
                  {errors.itemName && (
                    <p className="mt-1 text-sm text-red-500">{errors.itemName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border border-gray-200 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.quantity ? 'border-red-500' : ''}`}
                    aria-label="Quantity"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expirationDate"
                    id="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border border-gray-200 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.expirationDate ? 'border-red-500' : ''}`}
                    aria-label="Expiration date"
                  />
                  {errors.expirationDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expirationDate}</p>
                  )}
                </div>
{/* <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div> */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className={`mt-1 block w-full rounded-md border border-gray-200 p-2 shadow-sm focus:border-blue-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
                    aria-label="Food category"
                  >
                    <option value="">Select a category</option>
                    {defaultCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  {showCustomInput && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter custom category"
                      className="mt-2 block w-full rounded-md border border-gray-200 p-2 mt-8 mb-8 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      aria-label="Custom category"
                    />
                  )}
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-200 p-2 resize-none shadow-sm focus:border-blue-500 sm:text-sm"
                  aria-label="Additional notes"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodInventoryTest;
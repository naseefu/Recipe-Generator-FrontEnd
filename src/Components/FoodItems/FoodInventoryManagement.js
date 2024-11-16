import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import FoodInventory from "../DashBoard/FoodInventory";
import Header from "../Commons/Header";
import ApiServices from "../../Services/ApiServices";
import { useUser } from "../Context/UserContext";

const FoodInventoryManagement = () => {
  const [formData, setFormData] = useState({
    itemname: "",
    quantity: "",
    expire: "",
    category: "",
    notes: "",
    unit:""
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
const [newErrors, setNewErrors] = useState({});
const [isError,setIsError] = useState(false)

const validateForm = () => {
  const errors = {};

  if (!formData.itemname){errors.itemname = "Item name  required" 
  setIsError(true)};
  if (!formData.quantity) {errors.quantity = "Quantity is required"
  setIsError(true);}
  if (!formData.expire) {errors.expire = "Expiration date is required";
  setIsError(true)}
  if (!formData.category && !customCategory) {errors.category = "Category is required";
  setIsError(true)}

  setNewErrors(errors); 
  if(errors){
    console.log(errors)
    return false;
  }
  else{
    return true;
  }
};

useEffect(() => {
  if (isError) { 
    console.log("Hello")
    setTimeout(()=>{
      setNewErrors(errors.itemName="",errors.quantity="",errors.expirationDate="",errors.category="")
    },3000)
  }
}, [isError]);

  const {user} = useUser()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if(user&&!validationErrors){
      console.log("Hello")
    try{

      const response = await ApiServices.addFoodItem(user.id,formData)
      console.log(response)
      window.location.reload()

    }
    catch(err){
      console.log(err.response?.data?.message || "An Error Occured")
    }
  }
    
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const quantityUnits = [
    "kg",
    "packet",
    "can",
    "bottle",
    "piece",
    "dozen",
    "box",
    "liter"
  ];

  const handleCustomCategory=(e)=>{
    setFormData({ ...formData, category: e.target.value });
  }

  return (
    <div className="min-h-screen lg:max-h-screen bg-gray-50 overflow-hidden">
      <Header/>
    <div className="inventory bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
      <div className="inventory max-w-4xl mx-auto lg:h-[calc(100vh-150px)] lg:overflow-auto pt-2 pb-2">
        <div className="bg-white rounded-lg shadow-lg ">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-8">
              <IoFastFoodOutline className="text-4xl text-green-500 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Food Inventory Management</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-9 md:grid-cols-2 text-start">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                    Food Item Name
                  </label>
                  <input
                    list="foodSuggestions"
                    type="text"
                    name="itemname"
                    id="itemName"
                    value={formData.itemname}
                    onChange={handleInputChange}
                    className={`mt-4 rounded-md block w-full h-[40px] border border-gray-100 shadow-sm focus:outline-green-500 sm:text-sm ${errors.itemname ? 'border-red-500' : ''}`}
                    aria-label="Food item name"
                  />
                  <datalist id="foodSuggestions">
                    {commonFoodItems.map((item, index) => (
                      <option key={index} value={item} />
                    ))}
                  </datalist>
                  {errors.itemname && (
                    <p className="mt-1 text-sm text-red-500">{errors.itemname}</p>
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
                    className={`mt-4 rounded-md block w-full h-[40px]  border border-gray-100 shadow-sm focus:outline-green-500 sm:text-sm ${errors.quantity ? 'border-red-500' : ''}`}
                    aria-label="Quantity"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                  )}
                </div>

              <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <div className="mt-1">
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className={`mt-4 block rounded-md w-full h-[40px]  border border-gray-100 
                  shadow-sm focus:outline-green-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
                >
                  <option value="">Select unit</option>
                  {quantityUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.quantityUnit && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantityUnit}</p>
                )}
              </div>
            </div>

                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expire"
                    id="expirationDate"
                    value={formData.expire}
                    onChange={handleInputChange}
                    className={`mt-4 rounded-md block w-full h-[40px]  border border-gray-100 shadow-sm focus:outline-green-500 sm:text-sm ${errors.expirationDate ? 'border-red-500' : ''}`}
                    aria-label="Expiration date"
                  />
                  {errors.expirationDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expirationDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className={`mt-4 block rounded-md w-full h-[40px]  border border-gray-100 shadow-sm focus:outline-green-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
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
                      onChange={(e)=>setCustomCategory(e.target.value)}
                      placeholder="Enter custom category"
                      className="mt-4 rounded-md block w-full h-[40px]  border border-gray-100 shadow-sm focus:outline-green-500 sm:text-sm"
                      aria-label="Custom category"
                    />
                  )}
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block mt-10 text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="mt-4 p-[10px] rounded-md block w-full h-[150px] resize-none border border-gray-100 shadow-sm focus:outline-green-500 sm:text-sm"
                  aria-label="Additional notes"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                  text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add Item
                </button>
              </div>
            </form>
            
            
          </div>
        </div>
      </div>
      <div className="inventory mt-10 lg:mt-2 lg:h-[calc(100vh-150px)] lg:overflow-auto">
        <FoodInventory/>
      </div>
    </div></div>
  );
};

export default FoodInventoryManagement;
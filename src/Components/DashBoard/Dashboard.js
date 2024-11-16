import React, { useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { BiCookie, BiHeart, BiScan } from "react-icons/bi";
import { MdOutlineFoodBank, MdKitchen, MdOutlineTipsAndUpdates } from "react-icons/md";
import { GiMilkCarton, GiFruitBowl, GiBreadLoaf } from "react-icons/gi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PiCookingPot } from "react-icons/pi";
import './dashboard.css'
import FoodInventory from "./FoodInventory";
import { useNavigate } from "react-router-dom";
import Header from "../Commons/Header";
import { FaHeart } from "react-icons/fa";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const wasteData = [
    { month: "Jan", saved: 0 },
    { month: "Feb", saved: 0 },
    { month: "Mar", saved: 0 },
    { month: "Apr", saved: 0 },
    { month: "May", saved: 0 },
    { month: "Jun", saved: 0 },
    { month: "Jul", saved: 0 },
    { month: "Aug", saved: 0 },
    { month: "Sep", saved: 0 },
    { month: "Oct", saved: 0 },
    { month: "Nov", saved: 7 }
  ];

  const navigate = useNavigate()


  return (
    <div className="min-h-screen">
      <Header/>
    <div className="bg-white p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col justify-between items-start gap-4 md:flex-row mb-8">
          <h1 className="text-3xl font-bold text-gray-800">FreshSaver Dashboard</h1>
          <button onClick={()=>navigate('/inventory')} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <FiPlus className="text-xl" />
            Add New Item
          </button>
        </div> 

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="grains">Grains</option>
          </select>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[calc(100vh-300px)]">
          
          <div className="inventory lg:col-span-2 lg:overflow-auto">
            <div>
              <FoodInventory/>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Food Waste Statistics</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wasteData.slice(wasteData.length-5,wasteData.length)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="saved" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="inventory space-y-8 lg:overflow-y-auto lg:h-full lg:pb-6">  

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <BiScan className="text-xl" />
                  Scan Barcode
                </button>
                <button onClick={()=>navigate('/meal-planner')} className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <MdKitchen className="text-xl" />
                  Plan Meals
                </button>
                <button onClick={()=>navigate('/recipe')} className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                  <PiCookingPot className="text-xl" />
                  Generate Recipe
                </button>
                <button onClick={()=>navigate('/favourite-recipes')} className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                  <FaHeart color="red" className="text-xl" />
                  Favourite Recipes
                </button>
                <button onClick={()=>navigate('/favourite-recipes')} className="w-full flex items-center gap-3 px-4 py-3 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors">
                  <BiCookie color="violet" className="text-xl" />
                  Quick Recipe Generator
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Storage Tips</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-600">
                  <MdOutlineTipsAndUpdates className="text-xl mt-1 text-green-600" />
                  <p className="text-sm text-left">Store apples in the refrigerator to keep them fresh longer</p>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MdOutlineTipsAndUpdates className="text-xl mt-1 text-green-600" />
                  <p className="text-sm">Keep bread in a cool, dry place</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default Dashboard;
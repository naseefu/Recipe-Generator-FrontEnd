import React, { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useUser } from '../Context/UserContext';
import ApiServices from '../../Services/ApiServices';
import axios from 'axios';

const FoodInventory = () => {

  const {user} = useUser()
  
  const [dummyFoodItems,setDummyItems] = useState([
    
  ]);

  const calculateDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (daysUntilExpiry) => {
    if (daysUntilExpiry < 0) return "expired";
    if (daysUntilExpiry <= 3) return "expiring-soon";
    return "good";
  };

  useEffect(()=>{
    
    
    const fetchAllFoodItems=async()=>{

      try{

        const response = await ApiServices.getAllFoodItems(user&&user.id);
        
        console.log(response.foodInventoryDTOs);

        setDummyItems(response.foodInventoryDTOs)

      }
      catch(err){

        console.log(err.response?.data?.message || "An error occured")

      }
  
    }
    fetchAllFoodItems()
  },[user&&user])


  



  return (
    <div className="bg-white rounded-xl mb-10 shadow-sm p-6 border border-gray-200 ">
              <h2 className="text-xl font-semibold mb-4">Food Inventory</h2>
              {dummyFoodItems.length>0?<div className="space-y-4">
                {dummyFoodItems.map((item) => {
                  const daysUntilExpiry = calculateDaysUntilExpiry(item.expire);
                  const status = getExpiryStatus(daysUntilExpiry);

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center p-4 rounded-lg border ${status === "expired" ? "bg-gray-100 border-gray-200" : status === "expiring-soon" ? "bg-red-50 border-red-200" : "bg-white border-gray-200"}`}
                    >
                      <img
                        src={`${item.imgurl}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-800">{item.itemname}</h3>
                        <p className="text-sm text-gray-400">{item.quantity} x {item.unit}</p>
                        <p className={`text-sm ${status === "expired" ? "text-gray-500" : status === "expiring-soon" ? "text-red-500" : "text-green-500"}`}>
                          {status === "expired" ? "Expired" : `${daysUntilExpiry} days until expiry`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <FiEdit2 />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>:
              <div className='m-[60px] ml-0 mr-0 text-gray-500'>
                <p>No Food Items In The Food Inventory</p>  
              </div>}
            </div>
  )
}

export default FoodInventory

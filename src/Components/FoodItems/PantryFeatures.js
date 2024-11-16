import React from "react";
import { FaBoxOpen, FaBell, FaBook, FaChartBar, FaListUl } from "react-icons/fa";

const PantryFeatures = () => {
  const features = [
    {
      icon: <FaBoxOpen className="text-2xl text-gray-300" />,
      title: "Easy Pantry Management",
      description: "Log items by scanning barcodes or entering them manually, and categorize them for easy organization."
    },
    {
      icon: <FaBell className="text-2xl text-gray-300" />,
      title: "Smart Reminders",
      description: "Receive alerts as items approach their expiration date, so you can use them before it's too late."
    },
    {
      icon: <FaBook className="text-2xl text-gray-300" />,
      title: "Customizable Recipes",
      description: "Get meal suggestions based on what's in your pantry, saving time and making cooking enjoyable."
    },
    {
      icon: <FaChartBar className="text-2xl text-gray-300" />,
      title: "Insightful Reports",
      description: "Track your food usage and waste patterns over time, helping you become a smarter, more sustainable shopper."
    },
    {
      icon: <FaListUl className="text-2xl text-gray-300" />,
      title: "Interactive Shopping Lists",
      description: "Create lists based on what's running low, ensuring you only buy what you need."
    }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-start p-8 font-bold text-4xl lg:text-6xl">Key Features</h1>
      <div className="p-8 grid gap-6 lg:grid-cols-2 md:gap-8">
        {features.map((feature, index) => (
          <div
            key={index} style={{minHeight:"200px",alignItems:'center',display:'flex'}}
            className="mb-6 p-4 border-l-4 border-gray-200 bg-white rounded-r-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantryFeatures;
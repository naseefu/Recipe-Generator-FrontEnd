import React, { useState } from "react";
import { FaLeaf, FaHeart, FaPhone, FaMobileAlt, FaRegListAlt, FaUserPlus } from "react-icons/fa";

const CommunityComponent = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const steps = [
    {
      icon: <FaMobileAlt className="text-4xl text-blue-600" />,
      title: "Create Your Pantry",
      description: "Add your items by scanning barcodes or typing in the details"
    },
    {
      icon: <FaUserPlus className="text-4xl text-red-500" />,
      title: "Create Account",
      description: "Sign up and set your preferences for a personalized experience"
    },
    {
      icon: <FaRegListAlt className="text-4xl text-green-400" />,
      title: "Start Tracking",
      description: "Begin logging your food items and reduce waste instantly"
    }
  ];

  const userStories = [
    {
      name: "Sarah Johnson",
      image: "images.unsplash.com/photo-1438761681033-6461ffad8d80",
      story: "FreshSaver helped me reduce my food waste by 70%! It's amazing!"
    },
    {
      name: "Michael Chen",
      image: "images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      story: "The app is intuitive and has saved me money on groceries."
    },
    {
      name: "Emma Davis",
      image: "images.unsplash.com/photo-1544005313-94ddf0286df2",
      story: "Best decision ever! My kitchen is now perfectly organized."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      {/* Community Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">Join the Zervings Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
              <FaLeaf className="mx-auto text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reduce Waste</h3>
              <p className="text-gray-600">Track your food and minimize waste effectively</p>
            </div>
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
              <FaHeart className="mx-auto text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600">Cut down on grocery expenses</p>
            </div>
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
              <FaPhone className="mx-auto text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Get Started in 3 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Take Control Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Take Control of Your Kitchen Today</h2>
          <p className="text-xl text-black mb-8">Start your journey towards a waste-free lifestyle</p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition duration-300">
            Download Zervings
          </button>
        </div>
      </div>

      {/* User Stories Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">User Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userStories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
                onClick={() => {
                  setSelectedStory(story);
                  setIsStoryModalOpen(true);
                }}
              >
                <img
                  src={`https://${story.image}`}
                  alt={story.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
                <p className="text-gray-600">{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">Need Help?</h2>
          <p className="text-xl text-gray-600 mb-8">Our support team is here for you 24/7</p>
          <div className="inline-flex items-center justify-center space-x-4">
            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition duration-300">
              Contact Support
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 border border-black">
              FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {isStoryModalOpen && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full mx-4">
            <img
              src={`https://${selectedStory.image}`}
              alt={selectedStory.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-2xl font-semibold mb-4 text-center">{selectedStory.name}</h3>
            <p className="text-gray-600 text-center mb-6">{selectedStory.story}</p>
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition duration-300 mx-auto block"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityComponent;
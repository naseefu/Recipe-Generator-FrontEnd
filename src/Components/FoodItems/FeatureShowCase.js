import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaLeaf, FaPiggyBank } from "react-icons/fa";
import './Food.css'

const PerfectForSection = () => {
  const features = [
    {
      title: "Families",
      description: "Keep track of everyone's favorite foods and manage household grocery shopping with ease.",
      icon: FaUsers,
      bgImage: "images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Meal Planners",
      description: "Plan meals around ingredients you already have, reducing waste and saving time.",
      icon: FaCalendarAlt,
      bgImage: "images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Eco-Conscious Individuals",
      description: "Reduce your carbon footprint by cutting down on food waste and making sustainable choices.",
      icon: FaLeaf,
      bgImage: "images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Budget Shoppers",
      description: "Get the most value out of every grocery trip by minimizing spoilage and unnecessary purchases.",
      icon: FaPiggyBank,
      bgImage: "images.pexels.com/photos/14820413/pexels-photo-14820413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="feature flex flex-col items-center justify-center bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-5"
        >
          Zervings is Perfect For:
        </motion.h2>
        <div className="w-44 h-1 bg-white mx-auto rounded-full mb-12"></div>

        <div className="featuress grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" style={{gridTemplateColumns:width>1600&&'1fr 1fr 1fr 1fr',gap:width>1500&&'3rem'}}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="perfectcard h-full rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{width:"90%",minWidth:"300px",maxWidth:"450px",margin:"0 auto"}}>
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://${feature.bgImage})`
                  }}
                >
                  {/* <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                    <feature.icon className="text-white text-5xl" />
                  </div> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfectForSection;
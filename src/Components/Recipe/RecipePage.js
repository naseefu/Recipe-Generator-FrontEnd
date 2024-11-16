import React, { useEffect, useState } from "react";
import { FiSearch, FiHeart, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import Header from "../Commons/Header";
import { useUser } from "../Context/UserContext";
import ApiServices from "../../Services/ApiServices";
import LoadingBar from "./LoadingBar";
import SavePopup from "../Commons/SavePopup";
import './meal.css'

const RecipePage = () => {
  const [recipes,setRecipes] = useState([
    
  ]);

  const {user} = useUser()

  const [loading,setLoading] = useState(false)

  useEffect(()=>{
  
  
    const fetchAllSuggestions=async()=>{
      setRecipes([])
      setLoading(true)
      try{
        const response = await ApiServices.getFoodSuggestion(user.id)
        setRecipes(response.recipes)
        const newCategories = response.recipes
        .map(recipe => recipe.category)  // Extract category from each recipe
        .filter((category, index, self) => self.indexOf(category) === index); // Ensure unique categories
        setCateg(prevCategories => [
        ...prevCategories,
        ...newCategories.filter(category => !prevCategories.includes(category))
        ]);
        const newCuisines = response.recipes
        .map(recipe => recipe.cuisine)  // Extract cuisine from each recipe
        .filter((cuisine, index, self) => self.indexOf(cuisine) === index); // Ensure unique cuisines
        setCui(prevCuisine => [
        ...prevCuisine,
        ...newCuisines.filter(cuisine => !prevCuisine.includes(cuisine))
        ]);
        setLoading(false)
      }
      catch(err){
        console.log(err.response?.data?.message || "An error occured")
        setLoading(false)
      }
    }
      if(user){
    fetchAllSuggestions()}

  },[user&&user])


  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [cuisines,setCui] = useState(["All", "Italian", "Indian", "American", "Chinese", "Mexican"]);
  const [categories,setCateg] = useState(["All", "Main Course", "Appetizer", "Dessert", "Soup", "Salad"]);

  

  const handleSaveRecipe = async(n,i,s,t,cu,c,img) => {
    setSavedRecipes((prev) =>
      prev.includes(n) ? prev.filter((recipeId) => recipeId !== n) : [...prev, n]
    );
    try{

      const response = await ApiServices.saveRecipe({recipename:n,ingredients:i,stepstocreaterecipe:s,time:t,cuisine:cu,category:c,imgurl:img},user.id)
      console.log(response)
      setIsOpen(true)

    }
    catch(err){
      console.log(err.response?.data?.message|| "An error occured")
    }
  };




  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.recipename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCuisine && matchesCategory;
  });

  const [isOpen,setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <SavePopup isOpen={isOpen} setIsOpen={setIsOpen}/>

    {loading?<div className="min-h-[600px]  flex flex-col justify-center"><LoadingBar/></div>:<div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Recipe Suggestions</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-[100%] pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full md:w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            <select
              className="w-full md:w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-xl">No recipes found matching your criteria.</p>
            <p className="mt-5">If this is a mistake, <span className="text-gray-500 cursor-pointer" onClick={()=>window.location.reload()}>Try Reloading</span></p>
          </div>
        ) : (
          <div className="sidebars grid grid-cols-1 lg:max-h-[calc(100vh-380px)] lg:overflow-y-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src={`${recipe.imgurl}`}
                  alt={recipe.recipename}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1635321593217-40050ad13c74";
                  }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{recipe.recipename}</h2>
                    <button
                      disabled={savedRecipes.includes(recipe.recipename)}
                      onClick={() => handleSaveRecipe(recipe.recipename,recipe.ingredients,recipe.stepstocreaterecipe,recipe.time,recipe.cuisine,recipe.category,recipe.imgurl)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      style={{cursor:savedRecipes.includes(recipe.recipename)&&'not-allowed'}}
                      aria-label={savedRecipes.includes(recipe.recipename) ? "Unsave recipe" : "Save recipe"}
                    >
                      <FiHeart
                        className={savedRecipes.includes(recipe.recipename) ? "fill-current text-red-500" : ""}
                      />
                    </button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {recipe.cuisine}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {recipe.time}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="View recipe details"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="sidebars bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={`${selectedRecipe.imgurl}`}
                  alt={selectedRecipe.recipename}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1635321593217-40050ad13c74";
                  }}
                />
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  aria-label="Close recipe details"
                  
                >
                  <FiX className="text-gray-800" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedRecipe.recipename}</h2>
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {selectedRecipe.cuisine}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {selectedRecipe.time}
                  </span>
                </div>
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-semibold mb-2 text-left">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1 text-left">
                    {Object.entries(selectedRecipe.ingredients).map(([ingredient, quantity]) => (
                      <li key={1} className="text-gray-700">{ingredient} : {quantity}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                   {Object.values(selectedRecipe.stepstocreaterecipe).map((step, stepIndex) => (
                            <li className="text-gray-700 whitespace-pre-line" key={stepIndex}>{step}</li>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>}</div>
  );
};

export default RecipePage;
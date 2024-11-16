import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const RecipeGenerator = () => {
  const [recipeName, setRecipeName] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateRecipe = () => {
    const ingredientList = ingredients.split(',').map(item => item.trim());
    const stepList = steps.split('.').map(item => item.trim()).filter(item => item);

    const newRecipe = {
      name: recipeName,
      duration,
      image,
      ingredients: ingredientList,
      steps: stepList,
    };
    
    setRecipe(newRecipe);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Generator</h1>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Recipe Name" 
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)} 
          className="border p-2 rounded w-full mb-2"
        />
        <input 
          type="text" 
          placeholder="Duration (e.g., 30 minutes)" 
          value={duration}
          onChange={(e) => setDuration(e.target.value)} 
          className="border p-2 rounded w-full mb-2"
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={image}
          onChange={(e) => setImage(e.target.value)} 
          className="border p-2 rounded w-full mb-2"
        />
        <textarea 
          placeholder="Ingredients (comma separated)" 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)} 
          className="border p-2 rounded w-full mb-2"
        />
        <textarea 
          placeholder="Steps (separate with periods)" 
          value={steps}
          onChange={(e) => setSteps(e.target.value)} 
          className="border p-2 rounded w-full mb-2"
        />
      </div>

      <button 
        onClick={handleGenerateRecipe} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Recipe
      </button>

      {recipe && (
        <div className="mt-4">
          <div 
            className="border rounded-lg p-4 cursor-pointer" 
            onClick={() => setIsOpen(true)}
          >
            <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover rounded" />
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p>{recipe.duration}</p>
          </div>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6">
                <Dialog.Title className="text-lg font-bold">{recipe.name}</Dialog.Title>
                <h3 className="mt-2 font-semibold">Ingredients:</h3>
                <ul className="list-disc pl-5">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h3 className="mt-2 font-semibold">Steps:</h3>
                <ol className="list-decimal pl-5">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
                  }

  export default RecipeGenerator
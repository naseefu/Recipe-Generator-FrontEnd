import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiPlusCircle, FiClock, FiCalendar, FiMenu } from "react-icons/fi";
import Header from "../Commons/Header";
import { useUser } from "../Context/UserContext";
import ApiServices from "../../Services/ApiServices";
import './meal.css'
import axios from "axios";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const MealPlanner = () => {
  const [recipes,setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  console.log(mealPlan)

  const [initialRecipes,setInitialRec] = useState([
  ]);

  const {user} = useUser()

  useEffect(()=>{
    
    const fetchAllMeals=async()=>{

      try{

        const response = await ApiServices.getMeal(user&&user.id)
        console.log(response.meal.meals)
        setMealPlan(response.meal.meals)

      }
      catch(err){

        console.log(err.response?.data?.message || "An error occured")

      }

    }
    fetchAllMeals()

  },[user&&user])

  useEffect(()=>{

    const fetchAllRecipes = async()=>{

      try{

        const response = await ApiServices.getAllRecipe(user&&user.id)
        setRecipes(response.recipes)

      }
      catch(err){

        console.log(err.response?.data?.message || "An error occured")

      }

    }
    fetchAllRecipes()


  },[user&&user])


  const onDragEnd = async(result) => {
    if (!result.destination) return;

    const day = result.destination.droppableId.split("-")[0];
    const type = result.destination.droppableId.split("-")[1];

    const draggedRecipe = recipes.find(recipe => recipe.id.toString() === result.draggableId);

    console.log(draggedRecipe.id,day,type)

    if(user){

      try{

        const response = await ApiServices.addMeal(user.id,draggedRecipe.id,{day,type})
        console.log(response)
      }
      catch(err){

        console.log(err.response?.data?.message || "An error occured")

      }

    }
    if (draggedRecipe) {
      setMealPlan(prev => ({
        ...prev,
        [result.destination.droppableId]: draggedRecipe
      }));
    }
  };

  const StrictModeDroppable = ({children, ...props}) => {
    const [enabled, setEnabled] = useState(false);
    React.useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));
      return () => {
        cancelAnimationFrame(animation);
        setEnabled(false);
      };
    }, []);
    if (!enabled) return null;
    return <Droppable {...props}>{children}</Droppable>;
  };

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gray-50">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          {<div className={`sidebars ${isSidebarOpen ? "w-80" : "w-0"} transition-all duration-300 bg-white shadow-lg h-screen max-h-screen overflow-y-auto fixed left-0 top-0`}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Recipe Library</h2>
              <StrictModeDroppable droppableId="recipe-library">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {recipes.length>0&&recipes.map((recipe, index) => (
                      <Draggable key={recipe.id} draggableId={recipe.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={`${recipe.imgurl}`}
                                alt={recipe.recipename}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-left">{recipe.recipename}</h3>
                                <div className="flex items-center text-gray-500 text-sm">
                                  <FiClock className="mr-1" />
                                  {recipe.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
          </div>}

          <div className={`${recipes.length>0&&"flex-1"} ${isSidebarOpen ? "ml-80" : "ml-0"} transition-all duration-300`}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Toggle sidebar"
                >
                  <FiMenu size={24} />
                </button>
                <h1 className="text-3xl font-bold">Weekly Meal Planner</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <FiPlusCircle className="mr-2" /> Add Recipe
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {daysOfWeek.map((day) => (
                  <div key={day.toLowerCase()} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold">{day}</h2>
                      <FiCalendar className="text-gray-500" />
                    </div>
                    {mealTypes.map((mealType) => (
                      <StrictModeDroppable key={`${day.toLowerCase()}-${mealType.toLowerCase()}`} droppableId={`${day.toLowerCase()}-${mealType.toLowerCase()}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`p-3 mb-3 rounded-lg transition-colors ${snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"}`}
                          >
                            <h3 className="text-sm font-medium mb-2 text-gray-600">{mealType}</h3>
                            {mealPlan[`${day.toLowerCase()}-${mealType.toLowerCase()}`] ? (
                              
                              <div className="bg-white p-2 rounded shadow-sm">
                              
                                <img
                                  src={`${mealPlan[`${day.toLowerCase()}-${mealType.toLowerCase()}`].imgurl}`}
                                  alt={mealPlan[`${day.toLowerCase()}-${mealType.toLowerCase()}`].recipename}
                                  className="w-full h-20 object-cover rounded mb-2"
                                />
                                <p className="text-sm">{mealPlan[`${day.toLowerCase()}-${mealType.toLowerCase()}`].recipename}</p>
                              </div>
                            ) : (
                              <div className="h-20 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded">
                                Drag recipe here
                              </div>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </StrictModeDroppable>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div></div>
  );
};

export default MealPlanner;
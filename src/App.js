import logo from './logo.svg';
import './App.css';
import Tailwindtest from './Tailwindtest';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import Dashboard from './Components/DashBoard/Dashboard';
import RecipePage from './Components/Recipe/RecipePage';
import MealPlanner from './Components/Recipe/MealPlanner';
import FoodInventoryManagement from './Components/FoodItems/FoodInventoryManagement';
import Register from './Components/Auth/Register';
import Signin from './Components/Auth/Signin';
import FavouriteRecipePage from './Components/Recipe/FavouriteRecipe';
import RecipeGenerator from './Components/Test/Test';
import CohereChat from './Components/Server/AiServices';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/inventory" element={<FoodInventoryManagement />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/favourite-recipes' element={<FavouriteRecipePage/>}/>
          <Route path='/test' element={<CohereChat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

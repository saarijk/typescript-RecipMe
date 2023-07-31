import { Meal, SearchResult, idkMeal } from "@/types/Recipe"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SelectedRecipe from "@/components/SelectedRecipe"
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {

  const allRecipesUrl = "https://akportfolioapi.azurewebsites.net/recipe";
  const searchUrl = "https://akportfolioapi.azurewebsites.net/recipe/";
  const [allMeals, setAllMeals] = useState<idkMeal>({meals: []});
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [input, setInput] = useState<string>("");

  const foundRecipesRef = useRef<HTMLDivElement>(null);

  const [isRecipeVisible, setIsRecipeVisible] = useState<boolean>(false);

  const handleCloseRecipe = () => {
    setSelectedRecipe(null); // Set selectedRecipe to null to hide the selected recipe
  };


  useEffect(() => {
    if (foundRecipesRef.current) {
      foundRecipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMeals]);

  async function showRecipe(mealName: string) {
    try {
      const encodedName = encodeURIComponent(mealName);
      const fullRecipeUrl = searchUrl + encodedName;
      const response = await axios.get<idkMeal>(fullRecipeUrl);
  
      if (response.data && response.data.meals.length > 0) {
        setSelectedRecipe(response.data.meals[0]);
        setIsRecipeVisible(true);
      } else {
        console.error("Recipe not found");
      }
    } catch (error) {
      console.error("Error fetching the recipe:", error);
    }
  }

  async function searchRecipes() {
    const found = await axios.get<idkMeal>(`${allRecipesUrl}/${input}`);
    setAllMeals(found.data);
    console.log("URL = " + `${allRecipesUrl}/${input}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<idkMeal>(allRecipesUrl);
        console.log("response: " + response.data);
        setAllMeals(response.data);
        console.log("allMeals: "+ allMeals);
      } catch (error) {
        console.error(error);
      }
    }; 
    fetchData();
  }, []);

    return (
      <>
        {selectedRecipe && isRecipeVisible && (
        <SelectedRecipe selectedRecipe={selectedRecipe} onClose={handleCloseRecipe} />
      )}
        <motion.h1 
          ref={foundRecipesRef} 
          className="text-primary-500 text-center text-[100px] pt-20 mb-[100px] font-dancing drop-shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once:true, amount:1}}
          transition={{delay:0.2, duration:1.5}}
          variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1}
          }}
          >
            Recipe Explorer
          </motion.h1>
        
          <div className="flex justify-center">
          <div className="recipe-list bg-gray-20 w-5/6 flex flex-wrap justify-center gap-8">
            <AnimatePresence>
              {allMeals.meals.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="recipe-card"
                >
                  <motion.img
                    src={meal.strMealThumb}
                    alt={meal.name}
                    className="recipe-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                  <motion.h2
                    className="w-[150px] overflow-auto text-center hover:text-primary-500 hover:cursor-pointer"
                    onClick={() => showRecipe(meal.strMeal)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {meal.strMeal}
                  </motion.h2>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        
        <motion.div className="mb-6 flex flex-col items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once:true, amount:1}}
          transition={{delay:5, duration:1}}
          variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1}
          }}
        >
          <p className="text-3xl text-primary-500 mt-[25px]">Didn't find what you're looking for?<br/></p>
          <p className="mb-[25px]">Try searching for your perfect recipe below!</p>
        <input
            type="text"
            id="recipes"
            className="bg-gray-50 border border-primary-300 text-black text-sm rounded-lg focus:outline-none focus:border-primary-500 block w-1/3 p-2.5"
            style={{ boxShadow: 'none' }}
            onChange={(inputTerm) => setInput(inputTerm.target.value)}
          />
          <button className="bg-primary-500 text-white rounded-md p-2 mt-3 hover:bg-primary-300"
          onClick={() => {
            const userInput = (
              document.getElementById("recipes") as HTMLInputElement
            )?.value;
            searchRecipes();
          }}
          >Search</button>
          </motion.div>
      </>
    )
}

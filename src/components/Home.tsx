import { Meal, SearchResult, idkMeal } from "@/types/Recipe"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SelectedRecipe from "@/components/SelectedRecipe"

export default function Home() {

  const allRecipesUrl = "https://akportfolioapi.azurewebsites.net/recipe";
  const searchUrl = "https://akportfolioapi.azurewebsites.net/recipe/";
  const [allMeals, setAllMeals] = useState<idkMeal>({meals: []});
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [input, setInput] = useState<string>("");

  const foundRecipesRef = useRef<HTMLDivElement>(null);

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
        <div className="mb-6 flex flex-col items-center justify-center ">
          <input
            type="text"
            id="recipes"
            className="bg-gray-50 border border-primary-300 text-black text-sm rounded-lg focus:outline-none focus:border-primary-500 block w-5/6 p-2.5"
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
        </div>
        {selectedRecipe && <SelectedRecipe selectedRecipe={selectedRecipe} />}
        <h1 ref={foundRecipesRef} className="text-primary-500 text-center text-3xl pt-20 mb-10">Browse Recipes</h1>
        <div className="flex justify-center"> 
          <div className="recipe-list bg-gray-20 w-5/6 flex flex-wrap justify-center gap-8"> 
            {allMeals.meals.map((meal, index) => (
              <div key={index} className="recipe-card">
                <img src={meal.strMealThumb} alt={meal.name} className="recipe-image" />
                <h2
                  className="w-[150px] overflow-auto text-center hover:text-primary-500 hover:cursor-pointer"
                  onClick={() => showRecipe(meal.strMeal)}
                >
                  {meal.strMeal}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </>
    )
}

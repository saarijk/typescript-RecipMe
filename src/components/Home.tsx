import { Meal, SearchResult, idkMeal } from "@/types/Recipe"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const allRecipesUrl = "https://akportfolioapi.azurewebsites.net/recipe";
  const searchUrl = "https://akportfolioapi.azurewebsites.net/recipe/";
  const [allMeals, setAllMeals] = useState<idkMeal>({meals: []});
  let [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [check, setCheck] = useState<string | null>(null);

  function findRecipes(elementToFind: string) {
    const updatedSearchResults: SearchResult[] = [];
  
    for (let i = 0; i < allMeals?.meals.length; i++) {
      if (allMeals?.meals[i].strCategory.toLowerCase() === elementToFind.toLowerCase()) {
        // Add to searchResults array
        updatedSearchResults.push({
          name: allMeals.meals[i].strMeal,
          image: allMeals.meals[i].strMealThumb,
        });
      }
      // Search by ingredient
      for (let j = 1; j <= 20; j++) {
        const suffix = "strIngredient" + j;
        if (allMeals?.meals[i][suffix.toLowerCase()] === elementToFind.toLowerCase()) {
          // Add to searchResults array
          updatedSearchResults.push({
            name: allMeals.meals[i].strMeal,
            image: allMeals.meals[i].strMealThumb,
          });
          break; // Exit the loop since the ingredient is found
        }
      }
    }
  
    setSearchResults(updatedSearchResults);
    console.log(searchResults);
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
          />
          <button className="bg-primary-500 text-white rounded-md p-2 mt-3 hover:bg-primary-300"
          onClick={() => {
            const userInput = (
              document.getElementById("recipes") as HTMLInputElement
            )?.value;
            setCheck(userInput);
            findRecipes(userInput);
          }}
          >Search</button>
          <p>You searched for:</p>
          {check !== null && check !== undefined && <p>{check} with {searchResults.length} results!</p>}
        </div>
      </>
    )
}

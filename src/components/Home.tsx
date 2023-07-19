import { Meal, SearchResult, idkMeal } from "@/types/Recipe"
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {

  const allRecipesUrl = "https://akportfolioapi.azurewebsites.net/recipe";
  const searchUrl = "https://akportfolioapi.azurewebsites.net/recipe/";
  const [allMeals, setAllMeals] = useState<idkMeal>({meals: []});
  let [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [check, setCheck] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const selectedRecipeRef = useRef<HTMLDivElement>(null);

  function findRecipes(elementToFind: string) {
    const updatedSearchResults: SearchResult[] = [];
    let foundName = false;
  
    for (let i = 0; i < allMeals?.meals.length; i++) {
      foundName = searchWithinName(elementToFind, i);
      if (foundName) {
        updatedSearchResults.push({
          name: allMeals.meals[i].strMeal,
          image: allMeals.meals[i].strMealThumb,
        })
      }
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

    function searchWithinName(nameToFind:string, index:number) :boolean {
        const stringInArray = allMeals.meals[index];
        const wordsInString = stringInArray.split(" ");
    
        for (let j = 0; j < wordsInString.length; j++) {
          if (wordsInString[j].toLowerCase() === nameToFind.toLowerCase()) {
            return true; // Word found in the array
          }
        }
      return false;
    }
  
    setSearchResults(updatedSearchResults);
    console.log(searchResults);
  }

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

  useEffect(() => {
    // Scroll to the selectedRecipe section when it is updated
    if (selectedRecipeRef.current) {
      selectedRecipeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRecipe]);

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
        {selectedRecipe ? (
          <div ref={selectedRecipeRef} className="flex flex-col items-center">
            <h1 className="text-3xl text-center text-primary-500 mb-3 mt-[100px]">{selectedRecipe.strMeal}</h1>
            <img className="block mx-auto mb-3" src={selectedRecipe.strMealThumb}/>
            <h2 className="text-gray-500 text-center text-xl mb-3">Ingredients</h2>
            <p className="text-center">{selectedRecipe.strMeasure1} {selectedRecipe.strIngredient1}</p>
            <p className="text-center">{selectedRecipe.strMeasure2} {selectedRecipe.strIngredient2}</p>
            <p className="text-center">{selectedRecipe.strMeasure3} {selectedRecipe.strIngredient3}</p>
            <p className="text-center">{selectedRecipe.strMeasure4} {selectedRecipe.strIngredient4}</p>
            <p className="text-center">{selectedRecipe.strMeasure5} {selectedRecipe.strIngredient5}</p>
            <p className="text-center">{selectedRecipe.strMeasure6} {selectedRecipe.strIngredient6}</p>
            <p className="text-center">{selectedRecipe.strMeasure7} {selectedRecipe.strIngredient7}</p>
            <p className="text-center">{selectedRecipe.strMeasure8} {selectedRecipe.strIngredient8}</p>
            <p className="text-center">{selectedRecipe.strMeasure9} {selectedRecipe.strIngredient9}</p>
            <p className="text-center">{selectedRecipe.strMeasure10} {selectedRecipe.strIngredient10}</p>
            <p className="text-center">{selectedRecipe.strMeasure11} {selectedRecipe.strIngredient11}</p>
            <p className="text-center">{selectedRecipe.strMeasure12} {selectedRecipe.strIngredient12}</p>
            <p className="text-center">{selectedRecipe.strMeasure13} {selectedRecipe.strIngredient13}</p>
            <p className="text-center">{selectedRecipe.strMeasure14} {selectedRecipe.strIngredient14}</p>
            <p className="text-center">{selectedRecipe.strMeasure15} {selectedRecipe.strIngredient15}</p>
            <p className="text-center">{selectedRecipe.strMeasure16} {selectedRecipe.strIngredient16}</p>
            <p className="text-center">{selectedRecipe.strMeasure17} {selectedRecipe.strIngredient17}</p>
            <p className="text-center">{selectedRecipe.strMeasure18} {selectedRecipe.strIngredient18}</p>
            <p className="text-center">{selectedRecipe.strMeasure19} {selectedRecipe.strIngredient19}</p>
            <p className="text-center">{selectedRecipe.strMeasure20} {selectedRecipe.strIngredient20}</p>
            <h2 className="text-gray-500 text-center text-xl mb-3 mt-3">Instructions</h2>
            <p className="w-3/4 text-justify flex-grow">{selectedRecipe.strInstructions}</p>
          </div>
        ) : null}
        <h1 className="text-primary-500 text-center text-3xl pt-20 mb-10">All Recipes</h1>
        <div className="flex justify-center"> 
          <div className="recipe-list bg-gray-20 w-5/6 flex flex-wrap justify-center gap-8"> 
            {allMeals.meals.map((meal, index) => (
              <div key={index} className="recipe-card">
                <img src={meal.strMealThumb} alt={meal.name} className="recipe-image" />
                <h2
                  className="w-[150px] text-center hover:text-primary-500 hover:cursor-pointer"
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

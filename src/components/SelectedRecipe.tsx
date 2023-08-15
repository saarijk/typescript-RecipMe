import { Meal, SearchResult } from "@/types/Recipe";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface SelectedRecipeProps {
  selectedRecipe: Meal | null;
  onClose: () => void; // prop to hand closing
  addToFavorites: (recipe: SearchResult) => void;
}

const SelectedRecipe: React.FC<SelectedRecipeProps> = ({ 
    selectedRecipe, 
    onClose,
    addToFavorites
  }) => {
  const selectedRecipeRef = useRef<HTMLDivElement>(null);
  const handleAddToFavorites = () => {
    if (selectedRecipe) {
      addToFavorites({ name: selectedRecipe.strMeal, image: selectedRecipe.strMealThumb });
    }
  };

  useEffect(() => {
    if (selectedRecipeRef.current) {
      selectedRecipeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRecipe]);
  if (!selectedRecipe) {
    return null;
  }

  return (
    <>
    <div ref={selectedRecipeRef} className="flex flex-col items-center">
    <div className="grid justify-items-end w-5/6 mt-20">
      <button className="flex items-center py-2 text-black rounded" onClick={onClose}>
        <XMarkIcon className="w-7 h-7" />
      </button>
    </div>
      <h1 ref={selectedRecipeRef} className="text-4xl text-center text-primary-500 mb-3 font-dancing drop-shadow-md">{selectedRecipe.strMeal}</h1>
      <img className="block mx-auto mb-3" src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
      <h2 className="text-gray-500 text-center text-xl mb-3 font-montserrat">Ingredients</h2>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure1} {selectedRecipe.strIngredient1}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure2} {selectedRecipe.strIngredient2}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure3} {selectedRecipe.strIngredient3}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure4} {selectedRecipe.strIngredient4}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure5} {selectedRecipe.strIngredient5}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure6} {selectedRecipe.strIngredient6}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure7} {selectedRecipe.strIngredient7}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure8} {selectedRecipe.strIngredient8}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure9} {selectedRecipe.strIngredient9}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure10} {selectedRecipe.strIngredient10}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure11} {selectedRecipe.strIngredient11}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure12} {selectedRecipe.strIngredient12}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure13} {selectedRecipe.strIngredient13}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure14} {selectedRecipe.strIngredient14}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure15} {selectedRecipe.strIngredient15}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure16} {selectedRecipe.strIngredient16}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure17} {selectedRecipe.strIngredient17}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure18} {selectedRecipe.strIngredient18}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure19} {selectedRecipe.strIngredient19}</p>
        <p className="text-center font-montserrat">{selectedRecipe.strMeasure20} {selectedRecipe.strIngredient20}</p>
      <h2 className="text-gray-500 text-center text-xl mb-3 mt-3 font-montserrat">Instructions</h2>
      <p className="w-3/4 text-justify flex-grow font-montserrat">{selectedRecipe.strInstructions}</p>
      <button 
        className="font-montserrat mt-[60px] text-md p-3 px-4 rounded-full bg-primary-100 drop-shadow-md hover:bg-primary-300 hover:text-white border-primary-500"
        onClick={handleAddToFavorites}
      >
        Add to Favourites</button>
    </div>
    </>
  );
};

export default SelectedRecipe;
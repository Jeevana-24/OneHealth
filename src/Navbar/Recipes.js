import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard'; // Update the path as needed

function Recipes() {
  // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API ID and Key.
  const APP_ID = 'a61a4591';
  const APP_KEY = 'fb37a19a3eb7a00a13c023a46c763000';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('salad'); // Default search term

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    };

    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={getSearch} className="flex items-center justify-center mb-4">
        <input
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="Search for recipes..."
        />
        <button
          className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Search
        </button>
      </form>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe.uri} recipe={recipe.recipe} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;

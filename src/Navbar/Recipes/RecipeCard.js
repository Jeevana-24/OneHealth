import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="max-w-sm w-full lg:max-w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <img
            className="w-full h-48 object-cover object-center"
            src={recipe.image}
            alt={recipe.label}
          />
          <div className="p-6">
            <h3 className="text-xl text-gray-900 font-bold mb-2">{recipe.label}</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <a
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-indigo-500 hover:text-indigo-600"
            >
              View Full Recipe
            </a>
          </div>
        </div>
      );
};

export default RecipeCard;

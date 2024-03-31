import React from 'react';

function SearchComponent({ searchCourse, courseSearchUserFunction }) {
  return (
    <header className="bg-sky-500 text-black p-5 text-center">
      <h1 className="text-4xl font-bold mb-4">Health Wrap Shopping Cart</h1>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search for Products..."
          value={searchCourse}
          onChange={courseSearchUserFunction}
          className="w-full p-2 border-2 border-green-800 rounded-lg focus:outline-none focus:border-green-400"
        />
      </div>
    </header>
  );
}

export default SearchComponent;

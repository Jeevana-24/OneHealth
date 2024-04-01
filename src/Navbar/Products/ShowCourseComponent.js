import React from 'react';

function ShowCourseComponent({ products, addCourseToCartFunction }) {
  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-lg">Sorry, no matching products found.</p>
      ) : (
        products.map((product) => (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" key={product.id}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-lg mb-4">Price: ₹{product.price}</p>
            <button
              className="bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() => addCourseToCartFunction(product)}
            >
              Add to Shopping Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowCourseComponent;

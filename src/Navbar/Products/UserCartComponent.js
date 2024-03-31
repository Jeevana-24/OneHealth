import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt,faPlus, 
    faMinus,  } from '@fortawesome/free-solid-svg-icons';

function UserCartComponent({
  cartCourses,
  updateItemQuantity,
  deleteCourseFromCartFunction,
  totalAmountCalculationFunction,
  setCartCourses,
}) {
  return (
    <div className={`w-full md:w-1/3 p-4 ${cartCourses.length > 0 ? 'block' : 'hidden'}`}>
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
      {cartCourses.length === 0 ? (
        <p className="text-lg">Geek, your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4 mb-4">
            {cartCourses.map((item) => (
              <li key={item.product.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-sm">Price: ₹{item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                <button 
					className="bg-sky-500 text-white hover:bg-green-600 p-2 rounded-md font-semibol"
					onClick={() => updateItemQuantity(item.product, 1)} 
				> 
					<FontAwesomeIcon icon={faPlus} /> 
				</button> 
				<span className="mx-2">{item.quantity}</span> 
				<button 
					className="bg-sky-500 text-white hover:bg-red-600 p-2 rounded-md font-semibol mr-2"
					onClick={() => updateItemQuantity(item.product, -1)} 
				> 
					<FontAwesomeIcon icon={faMinus} /> 
				</button> 
                  <button
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => deleteCourseFromCartFunction(item.product)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <p className="text-xl font-semibold mb-4">Total Amount: ₹{totalAmountCalculationFunction()}</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={cartCourses.length === 0 || totalAmountCalculationFunction() === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCartComponent;

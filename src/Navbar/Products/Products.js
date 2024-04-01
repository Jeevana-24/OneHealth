import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import ShowCourseComponent from './ShowCourseComponent';
import UserCartComponent from './UserCartComponent';

function Products() {
  const [courses, setCourses] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/courses') // Adjust the URL to match your backend endpoint
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const addCourseToCartFunction = (course) => {
    console.log("Trying to add to cart:", course);
    const alreadyInCart = cartCourses.find((item) => item.product._id === course._id);
  
    console.log("Already in cart:", alreadyInCart);
  
    if (alreadyInCart) {
      // If the course is already in the cart, increment the quantity
      const updatedCart = cartCourses.map((item) => {
        if (item.product._id === course._id) {
          console.log(`Incrementing quantity for item with id ${item.product._id}`);
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartCourses(updatedCart);
    } else {
      // If the course is not in the cart, add it as a new item
      const newCartCourses = [...cartCourses, { product: course, quantity: 1 }];
      console.log(`Adding new item to cart with id ${course._id}`);
      setCartCourses(newCartCourses);
    }
  };
  

  const deleteCourseFromCartFunction = (course) => {
    const updatedCart = cartCourses.filter(item => item.product._id !== course._id);
    setCartCourses(updatedCart);
  };

  const updateItemQuantity = (product, change) => {
    const updatedCartCourses = cartCourses.map((item) => {
      if (item.product._id === product._id) {
        return { ...item, quantity: Math.max(item.quantity + change, 0) };
      }
      return item;
    });
    setCartCourses(updatedCartCourses);
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="App">
      <SearchComponent searchCourse={searchCourse} courseSearchUserFunction={courseSearchUserFunction} />
      <main className="App-main">
        <ShowCourseComponent
          products={filteredCourses}
          addCourseToCartFunction={addCourseToCartFunction}
        />
  
        <UserCartComponent
          cartCourses={cartCourses}
          updateItemQuantity={updateItemQuantity}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={totalAmountCalculationFunction}
          setCartCourses={setCartCourses}
        />
      </main>
    </div>
  );
}

export default Products;

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
        console.log('Courses:', data);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const addCourseToCartFunction = (course) => {
    const alreadyInCart = cartCourses.find(item => item.product.id === course.id);
    if (alreadyInCart) {
      const updatedCart = cartCourses.map(item =>
        item.product.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartCourses(updatedCart);
    } else {
      setCartCourses([...cartCourses, { product: course, quantity: 1 }]);
    }
  };

  const deleteCourseFromCartFunction = (course) => {
    const updatedCart = cartCourses.filter(item => item.product.id !== course.id);
    setCartCourses(updatedCart);
  };

  const updateItemQuantity = (product, change) => {
    const updatedCartCourses = cartCourses.map((item) => {
      if (item.product.id === product.id) {
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

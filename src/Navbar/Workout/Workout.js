import React from 'react';
import Workoutlist from "./Workoutlist"; 

function Workout() {
  return ( 
    <> 
        <div className="flex flex-col justify-center items-center mt-4"> 
            <h1 className="text-sky-600 font-bold text-3xl"> 
                Workout 
            </h1> 
            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-400 font-bold text-xl mb-4"> 
                Full body excercise 
            </h3> 
            <Workoutlist /> 
        </div> 
    </> 
  ); 
}

export default Workout;



// Workoutlist.js 
import { useState, useEffect } from "react"; 
import { 
	findSectionProgress, 
	findOverallProgress, 
} from "./calculate"; 
import Workouttrackerlist from "./Workouttrackerlist"; 
import Section from "./Section"; 

export default function Workoutlist() { 
	const [dsaList, setDsaList] = useState([]); 
	const [overallProgress, setOverallProgress] = useState(0); 

	useEffect(() => { 
		setDsaList(Workouttrackerlist);
		localStorage.setItem("dsalist", JSON.stringify(Workouttrackerlist)); // Save the initial list to localStorage
	  }, []);
	   

	useEffect(() => { 
		setOverallProgress(findOverallProgress(dsaList)); 
	}, [dsaList]); 

	const updateList = (index, indexOfSub) => { 
		const newWorkoutlist = [...dsaList]; 
		newWorkoutlist[index].subsections[indexOfSub].completed = 
			!newWorkoutlist[index].subsections[indexOfSub].completed; 
		newWorkoutlist[index].progress = findSectionProgress( 
			newWorkoutlist[index].subsections 
		); 
		setDsaList(newWorkoutlist); 
		localStorage.setItem("dsalist", JSON.stringify(newWorkoutlist)); 
	}; 

	return ( 
		<div className="flex flex-col gap-10 w-[60%] mb-40 relative"> 
			{overallProgress === 100 && ( 
				<h1 className="text-center text-4xl text-emerald-500"> 
					Successfully Completed! Hurray. 
				</h1> 
			)} 
			<p>Progress: {overallProgress}%</p> 
			<div 
				className={`-mt-5 rounded sticky top-0 
							bg-gradient-to-r from-blue-700 
							to-cyan-400 transition-all h-2 w-[${overallProgress}%]`}> 
			</div> 
			{dsaList.map((section, index) => { 
				return ( 
					<Section 
						index={index} 
						updateList={updateList} 
						key={index} 
						section={section} 
					/> 
				); 
			})} 
		</div> 
	); 
} 

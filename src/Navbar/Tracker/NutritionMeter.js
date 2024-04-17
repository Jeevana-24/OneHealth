import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrashAlt,
    faUtensils,
    faPlus,
    faMinus,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const NutritionMeter = () => {
    const { user, isAuthenticated } = useAuth0();
    const [nutritionItems, setNutritionItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
    });

    const [editItem, setEditItem] = useState(null);
    const [totalCalories, setTotalCalories] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        const fetchNutritionData = async () => {
            if (isAuthenticated && user) {
                const response = await fetch(`http://localhost:5000/nutrition/${user.sub}`);

                const data = await response.json();
                if (response.ok) {
                    setNutritionItems(data.items.map(item => ({ ...item, id: Date.now() + Math.random() })));
                } else {
                    console.error("Failed to fetch nutrition data:", data.message);
                }
            }
        };

        fetchNutritionData();
    }, [user, isAuthenticated]);

    useEffect(() => {
        const calculateTotalCalories = nutritionItems.reduce(
            (total, item) => total + parseFloat(item.calories) * item.quantity,
            0
        );

        setTotalCalories(calculateTotalCalories);

        if (calculateTotalCalories > 1000) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [nutritionItems]);

    const addNutritionItem = async () => {
        console.log("Adding item:", newItem);
        if (
            newItem.name &&
            newItem.calories >= 0 &&
            newItem.protein >= 0 &&
            newItem.carbs >= 0 &&
            newItem.fat >= 0
        ) {
            if (isAuthenticated && user) {
                const userId = user.sub;
                const date = new Date().toISOString().split('T')[0]; 
                const newItemWithId = { ...newItem, id: Date.now(), quantity: 1 };
    
                const response = await fetch('http://localhost:5000/nutrition', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, date, items: [newItemWithId] })
                });
    
                if (response.ok) {
                    setNutritionItems([...nutritionItems, newItemWithId]);
                    setNewItem({
                        name: "",
                        calories: "",
                        protein: "",
                        carbs: "",
                        fat: "",
                    });
                    setInputError(false);
                } else {
                    const errorData = await response.json();
                    console.error("Failed to add nutrition item:", errorData.message);
                }
            }
        } else {
            setInputError(true);
        }
    };
    

    const removeAllItems = async () => {
        console.log('hulala');
        if (isAuthenticated && user) {
                        const date = new Date().toISOString().split('T')[0];
                        console.log(user.sub,date);
            const response = await fetch(`http://localhost:5000/nutrition/${user.sub}/${date}`, {
                method: 'DELETE'
            });
            console.log(response)

    
            if (response.ok) {
                setNutritionItems([]);
            } else {
                console.error("Failed to clear all items");
            }
        }
    };
    
    

    const editItemFunction = (item) => {
        setEditItem(item._id);
        setNewItem({ ...item });
    };

    const updateItemFunction = async () => {
        if (
            newItem.name &&
            newItem.calories >= 0 &&
            newItem.protein >= 0 &&
            newItem.carbs >= 0 &&
            newItem.fat >= 0
        ) {
            if (isAuthenticated && user) {
                const response = await fetch(`http://localhost:5000/nutrition/${user.sub}/${editItem}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newItem)
                });
    
                if (response.ok) {
                    const updatedItems = nutritionItems.map((item) =>
                        item._id === editItem ? { ...newItem, _id: editItem } : item
                    );
                    setNutritionItems(updatedItems);
                    setNewItem({
                        name: "",
                        calories: "",
                        protein: "",
                        carbs: "",
                        fat: "",
                    });
                    setEditItem(null);
                    setInputError(false);
                } else {
                    console.error("Failed to update nutrition item");
                }
            }
        } else {
            setInputError(true);
        }
    };
    

    const deleteItemFunction = async (_id) => {
        if (isAuthenticated && user) {
            const response = await fetch(`http://localhost:5000/nutrition/${user.sub}/${_id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedItems = nutritionItems.filter((item) => item._id !== _id);
                setNutritionItems(updatedItems);
            } else {
                console.error("Failed to delete nutrition item");
            }
        }
    };
    
    

    const inputErrorStyle = {
        borderColor: "red",
    };

    const updateItemQuantity = async (_id, change) => {
        const updatedItems = nutritionItems.map((item) =>
            item._id === _id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
        );
    
        const updatedItem = updatedItems.find(item => item._id === _id);
    
        if (updatedItem && isAuthenticated && user) {
            const response = await fetch(`http://localhost:5000/nutrition/${user.sub}/item/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: updatedItem.quantity })
            });
    
            if (response.ok) {
                setNutritionItems(updatedItems);
            } else {
                console.error("Failed to update item quantity");
            }
        }
    };
    
    
    

    const totalProtein = () => {
        return nutritionItems.reduce(
            (total, item) => total + parseFloat(item.protein) * item.quantity,
            0
        );
    };

    const totalCarbs = () => {
        return nutritionItems.reduce(
            (total, item) => total + parseFloat(item.carbs) * item.quantity,
            0
        );
    };

    const totalFat = () => {
        return nutritionItems.reduce(
            (total, item) => total + parseFloat(item.fat) * item.quantity,
            0
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-blue-500 text-center mb-4">
                    Calorie Meter
                </h1>
                {showWarning && (
                    <div className="bg-sky-500 text-white p-2 rounded-md text-center mb-4 flex items-center justify-center">
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Total calories exceed recommended limit (1000 calories)!
                    </div>
                )}
                <div className="mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Item Name"
                                className={`w-full py-2 px-3 border rounded-md focus:outline-none 
                                focus:ring focus:border-blue-300 ${
                                    inputError && !newItem.name
                                        ? "border-red-500"
                                        : ""
                                }`}
                                style={
                                    inputError && !newItem.name
                                        ? inputErrorStyle
                                        : {}
                                }
                                value={newItem.name}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Calories"
                                className={`w-full py-2 px-3 border rounded-md 
                                focus:outline-none focus:ring focus:border-blue-300 ${
                                    inputError && newItem.calories < 0
                                        ? "border-red-500"
                                        : ""
                                }`}
                                style={
                                    inputError && newItem.calories < 0
                                        ? inputErrorStyle
                                        : {}
                                }
                                value={newItem.calories}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        calories: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Protein (g)"
                                className={`w-full py-2 px-3 border rounded-md focus:outline-none 
                                focus:ring focus:border-blue-300 ${
                                    inputError && newItem.protein < 0
                                        ? "border-red-500"
                                        : ""
                                }`}
                                style={
                                    inputError && newItem.protein < 0
                                        ? inputErrorStyle
                                        : {}
                                }
                                value={newItem.protein}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        protein: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Carbs (g)"
                                className={`w-full py-2 px-3 border rounded-md focus:outline-none 
                                focus:ring focus:border-blue-300 ${
                                    inputError && newItem.carbs < 0
                                        ? "border-red-500"
                                        : ""
                                }`}
                                style={
                                    inputError && newItem.carbs < 0
                                        ? inputErrorStyle
                                        : {}
                                }
                                value={newItem.carbs}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        carbs: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Fat (g)"
                                className={`w-full py-2 px-3 border rounded-md focus:outline-none 
                                focus:ring focus:border-blue-300 ${
                                    inputError && newItem.fat < 0
                                        ? "border-red-500"
                                        : ""
                                }`}
                                style={
                                    inputError && newItem.fat < 0
                                        ? inputErrorStyle
                                        : {}
                                }
                                value={newItem.fat}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        fat: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1"></div>
                    </div>
                    <div className="mt-3 flex justify-between">
                        {editItem ? (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 font-semibold focus:outline-none text-xs"
                                onClick={updateItemFunction}
                            >
                                Update Item
                            </button>
                        ) : (
                            <button
                                className="bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4 font-semibold focus:outline-none text-xs"
                                onClick={addNutritionItem}
                            >
                                Add Item
                            </button>
                        )}
                        <button
                            className="bg-sky-500 text-white py-2 px-4 rounded-md font-semibold mb-4 hover:bg-red-600 focus:outline-none text-xs"
                            onClick={removeAllItems}
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {nutritionItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-4 rounded-md shadow-md border-2 border-blue-400 hover:border-blue-500 hover:shadow-lg transition transform hover:scale-105"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                {item.name}
                            </h2>
                            <ul className="mt-3">
                                <li>
                                    Calories: {item.calories * item.quantity}
                                </li>
                                <li>
                                    Protein: {item.protein * item.quantity}g
                                </li>
                                <li>Carbs: {item.carbs * item.quantity}g</li>
                                <li>Fat: {item.fat * item.quantity}g</li>
                                <li className="flex items-center mt-2">
                                    <button
                                        className="bg-sky-500 text-white p-1 rounded-md hover:bg-green-600 font-semibold"
                                        onClick={() =>
                                            updateItemQuantity(item._id, 1)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <span className="mx-2">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="bg-sky-500 text-white p-1 rounded-md hover:bg-red-600 font-semibold"
                                        onClick={() =>
                                            updateItemQuantity(item._id, -1)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                </li>
                            </ul>
                            <div className="mt-3 flex justify-between">
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 font-semibold focus:outline-none text-xs"
                                    onClick={() => editItemFunction(item)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button
                                    className="bg-sky-500 text-white py-1 px-2 rounded-md hover:bg-red-600 font-semibold focus:outline-none text-xs"
                                    onClick={() => deleteItemFunction(item._id)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <p className="text-xl font-semibold">
                        Total Calories: {totalCalories}{" "}
                        <span className="text-blue-500 ml-2">
                            <FontAwesomeIcon icon={faUtensils} size="lg" />
                        </span>
                    </p>
                    <p className="text-xl font-semibold">
                        Total Protein: {totalProtein()}g
                    </p>
                    <p className="text-xl font-semibold">
                        Total Carbs: {totalCarbs()}g
                    </p>
                    <p className="text-xl font-semibold">
                        Total Fat: {totalFat()}g
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NutritionMeter;

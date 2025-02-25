import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  // get food_list array from StoreContext
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes for you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          // filter food items by category
          // if category is "All" or category matches item category
          if ((category === "All" || category === item.category)) {
            // return FoodItem component with food item details
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

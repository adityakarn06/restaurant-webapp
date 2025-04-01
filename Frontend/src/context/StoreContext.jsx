import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // state for add to cart functionality
  const [cartItems, setCartItems] = useState({});
  // backend url
  const url = "https://restaurant-webapp-server.onrender.com";
  // for storing token in frontend
  const [token, setToken] = useState("");
  // for storing food_list from backend
  const [food_list, setFoodList] = useState([]);

  // add to cart function
  const addToCart = async (itemId) => {
    // if item is not in cart, add it
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    // if item is already in cart, increment its count
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}});
    }
  };

  // remove from cart function
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // using for..in loop to iterate over object cartItems and give us the key i.e. item
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        // totalAmount = totalAmount + (price of item * quantity of item)
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }

  // function to load cart data from backend to avoid loss of cart data on reload
  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        // to not get logged out on reload of page: get the token from local storage and set it in the state
        setToken(localStorage.getItem("token"));
        // load cart data from backend
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

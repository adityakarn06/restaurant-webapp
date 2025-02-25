import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import OrderStatus from "./pages/OrderStatus/OrderStatus";

const App = () => {
  //for login-popup
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* if showLogin is true, then show the login popup, otherwise show app content */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/orderstatus" element={<OrderStatus />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

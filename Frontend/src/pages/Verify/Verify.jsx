import { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    // const verifyPayment = async () => {
    //     const response = await axios.post(url+"/api/order/verify", {success, orderId});
    //     if (response.data.success) {
    //         navigate("/myorders");
    //     }
    //     else{
    //         navigate("/cart");
    //     }
    // }

  return (
    <div className='verify'>
        {/* <div className="spinner"></div> */}
        <h1>Order Placed</h1>
    </div>
  )
}

export default Verify

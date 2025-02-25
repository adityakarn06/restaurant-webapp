import React from 'react'
import './ChooseWhat.css'
import { assets } from '../../assets/frontend_assets/assets'

const ChooseWhat = () => {
  return (
    <div className='choose-what'>
      <div className="box order-online">
        <img src={assets.order_online} alt="" />
        <h2>Order Online</h2>
        <p>Stay home and order to your doorstep</p>
      </div>
      <div className="box dine-in">
        <img src={assets.dining} alt="" />
        <h2>Dine-in</h2>
        <p>View the personalised menu for you</p>
      </div>
      <div className="box party">
        <img src={assets.party} alt="" />
        <h2>Party</h2>
        <p>Have an experience like never before</p>
      </div>
    </div>
  )
}

export default ChooseWhat

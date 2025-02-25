import React from 'react'
import './Header.css'
import {assets} from '../../assets/frontend_assets/assets'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2><span>Discover</span> the best food & drinks</h2>
        <p>Explore curated lists of top restaurants, cafes, pubs, and bars in your city, based on trends</p>
        <button>View menu</button>
      </div>
      <div className="hero-img">
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
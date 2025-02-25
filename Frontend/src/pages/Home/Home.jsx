import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import ChooseWhat from '../../components/ChooseWhat/ChooseWhat'

const Home = () => {

    const [category, setCategory] = useState("All")

  return (
    <div>
      <Header />
      <ChooseWhat />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home

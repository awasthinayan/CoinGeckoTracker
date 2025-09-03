import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CoinTable2 from '../Navbar2/CoinTable_axios'
import Banner from '../Components/Banner/Banner'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <CoinTable2/>
    </div>
  )
}

export default Home
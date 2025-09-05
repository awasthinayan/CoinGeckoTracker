import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import CoinDetails from '../CoinDetails/CoinDetails'
import Layout from '../Layout/Layout'

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='coins/:coinId' element={<CoinDetails />} />
      </Route>
    </Routes>
  )
}

export default Routing
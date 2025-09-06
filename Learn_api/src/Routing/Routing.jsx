// ...existing code...
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { lazy, Suspense } from 'react'
import ErrorBoundaryComponent from '../ErrorBoundary/ErrorBoundary'
const Home = lazy(() => import('../Home/Home'))
const CoinDetails = lazy(() => import('../CoinDetails/CoinDetails'))
import Welcome from '../WelcomePage/Welcome'

const Routing = () => {
  return (
    <ErrorBoundaryComponent>
      <Suspense fallback={<div className="text-3xl text-red-600">⏳ Please wait...</div>}>
        <Routes>
          {/* Landing page (first page) */}
          <Route path='/' element={<Welcome />} />

          {/* Main app routes under /app so Welcome stays first */}
          <Route path='/layout' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/layout/coins/:coinId' element={<CoinDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundaryComponent>
  )
}

export default Routing
// ...existing code...
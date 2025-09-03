import { useState } from 'react'
import Home from './Home/Home'
import { CurrencyContext } from './Context/ContextProvider'


export const App = () => {

  const [currency,setCurrency] = useState('usd')
  
  return (
    <>
    <CurrencyContext.Provider value={{currency,setCurrency}}>
    <Home/>
    </CurrencyContext.Provider>
    </>
  )
}
export default App

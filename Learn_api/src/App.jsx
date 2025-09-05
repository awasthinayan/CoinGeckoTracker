import { useState } from 'react'
import Home from './Home/Home'
import { CurrencyContext } from './Context/ContextProvider'
import Routing from './Routing/Routing'


export const App = () => {

  const [currency,setCurrency] = useState('usd')
  
  return (
    <>
    <CurrencyContext.Provider value={{currency,setCurrency}}>
    <Routing/>
    </CurrencyContext.Provider>
    </>
  )
}
export default App

import React, { useContext, useState } from 'react'
import WeatherDisplay from './components/WeatherDisplay'
import WeatherForecaste from './components/WeatherForecaste'
import WeeklyForcaset from './components/WeeklyForcaset'
import { AppContext } from './context/AppContext'
import Loading from './components/Loading'
import Bargraph from './components/Bargraph'

const App = () => {
  const { setCity, input, setInput, citiesData, loading } = useContext(AppContext);



  const hadlePress = (e) => {
    if (e.key === 'Enter') {
      setCity(input)
    }
  }


  return (
    <>

      <div className='bg-slate-950 min-h-screen'>

        <nav className='h-16 w-full p-10 bg-gray-800 text-white flex items-center justify-between bg-linear-to-b from-violet-600 to-slate-950 '>
          <div>
            <h2 className=' font-bold'>Apex Weather</h2>
          </div>
          <input type="text" placeholder='Search cities' className='bg-slate-500 rounded-lg w-1/4 px-7 m-2.5 hidden md:block h-10'
            value={input}
            onChange={(e) => {
              e.preventDefault()
              setInput(e.target.value)

            }}
            onKeyDown={(e) => hadlePress(e)}
          />
          {/* for phone */}

          <input type="text" placeholder='Search cities' className='bg-slate-500 rounded-lg w-2/4 px-7 m-2.5  md:hidden h-10'
            value={input}
            onChange={(e) => {
              e.preventDefault()
              setInput(e.target.value)

            }}
            onKeyDown={(e) => hadlePress(e)}
          />

        </nav>
        {loading ?
          <Loading />
          :
          <>
            <WeatherDisplay />
            <WeatherForecaste />
            <div className='w-full lg:min-h-190 flex items-center lg:flex-row flex-col gap-3 mt-2  p-3'>
              <WeeklyForcaset />
              <Bargraph />
            </div>
          </>}



      </div>
    </>
  )
}

export default App
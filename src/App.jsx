import React from 'react'
import WeatherDisplay from './components/WeatherDisplay'

const App = () => {
  return (
   <div className='bg-slate-950 min-h-screen'>
    <nav className='h-16 w-full p-10 bg-gray-800 text-white flex items-center justify-between bg-linear-to-b from-violet-600 to-slate-950 '>
      <div>
        <h2 className=' font-bold'>Apex Weather</h2>
      </div>
      <input type="text"placeholder='Search cities' className='bg-slate-500 rounded-lg w-1/4 px-7 m-2.5 hidden md:block h-10' />
      {/* for phone */}
      {/* <div></div> */}
    </nav>
      <WeatherDisplay/>
     

    </div>
  )
}

export default App
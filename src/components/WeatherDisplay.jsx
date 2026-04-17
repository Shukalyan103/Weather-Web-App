import React from 'react'

const WeatherDisplay = () => {
  return (
    <div className='md:h-[60vh] h-screen w-full p-5 bg-linear-65 text-white  from-slate-950  to-violet-600 md:flex-row flex-col flex  items-center justify-between gap-8'>
      <div className='h-full md:w-2/5 w-full'>
        <div className='h-1/10 w-full  flex items-center flex-col md:flex-row justify-start gap-2'>
          <div className='w-1/3 h-2/3 bg-green-900 opacity-70 rounded-xl flex items-center px-2 gap-3'>
            <div id='box' className='h-1/3 bg-green-700 w-1/13 rounded-full'></div>
            <h4 className='text-[2vh] font-bold'>LIVE OBSERVATION</h4>
          </div>
          <div className='w-1/3 h-2/3  rounded-xl'>
            <h4 className='font-bold opacity-70'>Oslo , Norway</h4>
          </div>
        </div>
        <div>
          <h1 className='text-[20vh] font-bold [text-shadow:_3px_3px_9px_#fff] pl-4'>21°</h1>
        </div>
        <div className='h-1/3 w-full flex items-center gap-5'>
          <div id='box_nature' className='flex flex-col gap-2 pl-4'>
            <h2 className='text-4xl font-sm text-gray-400'>Cloudy</h2>
            <p className='text-[2.5vh] text-gray-700' >Feels like  21°</p>

          </div>
          <div id='img-weather' className='bg-green-500 h-12 w-12'></div>
        </div>

      </div>
      <div className='h-full md:w-2/5 w-full p-5 '>
        <div className='bg-[#0F1E3D] w-full h-40 rounded-3xl mb-5 p-6'>
          <div className='flex items-center justify-between'>
            <h5 className='text-sm text-gray-400'>UV INDEX</h5>
            <img src="" alt="" />
          </div>
          <div className='flex gap-2 items-end mt-5'>
            <h1 className='text-4xl '>2</h1>
            <p className='text-xl text-gray-400 font-semibold'>LOW</p>
          </div>
          <div className='bg-[#142447] h-2 w-full rounded-xl overflow-hidden mt-3'>
            <div className='w-2/10 h-full bg-[#A17EF2] '></div>

          </div>
        </div>
        <div className='w-full h-40 flex gap-4'>
          <div className='w-1/2 h-full bg-[#0F1E3D] rounded-3xl p-6 flex flex-col gap-4 '>
           <h5 className='text-sm text-gray-400 '>HUMIDITY</h5>
           <h1 className='text-4xl font-bold text-[#4B8A90] mt-5 '>78%</h1>
          
          </div>
          <div className='w-1/2 h-full bg-[#0F1E3D] rounded-3xl p-6 flex flex-col gap-4 '>
           <h5 className='text-sm text-gray-400'>WIND SPEED</h5>
           <div className='flex gap-2 items-end mt-5'>
            <h1 className='text-4xl '>14</h1>
            <p className='text-xl text-gray-400 font-semibold'>km/h</p>
          </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default WeatherDisplay
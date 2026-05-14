import { AppContext } from '@/context/AppContext'
import { Droplets, Sun, Wind } from 'lucide-react'
import React,{useContext} from 'react'

const WeatherDisplay = () => {

const {citiesData,cityLocated,decimalFix,weatherIcon} =useContext(AppContext)


const spiltWord=(word)=>{
   if(!word) return 'Location'
  const newWord =word.split(",")
  return newWord[0]
}

const uvIndex=(word)=>{
  const newWord=decimalFix(word)
  if(newWord<=2){
    return 'LOW'
  }
  if(newWord>2 && newWord<=5){
    return 'MODERATE'
  }
  if(newWord>5 && newWord<=7){
    return 'HIGH'
  }
  if(newWord>=8 && newWord<=10){
    return 'VERY HIGH'
  }
  return 'EXTREME'
  
}


  return  (

    <>
    { citiesData &&
    <div className='lg:h-[50vh] min-h-screen w-full p-5 bg-linear-65  text-white  from-slate-950  to-violet-600 lg:flex-row flex-col flex  items-center lg:justify-between gap-8'>
    {/* Colunm 1 */}
      <div  className=' h-full sm:w-1/2 lg:w-1/2 flex  lg:justify-start justify-center flex-col'>
      {/* live observation and city */}
        <div className='w-full lg:h-1/10 md:h-2/10  flex  items-center flex-col lg:flex-row lg:justify-start justify-around  gap-1'>
          <div className='lg:w-2/5 w-3/3 lg:h-2/3 h-1/2 text-center lg:text-left bg-green-900 opacity-70 rounded-xl flex items-center  p-2 gap-3'>
            <div id='box' className='lg:h-1/3 w-5 h-4  bg-green-700 lg:w-1/20 rounded-full'></div>
            <h4 className='lg:text-[2vh] w-full text-[2vh] font-bold'>LIVE OBSERVATION</h4>
          </div>
          <div className='lg:w-1/3 w-full text-center h-2/3 text-xl  rounded-xl p-1'>
            <h4 className='font-bold lg:text-xl opacity-70'>{spiltWord(cityLocated[0]?.display_name)||'india'} , {citiesData.location?.country || 'india'}</h4>
          </div>
        </div>
        <div className='w-full text-center lg:text-left'>
          <h1 className='lg:text-[20vh] text-[15vh] font-bold [text-shadow:3px_3px_9px_#fff] pl-4'>{decimalFix(citiesData?.current?.temp_c) || 21}°</h1>
        </div>
        <div className='h-1/3 w-full flex pl-3 lg:pl-0 justify-evenly lg:justify-start items-center gap-5'>
          <div id='box_nature' className='flex flex-col gap-2 pl-4'>
            <h2 className='text-4xl font-sm text-gray-400'>{citiesData?.current?.condition.text}</h2>
            <p className='text-[2.5vh] text-gray-600 font-semibold' >Feels like  {decimalFix(citiesData?.current?.feelslike_c)}°</p>

          </div>
          <div id='img-weather' className=' h-12 w-12'>{weatherIcon(citiesData?.current?.condition.text,'h-full w-full')}</div>
        </div>

      </div>
      {/* Colunm 2 */}
      <div className='h-full lg:w-2/5 w-full md:p-5 p-0 '>
        <div className='bg-[#0F1E3D] w-full h-40 rounded-3xl mb-5 p-6'>
          <div className='flex items-center justify-between '>
            <h5 className='text-sm text-gray-400'>UV INDEX</h5>
            <Sun/>
          </div>
          <div className='flex gap-2 items-end mt-5'>
            <h1 className='text-4xl '>{decimalFix(citiesData?.current?.uv)||2}</h1>
            <p className='text-xl text-gray-400 font-semibold'>{uvIndex(citiesData?.current?.uv)}</p>
          </div>
          <div className='bg-[#142447] h-2 w-full rounded-xl overflow-hidden mt-3'>
            <div style={{width: `${Math.min((decimalFix(citiesData?.current?.uv)/10)*100, 100)}%`}} className='h-full bg-[#A17EF2] '></div>

          </div>
        </div>
        <div className='w-full h-40 flex gap-4'>
          <div className='w-1/2 h-full bg-[#0F1E3D] rounded-3xl p-6 flex flex-col gap-4 '>
          <div className='flex items-center justify-between'>
            <h5 className='text-sm text-gray-400'>HUMIDITY</h5>
            <Droplets/>
          </div>
           
           <h1 className='text-4xl font-bold text-[#4B8A90] mt-5 '>{citiesData?.current?.humidity}%</h1>
          
          </div>
          <div className='w-1/2 h-full bg-[#0F1E3D] rounded-3xl p-6 flex flex-col gap-4 '>
           <div className='flex items-center justify-between'>
            <h5 className='text-sm text-gray-400'>WIND SPEED</h5>
            <Wind/>
          </div>
           <div className='flex gap-2 items-end mt-5'>
            <h1 className='text-4xl '>{decimalFix(citiesData?.current?.wind_kph)||23}</h1>
            <p className='text-xl text-gray-400 font-semibold'>km/h</p>
          </div>
          </div>
        </div>
      </div>


    </div>
    }
    </>
  
  )
}

export default WeatherDisplay
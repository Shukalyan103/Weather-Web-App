
import React, { useState, useContext ,useEffect} from 'react'
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail
} from "lucide-react";

import { AppContext } from "@/context/AppContext";

const WeeklyForcaset = () => {
    const { citiesData, coordinates, weatherapiKey, setLoading, weatherIcon } = useContext(AppContext)
    const [weekData, setWeekData] = useState([])


    function getWeatherInfo(code) {
  switch (code) {
    // ☀️ Clear / Cloudy
    case 0:
      return { icon: <Sun />, label: "Clear sky" };

    case 1:
      return { icon: <CloudSun />, label: "Mainly clear" };

    case 2:
      return { icon: <CloudSun />, label: "Partly cloudy" };

    case 3:
      return { icon: <Cloud />, label: "Overcast" };

    // 🌫 Fog
    case 45:
    case 48:
      return { icon: <CloudFog />, label: "Fog" };

    // 🌦 Drizzle
    case 51:
    case 53:
    case 55:
      return { icon: <CloudDrizzle />, label: "Drizzle" };

    // 🌧 Rain
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
      return { icon: <CloudRain />, label: "Rain" };

    // 🌧❄️ Freezing rain / hail
    case 66:
    case 67:
      return { icon: <CloudHail />, label: "Freezing rain" };

    // ❄️ Snow
    case 71:
    case 73:
    case 75:
    case 77:
      return { icon: <CloudSnow />, label: "Snow" };

    // 🌧 Showers
    case 80:
    case 81:
    case 82:
      return { icon: <CloudRain />, label: "Showers" };

    // 🌨 Snow showers
    case 85:
    case 86:
      return { icon: <CloudSnow />, label: "Snow showers" };

    // ⛈ Thunderstorm
    case 95:
    case 96:
    case 99:
      return { icon: <CloudLightning />, label: "Thunderstorm" };

    default:
      return { icon: <Cloud />, label: "Cloud" };
  }
}







    const getWeekData = async () => {
        try {
            if (!coordinates || coordinates.length < 2) {
                console.error('Invalid coordinates:', coordinates)
                return
            }

            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`)
            const data = await response.json()
            if (!data || !data.daily || !data.daily.time) {
                console.error('Invalid data structure:', data)
                return
            }
            const formatData = data.daily.time.map((dateStr, i) => ({
                date: dateStr,
                max: Math.round(data.daily.temperature_2m_max[i]),
                min: Math.round(data.daily.temperature_2m_min[i]),
                code: data.daily.weathercode[i]
            }))
            setWeekData(formatData)
            console.log('Formatted week data:', formatData)



        } catch (error) {
            console.log('error occur:', error)
        }
    }

    useEffect(()=>{
        getWeekData()
    },[coordinates])


    return (
        <div className='lg:w-1/2 w-full h-100 bg-[#0B1934] mt-5 rounded-lg p-5 text-white mb-10'>
            <h2 className='text-2xl font-semibold text-white/60'>Weekly Forecast</h2>
            <div className='w-full flex flex-col gap-4'>
                {weekData && weekData.slice(1,4).map((item, i) => (
                    <div key={i} className='w-full h-20 flex items-center justify-around gap-5'>
                        <p className='text-white/70 md:text-lg font-semibold w-12'>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        
                        <div className='flex items-center gap-2 w-16'>
                            {getWeatherInfo(item.code).icon}
                            <p className='text-white/80 md:text-sm text-xs'>{getWeatherInfo(item.code).label}</p>
                        </div>
                        
                        <div className='bg-[#142447] h-1 md:h-2 w-20 md:w-25 rounded-xl overflow-hidden'>
                            <div style={{width: `${(item.max / 40) * 100}%`}} className='h-full bg-[#A17EF2]'></div>
                        </div>
                        
                        <div className='flex gap-2 items-end p-2 w-16'>
                            <h1 className='text-xl md:text-2xl font-bold'>{item.max}°</h1>
                            <p className='text-sm md:text-base text-white/40'>{item.min}°</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeeklyForcaset
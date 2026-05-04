import { ChevronLeft, ChevronRight, CloudRain } from 'lucide-react'
import React, { useRef, useContext, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import Maplocated from './Maplocated'
import { AppContext } from "@/context/AppContext";

const WeatherForecaste = () => {
    const { citiesData, coordinates, weatherapiKey, setLoading,weatherIcon } = useContext(AppContext)
    const swipeRef = useRef(null)
    const [forecastData, setForecastData] = useState([])
    const [secforecastData, setSecForecastData] = useState([])


    const getForecast = async () => {
        console.log('Fetching forecast with coordinates:', coordinates)
        try {
            if (!coordinates || coordinates.length < 2) {
                console.error('Invalid coordinates:', coordinates)
                return
            }

            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${coordinates[0]},${coordinates[1]}&days=2`)
            const data = await response.json()
            setForecastData(data.forecast.forecastday[0].hour)
            setSecForecastData(data.forecast.forecastday[1].hour)

            console.log('Forecast data:', data)
        } catch (error) {
            console.error('Error fetching forecast:', error)
        }
    }
    const spiltWord = (word) => {
        if (!word) {
            return 'N/A'
        }
        const newWord = word.split(" ")
        return newWord[1]
    }

    useEffect(() => {
        getForecast()


    }, [coordinates]);

    return (
        <div className='w-full min-h-205 lg:min-h-100 p-6 mt-5 flex gap-3 flex-col lg:flex-row'>
            {/* today and tommorow */}
            <div id='dail forecast' className='lg:w-3/5 w-full h-full '>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col items-start gap-1'>
                        <h2 className='text-white opacity-70 md:text-3xl text-2xl font-bold'>Today & Tomorrow</h2>
                        <p className='text-gray-700 opacity-90 font-semibold'>24-hour celestial progression</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button onClick={() => swipeRef.current.slidePrev()} className=' p-1 border border-gray-500 rounded-full '><ChevronLeft color='white' /></button>
                        <button onClick={() => swipeRef.current.slideNext()} className=' p-1 border border-gray-500 rounded-full'><ChevronRight color='white' /></button>
                    </div>
                </div>
                <div className=' md:p-8 mt-5 '>
                    {forecastData.length === 0 ? (
                        <p className='text-gray-500 text-center'>No forecast data available.</p>
                    ) :
                        <Swiper


                            spaceBetween={15}
                            freeMode={true}
                            onSwiper={(swiper) => (swipeRef.current = swiper)}

                        >


                            {forecastData &&
                                forecastData.filter(items=>new Date(items.time)>new Date()).map((fore, i) => (
                                    <SwiperSlide className='md:w-37.5! w-35!' key={i}>
                                        <div className='w-29  h-full bg-[#081329] rounded-full p-6 flex flex-col gap-5 items-center'>
                                            <h4 className='text-sm text-gray-600 opacity-90'>{spiltWord(fore.time)}</h4>
                                          {weatherIcon(fore?.condition?.text) || <CloudRain color='#363C71' className='w-15' />}
                                            <h3 className='text-2xl text-white/70'>{Math.round(fore.temp_c)}°</h3>
                                            <p className='text-sm text-gray-600 opacity-90'>{Math.round(fore.chance_of_rain)}% Rain</p>
                                        </div>
                                    </SwiperSlide>

                                ))

                            }
                            {
                                secforecastData.map((fore, i) => (
                                    <SwiperSlide className='md:w-37.5! w-35!' key={i}>
                                        <div className='w-29  h-full bg-[#081329] rounded-full p-6 flex flex-col gap-5 items-center'>
                                            <h4 className='text-sm text-gray-600 opacity-90'>{spiltWord(fore.time)}</h4>
                                            {weatherIcon(fore?.condition?.text) || <CloudRain color='#363C71' className='w-15' />}
                                            <h3 className='text-2xl text-white/70'>{Math.round(fore.temp_c)}°</h3>
                                            <p className='text-sm text-gray-600 opacity-90'>{Math.round(fore.chance_of_rain)}% Rain</p>
                                        </div>
                                    </SwiperSlide>

                                ))

                            }
                        </Swiper>
                    }
                </div>
            </div>
            {/* Map */}
            <div id='map' className=' w-full h-50 lg:m-4 mt-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='md:text-3xl text-2xl font-semibold text-white/70'>Weather Map</h1>
                    <h4 className='text-sm  text-blue-300'>View Details</h4>
                </div>
                <div className='lg:w-100 w-full lg:h-60 h-100 mt-8 lg:ml-10 rounded-lg overflow-hidden'>
                    <Maplocated />
                </div>
            </div>

        </div>
    )
}

export default WeatherForecaste
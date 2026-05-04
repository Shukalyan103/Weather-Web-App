
import { CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Sun } from "lucide-react";
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const weatherapiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const openweatherapiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const locationapiKey = import.meta.env.VITE_LOCATION_API_KEY;
  const [city, setCity] = useState('Delhi');
  const [citiesData, setCitiesData] = useState([])
  const [input, setInput] = useState('Delhi')
  const [cityLocated, setCityLocated] = useState([])
  const [loading, setLoading] = useState(false)
  const [coordinates, setCoordinates] = useState([28.6138954, 77.2090057])

  const getCity = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherapiKey}&q=${coordinates}`)
      const data = await response.json()
      setCitiesData(data)
      setLoading(false)

      // console.log(data)
    } catch (error) {
      console.error('Error fetching weather:', error)
      setLoading(false)
    }


  }
  const getCityLocation = async (cityNames) => {
    

    try {
      setLoading(true)
      const response = await fetch(`https://api.locationiq.com/v1/search?q=${cityNames}&key=${locationapiKey}&format=json&limit=1`)
      const data = await response.json()
      setCityLocated(data)
      setCoordinates([data[0].lat, data[0].lon])
      setLoading(false)

      // console.log(data)
    } catch (error) {
      console.error('Error fetching weather:', error)
      setLoading(false)
    }

  }

  useEffect(() => {
    if (city) {

      getCityLocation(city)
    }

  }, [city]);

  useEffect(() => {
    if (coordinates) {

      getCity()
    }

  }, [coordinates]);


  const decimalFix = (num) => {
    const newNum = Math.floor(num)
    return newNum
  }

  const weatherIcon = (Word, a) => {
    const NewWord = Word?.toLowerCase()
    if (NewWord?.includes('mist') ) {
      return <CloudFog className={a} />
    }
    if (NewWord?.includes('sunny','clear') || NewWord?.includes('clear')  ) {
      return <Sun className={a} />
    }
    if (NewWord?.includes('cloudy')) {
      return <CloudSun className={a} />
    }
    if (NewWord?.includes('drizzle')) {
      return <CloudDrizzle className={a} />
    }
    if (NewWord?.includes('rain')) {
      return <CloudRain className={a} />
    }
    if (NewWord?.includes('thunder')) {
      return <CloudLightning className={a} />
    }
  }


  const value = {
    weatherapiKey,
    openweatherapiKey, city, setCity, input, setInput, citiesData, setCitiesData, cityLocated, coordinates, decimalFix, weatherIcon, loading,setLoading
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}
import { Map, MapControls } from "@/components/ui/map";
import { AppContext } from '@/context/AppContext'
import React,{useContext, useRef, useEffect} from 'react'

const Maplocated = () => {

  const {citiesData}=useContext(AppContext)
  const mapRef = useRef(null)

  useEffect(() => {
    if(citiesData && citiesData.location?.lon && citiesData.location?.lat && mapRef.current) {
      const newCenter = [parseFloat(citiesData.location.lon), parseFloat(citiesData.location.lat)]
      mapRef.current.setCenter(newCenter)
    }
  }, [citiesData?.location?.lon, citiesData?.location?.lat])
  return (

    <>
    

    
    <div className="w-full h-full ">
      {citiesData && citiesData.location?.lon && citiesData.location?.lat &&
      <Map ref={mapRef} center={[parseFloat(citiesData.location.lon), parseFloat(citiesData.location.lat)]} zoom={14}>
       
      </Map> }
    </div>
   
    </>


  )
}

export default Maplocated
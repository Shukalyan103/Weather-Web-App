import { AppContext } from "@/context/AppContext";
import React, { useContext, useState,useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell
} from "recharts";



const data = [
  { time: "23:00", rain: 20 },
  { time: "00:00", rain: 40 },
  { time: "01:00", rain: 85 },
  { time: "02:00", rain: 60 },
  { time: "03:00", rain: 35 },
  { time: "04:00", rain: 15 }
];

const Chart = () => {
  const{openweatherapiKey, citiesData}=useContext(AppContext)

const [graph,setGraph]=useState([])

const graphData=async()=>{  
  try{
    if(!citiesData?.location?.lat || !citiesData?.location?.lon) {
      
      return
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${citiesData.location.lat}&lon=${citiesData.location.lon}&appid=${openweatherapiKey}&units=metric`).then(res => res.json())
    // console.log('Graph data response:', response)
    const format=  response?.list?.filter(item=>new Date(item.dt_txt)>new Date()).slice(0,6).map(item => ({
      time: new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rain: item.rain ? item.rain["3h"] : 0
    }))
    // console.log('Formatted graph data:', format)
    setGraph(format)



  }catch(error){
    console.error('Error fetching graph data:', error)
  }
}

useEffect(() => {
  graphData()
    

}, [citiesData?.location?.lat, citiesData?.location?.lon]);




  return (
    <div
     
      className="bg-[#0f1b3a] p-8 rounded-3xl w-full h-full text-white"
    >
      {/* Header */}
      <div className="mb-9">
        <h2 style={{ margin: 0 }}>Precipitation Graph</h2>
        <p style={{ color: "#8b9cc7" }}>
          Expected volume over the next 6 hours
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={graph  ? graph : data }>
          
          {/* Gradient */}
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B58CFF" />
              <stop offset="100%" stopColor="#6C5CE7" />
            </linearGradient>

            <linearGradient id="snowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5EFCE8" />
              <stop offset="100%" stopColor="#43E97B" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            axisLine={true}
            tickLine={false}
            tick={{ fill: "#8b9cc7" }}
          />

          <Tooltip />

          <Bar
            dataKey="rain"
            radius={[20, 20, 0, 0]}
          >
            {(graph.length > 0 ? graph : data).map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.rain > 50
                    ? "url(#snowGradient)"
                    : "url(#rainGradient)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "flex-end",
          marginTop: "10px"
        }}
      >
        <span>🟣 Rain</span>
        <span>🟢 Snow</span>
      </div>
    </div>
  );
};

export default Chart;
import React from 'react';
import {RadialBar, RadialBarChart, Tooltip } from 'recharts';
import { Image } from 'semantic-ui-react'
import '../App.css'

function MainChart(props) {

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
  console.log(payload[0].payload)
    return (
      <div className="tt" style={{ backgroundColor:payload[0].payload.fill }}>      
        <div style={{textAlign: 'center', fontSize: 36, fontWeight: 700}}>{payload[0].payload.value} Major League Players</div>
        <p style={{textAlign: 'center', fontSize: 36, fontWeight: 700}}>{payload[0].payload.name}</p>
        <div style={{display: 'flex', justifyContent: 'center', padding: 20}}><Image width={300} height={300} src={payload[0].payload.logo} rounded /></div>
      </div>
    );
  }
  return null;
};
    return (
    <div>	

      <RadialBarChart 

        width={1000} 
        height={1200} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={props.radialData} 
        startAngle={50} 
        endAngle={310}
>
  <RadialBar 
    fill="color" 
    minAngle={15} 
    label={{ fill: 'white', position: 'right', fontSize: '16pt' }} 
    background 
    clockWise={true} 
    dataKey='value' 
    nameKey='name' 
   
    />
      <Tooltip  content={<CustomTooltip />} />
  </RadialBarChart>

  </div>  

    );
  }

export default MainChart







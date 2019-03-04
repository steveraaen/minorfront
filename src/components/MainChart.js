import React from 'react';
import {RadialBar, RadialBarChart, Tooltip } from 'recharts';
import { Image } from 'semantic-ui-react'
import '../App.css'

function MainChart(props) {
/*  props.getBestMinors(props.selectedClass.code, props.selectedClass.regex, props.selectedYear, props.selectedClass)*/
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

  if(props.bestMinors && props.allMLB) {
  var radData = props.bestMinors.map((tm, idx) => {
    var radObj = {}
    for(let i = 0; i < props.allMLB.length; i++) {
      if(tm.franchise === props.allMLB[i].teamCode) {
        radObj.fill = props.allMLB[i].color
      }
    }
    radObj.name = tm.team
    radObj.value= tm.playerCount
    radObj.logo= tm.logo
    return radObj
  })

} 
    return (

    <div>	
      <RadialBarChart 
        width={1000} 
        height={1000} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={radData} 
        startAngle={0} 
        endAngle={300}
>
  <RadialBar 
    fill="color" 
    minAngle={15} 
    label={{ fill: 'white', position: 'right', fontSize: '16pt' }} 
    background 
    clockWise={true} 
    dataKey='value' 
   
    />
      <Tooltip  content={<CustomTooltip />} />
  </RadialBarChart>
  </div>  

    );
  }

export default MainChart







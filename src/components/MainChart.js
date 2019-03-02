import React, { useState, useEffect } from 'react';
import { AreaChart, BarChart, Label, Legend, Bar, Area, XAxis, YAxis, CartesianGrid, RadialBar, RadialBarChart, Tooltip } from 'recharts';
import { Button, Image, Popup } from 'semantic-ui-react'
import '../App.css'



function MainChart(props) {
/*  props.getBestMinors(props.selectedClass.code, props.selectedClass.regex, props.selectedYear, props.selectedClass)*/
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
  console.log(payload[0].payload)
    return (
      <div className="tt" style={{ backgroundColor:payload[0].payload.fill }}>      
        <p>{payload[0].payload.value}</p>
        <p>{payload[0].payload.name}</p>
        <p><Image width={200} height={200} src={payload[0].payload.logo} rounded /></p>
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
    <div style={{paddingTop: -20}}>	
      <RadialBarChart 
        width={800} 
        height={800} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={radData} 
        startAngle={270} 
        endAngle={90}


>
  <RadialBar 
    fill="color" 
    minAngle={15} 
    label={{ fill: 'black', position: 'end', fontSize: '16pt' }} 
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
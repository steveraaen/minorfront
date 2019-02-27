import React, { useState, useEffect } from 'react';
import { AreaChart, BarChart, Label, Legend, Bar, Area, XAxis, YAxis, CartesianGrid, RadialBar, RadialBarChart, Tooltip } from 'recharts';
import { Button, Image, Popup } from 'semantic-ui-react'



function MainChart(props) {
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
  console.log(payload)
    return (
      <div className="custom-tooltip">
      
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
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
    	<div >
      <RadialBarChart 
        width={1600} 
        height={1200} 
        innerRadius="10%" 
        outerRadius="80%" 
        data={radData} 
        startAngle={180} 
        endAngle={0}
        barGap={8}

>
  <RadialBar 
    fill="color" 
    minAngle={15} 
    label={{ fill: 'black', position: 'end' }} 
    background 
    clockWise={true} 
    dataKey='value' 
   
    />
      <Legend iconSize={30} width={300} height={140} layout='vertical' verticalAlign='top' align="right"/>
      <Tooltip content={<CustomTooltip />} />
  </RadialBarChart>
      <BarChart
        layout="vertical"
        width={800}
        height={800}
        data={props.bestMinors}
        margin={{
          top: 10, right: 10, bottom: 10, left: 10,
        }}
        legendType='line'
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
       
        <YAxis dataKey="team" width={100} type="category" />
        <Tooltip />
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right"/>
        <Bar  barGap={0} dataKey="playerCount"  label={{ position: 'center', fill: 'white' }}barSize={30} fill="#413ea0" />
    
      </BarChart>
      </div>
    );
  }

export default MainChart
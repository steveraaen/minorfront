import React, { useState, useEffect } from 'react';
import { AreaChart, BarChart, Label, Legend, Bar, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

function MainChart(props) {



    return (
    	<div style={{left: '25vw', top: '8vh', position: 'absolute'}}>
      <BarChart
        layout="vertical"
        width={1000}
        height={1000}
        data={props.bestMinors}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
        legendType='line'
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
       
        <YAxis dataKey="team" width={100} type="category" />
        <Tooltip />
        <Legend />
        <Bar barGap={0} dataKey="playerCount"  label={{ position: 'center', fill: 'white' }}barSize={30} fill="#413ea0" />
    
      </BarChart>
      </div>
    );
  }






export default MainChart
import React, { useState, useEffect } from 'react';
import { AreaChart, BarChart, Label, Legend, Bar, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

function MainChart(props) {



    return (
    	<div >
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
        <Legend />
        <Bar barGap={0} dataKey="playerCount"  label={{ position: 'center', fill: 'white' }}barSize={30} fill="#413ea0" />
    
      </BarChart>
      </div>
    );
  }






export default MainChart
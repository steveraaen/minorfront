import React, { useState, useEffect } from 'react';
import { AreaChart, BarChart, Legend, Bar, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';


function MainChart(props) {



    return (
    	<div>
     <BarChart
        width={2000}
        height={600}
        data={props.bestMinors}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="team" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="playerCount" fill="#8884d8" />
        
      </BarChart>
      </div>
    );
  }






export default MainChart
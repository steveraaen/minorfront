import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


function MainChart(props) {



    return (
      <AreaChart
        width={500}
        height={400}
        data={props.bestMinors}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="team" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="playerCount" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="yr"  stackId="2" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }






export default MainChart
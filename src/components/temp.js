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
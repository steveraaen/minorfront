import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import '../App.css'

function ClassPicker(props) {
  function handleClick(e) {
    console.log(e)  
      props.getBestMinors(e.code, e.regex) 
}
     var clsss = props.classes.map((lvl, idx) => {
      return (
        <Menu.Item 
        as='a'
        key={lvl.regex}>
        <Button 
          inverted color='orange'
          onClick={() => handleClick(lvl)}  
          value={lvl.code}>
          {lvl.name}
        </Button>
        </Menu.Item>
        )
          }) 
    return (
      <div>        
         <div>
          {clsss}
        </div>

    </div>
    );
}


export default ClassPicker;




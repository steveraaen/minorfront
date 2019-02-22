import React, { useState, useEffect } from 'react';
import { Button, Grid,Header, Icon, Image, Menu, Segment, Sidebar, Table } from 'semantic-ui-react'
import '../App.css'

function ClassPicker(props) {
  function handleClick(c, r) {

    console.log()  
      props.getBestMinors(c, r) 
}
/*  var mappedClasses = props.classes.map((tm, idx) => {
    var semanticClasses = {
        text: tm.name,
        value: tm.regex,
        key: tm.code
      }
    return semanticClasses
  }) */ 

    return (
    <div>
        <Button.Group>
        { props.classes.map((cl, idx) => {
          return(
             <Button key={cl.regex} onClick={() => handleClick(cl.code, cl.regex)}>{cl.name}</Button>
            )
        })
         
        }
        </Button.Group>
  </div>
    );
}
function MLBMaster(props) {
    var mappedMLB = props.allMLB.map((tm, idx) => {
    var semanticMLB = {
        text: tm.teamName,
        value: tm.teamCode,
        image: tm.picUrl,
        league: tm.league,
        key: tm.teamCode
      }
    return semanticMLB
  })
  return(
    <div style={{maxWidth: 20}}>
      <Table>
      <Table.Header>
        <Table.Row>
         
          <Table.HeaderCell>League</Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.allMLB.map((tm, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell>
           
          </Table.Cell>
          <Table.Cell>{tm.teamName}</Table.Cell>
          <Table.Cell><Image src={tm.picUrl} size="tiny" circular/></Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>

    </Table>
  </div>
)
}
export { MLBMaster, ClassPicker} ;





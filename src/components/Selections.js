import React, { useState, useEffect } from 'react';
import { Button,  Image, List,  Table } from 'semantic-ui-react'
import '../App.css'

function YearPicker(props) {
  function handleClick(c, r, y, n) {
    console.log(c)  
      props.getBestMinors(c, r, y, n) 
      props.setSelectedYear(y)
      props.setSelectedClass(n)
}
  return(
 
    <div>  
        <Button.Group>
        { props.years.map((yr, idx) => {
          return(
             <Button 
               basic color='teal'
               key={idx} 
               onClick={() => handleClick(props.selectedClass.code, props.selectedClass.regex, yr.value, props.selectedClass)}>{yr.text}</Button>
            )
        })        
       }
        </Button.Group>
       </div>

    )
}
function ClassPicker(props) {
  function handleClick(c, r, y, n) {   
      props.getBestMinors(c, r, y, n) 
      props.setSelectedYear(y)
      props.setSelectedClass(n)
}
    return ( 
    <div>  
        <Button.Group>
        { props.classes.map((cl, idx) => {
          return(
             <Button 
             basic color='teal' 
             key={cl.regex} 
             onClick={() => handleClick(cl.code, cl.regex, props.selectedYear, cl)}>{cl.name}</Button>
            )
        })         
        }
        </Button.Group>
     </div>
    );
}
function MinorTeamPicker (props) {
  function handleClick(c, r, y) { 
      props.getBestMinors(c, r, y) 
}
  return(
    <div>       
        { props.allMiLB.map((tm, idx) => {
          return(
             <div key={idx} style={{fontSize: 20, fontWeight:600}}>             
             <Image 
             width={80}
               src={tm.logo} 
               onClick={() => handleClick(props.selectedClass.code, props.selectedClass.regex, props.selectedYear,tm.team)}
                />
                {tm.team}
             </div>
            )
        })        
        }
        
  </div>
    )
}
function TeamList(props) {

  if(props.bestMinors) {
    return(
      <div style={{ height:"50vh", overflow: 'scroll'}}>
      <Table style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell></Table.HeaderCell>          
          <Table.HeaderCell>Team</Table.HeaderCell>          
          <Table.HeaderCell>MLB Players</Table.HeaderCell>          
          <Table.HeaderCell>Franchise</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.bestMinors.map((tm, idx) => {   
    for(let i = 0; i < props.allMLB.length; i++) {
      if(tm.franchise === props.allMLB[i].teamCode){
        tm.franchiseLogo= props.allMLB[i].picUrl
      }
    }
    return(
    <Table.Row onClick={() => props.getPlayerList(props.selectedClass.regex, tm.franchise, tm.yr)} key = {idx}>
          <Table.Cell><img width="80px" height="80px"  src={tm.logo} /></Table.Cell>
          <Table.Cell>{tm.team}</Table.Cell>
          <Table.Cell>{tm.playerCount}</Table.Cell>
          <Table.Cell><img width="80px" height="60px" src={tm.franchiseLogo} /></Table.Cell>
    </Table.Row>
      )
  })}
      </Table.Body>
      </Table>
      </div>
      )
} else {return(<div>.</div>)}

}

function Players(props) {
  if(props.playerList) {
  return(
    <div style={{ height:"50vh", overflow: 'scroll'}}>
      <Table style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell>Player</Table.HeaderCell>          
          <Table.HeaderCell>Team</Table.HeaderCell>          
          <Table.HeaderCell>At Bats</Table.HeaderCell>          
          <Table.HeaderCell>Average</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.playerList.map((pl, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell>{pl.playerName}</Table.Cell>
          <Table.Cell>{pl.teamID}</Table.Cell>
          <Table.Cell>{pl.AB}</Table.Cell>
          <Table.Cell>{pl.AVG}</Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>

    </Table>
  </div>
    )}
  else {return (<div>.</div>)}
}

export { ClassPicker, MinorTeamPicker, Players, TeamList, YearPicker} ;





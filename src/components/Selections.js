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
      <div width={3}>
      Select Year
     </div>  
    <div width={13}>  
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
    <div>
      Select Minor League Class
    </div>  
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
  console.log(props)
  if(props.bestMinors) {
  var listArray = props.bestMinors.map((tm, idx) => {
    
    for(let i = 0; i < props.allMLB.length; i++) {
      if(tm.franchise === props.allMLB[i].teamCode){
        tm.franchiseLogo= props.allMLB[i].picUrl
      }
    }
    return(
    <List.Item onClick={() => props.getPlayerList(props.selectedClass.regex, tm.franchise, tm.yr)} key = {idx}>
      <Image src={tm.franchiseLogo} width={63} height={35} />
      <List.Content>
        <List.Header as='a'>{tm.team}</List.Header>
        <List.Description>
          <a >
            <b>{tm.playerCount}</b>
          </a>{' major league players'}
        </List.Description>
      </List.Content>
      <Image src={tm.logo} width={63} height={35} />
    </List.Item>
      )
  })
}
  return(
    <List size="massive" ordered>{listArray}</List>
    )
}

function Players(props) {
  if(props.playerList) {
  return(
    <div style={{maxWidth: 20}}>
      <Table>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell>League</Table.HeaderCell>          
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





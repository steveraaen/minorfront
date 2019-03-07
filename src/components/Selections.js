import React from 'react';
import { Button, Checkbox, Form, Image,  Loader, Segment, Table } from 'semantic-ui-react'
import '../App.css'

function YearPicker(props) {
  function handleChange(e, { value }) {
console.log(value)
      props.getBestMinors(props.selectedClass.code, props.selectedDivision, props.selectedClass.regex, value) 
      props.setSelectedYear(value)   
}
  return(
    <div>  
    <Segment> 
        <Form.Group>
        { props.years.map((yr, idx) => {
          return(
             <Form.Checkbox 
             toggle
               label={yr.text}
               value={yr.value}
               key={idx} 
               onChange={handleChange}
               checked={props.selectedYear === yr.value}
               >
               </Form.Checkbox>
            )
        })        
       }
        </Form.Group>
        </Segment> 
       </div>

    )
}
function ClassPicker(props) {
  function handleChange(e, { value }) {
console.log(value)
      props.getBestMinors(value.code, props.selectedDivision, value.regex, props.selectedYear) 
      props.setSelectedClass(value)   
}

    return ( 
    <div> 
      <Segment> 
        <Form.Group>
        { props.classes.map((cl, idx) => {
          return(
             <Form.Checkbox 
             toggle
             label={cl.name}
             key={cl.regex} 
             value={cl}
             onChange={handleChange}
             checked={props.selectedClass === cl}
             >
             </Form.Checkbox>
            )
        })         
        }
        </Form.Group>
      </Segment> 
     </div>
    );
}

function Divisions(props) {
    function handleChange(e, {value}) { 
      props.setSelectedDivision(value) 
      props.getBestMinors(props.selectedClass.code, value, props.selectedClass.regex, props.selectedYear) 
}
  if(props.allDivisions) {
  return(
    <div>
     <Segment style={{alignItems: 'center'}}>
       <Form.Group> 
        <Form.Checkbox
         toggle
          key={'allMajors'}
          label={"All Major Leagues"}
          value={"L"}          
          onChange={handleChange}
          checked={props.selectedDivision === "L"}
        />

        </Form.Group>
            </Segment>
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <Segment >
     <Form.Group>     
        <Form.Checkbox
         toggle
          key={'allAL'}
          label={"All American League"}
          value={"A"}          
          onChange={handleChange}
          checked={props.selectedDivision === "A"}
        />
       {props.allDivisions.map((dv, idx) => {
         if(dv.league === "ALE" || dv.league === "ALC" || dv.league === "ALW") {
         return(
         <Form.Checkbox
         style={{backgroundColor: dv.color, width: 320, height: 40}}
         toggle
          key={idx}
          label={dv.display}
          value={dv.league}          
          onChange={handleChange}
          checked={props.selectedDivision === dv.league}
        />
           )} 
       })}     
    </Form.Group>
    </Segment>
    <Segment style={{marginTop: 0, paddingBottom: -6}}>
     <Form.Group>   
        <Form.Checkbox
         toggle
          key={'allNL'}
          label={"All National League"}
          value={"N"}          
          onChange={handleChange}
          checked={props.selectedDivision === "N"}
        />
       {props.allDivisions.map((dv, idx) => {
         if(dv.league === "NLE" || dv.league === "NLC" || dv.league === "NLW") {
         return(
         <Form.Checkbox
         style={{backgroundColor: dv.color, width: 320, height: 40}}
         toggle
          key={idx}
          label={dv.display}
          value={dv.league}          
          onChange={handleChange}
          checked={props.selectedDivision === dv.league}
        />
           )}
       })}     
    </Form.Group>
    </Segment>
    </div>
    </div>
    )
  } else {return <Loader active />}
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
        tm.color= props.allMLB[i].color
      }
    }
    return(
    <Table.Row 
      onClick={() => props.getPlayerList(props.selectedClass.regex, tm.franchise, tm.yr)} 
      key = {idx}

      >
          <Table.Cell><img alt="team logo" width="80px" height="80px"  src={tm.logo} /></Table.Cell>
          <Table.Cell style={{color: tm.color, fontSize: 30, fontWeight: 'bold'}}>{tm.team}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{tm.playerCount}</Table.Cell>
          <Table.Cell><img alt="team franchise logo" width="80px" height="80px" src={tm.franchiseLogo} /></Table.Cell>
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

export { ClassPicker, Divisions,  Players, TeamList, YearPicker} ;





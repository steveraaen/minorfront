import React from 'react';
import { Button, Card, Checkbox, Container, Form, Grid, Image, Label, Loader, Responsive, Statistic, Sticky, Segment, Table } from 'semantic-ui-react'
import '../App.css'

function YearPicker(props) {
  function handleChange(e, { value }) {
console.log(value)
      props.getBestMinors(props.selectedClass.code, props.selectedDivision.value, props.selectedClass.regex, value) 
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
      props.getBestMinors(value.code, props.selectedDivision.value, value.regex, props.selectedYear) 
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
    function handleChange(e, {value, label}) { 
      console.log(label)
      props.setSelectedDivision({value: value, display: label}) 
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
          checked={props.selectedDivision.value === "L"}
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
          checked={props.selectedDivision.value === "A"}
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
          checked={props.selectedDivision.value === dv.league}
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
          checked={props.selectedDivision.value === "N"}
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
          checked={props.selectedDivision.value === dv.league}
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
  if(props.radialData) {
    return( 
      <div style={{ height: '68vh', overflow: 'scroll'}}>
      <Table  style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      <Table.Header sticky="true">
        <Table.Row>                   
              
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>MLB Players</Table.HeaderCell>          
          <Table.HeaderCell style={{textAlign: "right"}}>Franchise</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.radialData.map((tm, idx) => {   
    for(let i = 0; i < props.allMLB.length; i++) {
      if(tm.franchise === props.allMLB[i].teamCode){
        tm.franchiseLogo= props.allMLB[i].picUrl
        tm.color= props.allMLB[i].color
      }
    }
    return(
    <Table.Row 
      onClick={() => {props.getPlayerList(props.selectedClass.regex, tm.franchise, props.selectedYear, tm.name)
                      props.setSelectedMiLBTeam(({name: tm.name, logo: tm.logo, franchise: tm.franchise, franchiseLogo: tm.franchiseLogo, color: tm.color, players: tm.value, division: tm.division}))
                    } }
      key = {idx}
      >              
          <Table.Cell style={{color: tm.color, fontSize: 30, fontWeight: 'bold', width: 24, overflow: 'hidden', textOverflow: 'ellipsis'}}>{tm.name}</Table.Cell>
          <Table.Cell style={{color: 'black', fontSize: 30, fontWeight: 'bold', width: 20}}>{tm.value}</Table.Cell>
          <Table.Cell style={{width: 10}}><img alt="team franchise logo" width={120} height={90} src={tm.franchiseLogo} /></Table.Cell>
    </Table.Row>
      )
  })}
      </Table.Body>
      </Table>
      </div> 
      )
} else {return(<div>.</div>)}
}

function Batters(props) {
  if(props.playerList) {
  return(
    <div style={{ height:"34vh", overflow: 'scroll'}}>
    <Segment>
      <Table compact style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>Batter</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>At Bats</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>Average</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.playerList.map((pl, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{pl.playerName}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold', color: pl.color}}>{pl.teamID}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{pl.AB}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{parseFloat(pl.AVG).toFixed(3)}</Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>
    </Table>
    </Segment>
  </div>
    )}
  else {return (<div>.</div>)}
}
function Pitchers(props) {
  if(props.pitcherList) {
    return(
      <div style={{ height: '34vh', overflow: 'scroll'}}>
      <Segment>
      <Table compact style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>Pitcher</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>Innings</Table.HeaderCell>                   
          <Table.HeaderCell style={{fontSize: 30, fontWeight: 'bold'}}>ERA</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.pitcherList.map((pt, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{pt.playerName}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold', color: pt.color}}>{pt.teamID}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{pt.IP.toFixed(1)}</Table.Cell>
          <Table.Cell style={{fontSize: 30, fontWeight: 'bold'}}>{parseFloat(9 * (pt.ER / pt.IP)).toFixed(2)}</Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>
    </Table>
    </Segment>
    </div>
        )
    } else {return(<div></div>)}
}
function Stats(props) {
  function HandleClick(tm, yr, cl, dv, ba, pi) {
   props.saveStats(tm, yr, cl, dv, ba, pi)
  }

  if(props.synthStats && props.selectedMiLBTeam.name){
return(
  <div>
  <Segment>
    <Statistic.Group>
  <Image src={props.selectedMiLBTeam.logo} width={220} height={180}/>
        <Statistic size='mini'>     
        <Statistic.Value style={{color: props.selectedMiLBTeam.color}}>{props.selectedMiLBTeam.name}</Statistic.Value>         
      </Statistic>
      <Statistic size='mini'>    
        <Statistic.Value>{props.selectedYear}</Statistic.Value> 
        <Statistic.Label>Year</Statistic.Label>       
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Value>{props.synthStats.batting.bat.AB}</Statistic.Value> 
        <Statistic.Label>At Bats</Statistic.Label>       
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Value>{props.synthStats.batting.bat.AVG}</Statistic.Value>   
        <Statistic.Label>Batting Average</Statistic.Label>     
      </Statistic>

      <Statistic size='mini'>
        <Statistic.Value>{props.synthStats.pitching.pit.IP.toFixed(1)}</Statistic.Value>  
        <Statistic.Label>Innings Pitched</Statistic.Label>      
      </Statistic>
      <Statistic size='mini'>

        <Statistic.Value>{props.synthStats.pitching.pit.ERA}</Statistic.Value> 
        <Statistic.Label>ERA</Statistic.Label>       
      </Statistic>
    </Statistic.Group>
 {/*    <Button onClick={() => HandleClick(props.selectedMiLBTeam, props.selectedYear, props.selectedClass.name, props.selectedMiLBTeam.division, props.synthStats.allPlayers.bat, props.synthStats.allPlayers.pit )} />*/}
    </Segment>
  </div>
    )
  } else {return null}
}
function CurrentParams(props) {
  return(
    <Statistic.Group>
      <Statistic size='small'>
        <Statistic.Label>Minor League Class</Statistic.Label>
        <Statistic.Value>{props.selectedClass.name}</Statistic.Value>        
      </Statistic>
      <Statistic size='small'>
        <Statistic.Label>Minor League Year</Statistic.Label>
        <Statistic.Value>{props.selectedYear}</Statistic.Value>        
      </Statistic>
      <Statistic size='small'>
        <Statistic.Label>Major League Selection</Statistic.Label>
        <Statistic.Value>{props.selectedDivision.display}</Statistic.Value>        
      </Statistic>
     
    </Statistic.Group>
    )
}
function LeaderBoard(props) {
  if(props.topTenBatting && props.topTenPitching) {

  return(
    <Grid>
      <Grid.Row>
        {props.topTenBatting.map((tarr, ix) => {
          return(
            <Grid.Column width="3">
            {tarr[ix].cl}
              {tarr.map((tm, idx) => {
                return(
                  <div>
                  {idx + 1}
                  <Card.Group>
                    <Card>
                      <Card.Content>
                      <Image src={tm.logo} width="100" height="100"/>
                        <Card.Meta>{tm.yr}</Card.Meta>
                        <Card.Description>{tm.milbTeam}</Card.Description>
                          <Statistic>
                            <Statistic.Value>{tm.bAB}</Statistic.Value>
                            <Statistic.Label>At Bats</Statistic.Label>
                          </Statistic>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                  </div>
                  )
              })}
            </Grid.Column>
            )
        })}
      </Grid.Row>
    </Grid>

    )
} else {return null}
}
export { ClassPicker, CurrentParams, Divisions, LeaderBoard, Batters, Pitchers, Stats, TeamList, YearPicker} ;





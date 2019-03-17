import React, { useState, useEffect } from 'react';
import { Button, Card, Checkbox, Container, Divider, Form, Grid, Header, Image, Label, Loader, Responsive, Statistic, Sticky, Segment, Table } from 'semantic-ui-react'
import Collapsible from 'react-collapsible';
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
      props.getTopTen(value.name) 
      
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
      <Table  selectable compact basic="very">
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
          <Table.Cell style={{width: 10}}><img alt="team franchise logo" width={100} height={80} src={tm.franchiseLogo} /></Table.Cell>
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
/*   props.saveStats(tm, yr, cl, dv, ba, pi)*/
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
function BestFive(props) {

  if(props.topTen && props.allMLB && props.selectedClass && props.selectedMiLBTeam) {
    useEffect(() => {
       props.setSelectedMiLBTeam({name: props.topTen.topTenBatting[0].milbTeam, logo: props.topTen.topTenBatting[0].logo, franchise: props.topTen.topTenBatting[0].majteam, franchiseLogo: props.topTen.topTenBatting[0].franchiseLogo, color: props.topTen.topTenBatting[0].color})
       props.getPlayerList(props.selectedClass.regex, props.topTen.topTenBatting[0].majteam, props.topTen.topTenBatting[0].yr, props.topTen.topTenBatting[0].milbTeam)
        props.setSelectedYear(props.topTen.topTenBatting[0].yr) 
    }, {})

   const handleClick = (e) => { 
console.log(e)
        props.getPlayerList(props.selectedClass.regex, e.majteam, e.yr, e.milbTeam)
        props.setSelectedMiLBTeam({name: e.milbTeam, logo: e.logo, franchise: e.majteam, franchiseLogo: e.franchiseLogo, color: e.color, t_id: e.id})
        props.setSelectedYear(e.yr) 
   }
  return(
    <Collapsible open trigger="See Standings" triggerStyle={{width: '100vw'}}>    
     <Grid padded="vertically">
    <Grid.Row>
    <Segment style={{marginTop: 2, height: 1100}}>
      <Grid.Column width={4}>
        <Header>{props.selectedClass.name} Batting</Header>
        <Table selectable compact striped>
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Average</Table.HeaderCell>
            <Table.HeaderCell>Home Runs</Table.HeaderCell>
            <Table.HeaderCell>Strikeouts</Table.HeaderCell>
            <Table.HeaderCell>At Bats</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.topTen.topTenBatting.map((btm, idx) => {
            btm.id=idx
            return(

              <Table.Row                 
                    onClick={(e) => {   
                      handleClick(btm, props.selectedMiLBTeam)                                  
                    }}   
                    active={props.selectedMiLBTeam.t_id === idx}             
                     key={idx}>
              <Table.Cell>
              {idx + 1}
              </Table.Cell>
              <Table.Cell value={btm}><Image src={btm.logo} /></Table.Cell>
                <Table.Cell value={btm}>
                  <p style={{fontSize: '.8vw', fontWeight: 600}}>{btm.yr}</p>
                  <p style={{fontSize: '.8vw', fontWeight: 600}}>
                    {btm.milbTeam}
                   </p>
                  <p style={{fontSize: '.4vw'}}>
                    {props.allMLB.map(nm => {
                      if(nm.teamCode === btm.majteam) {
                        return nm.teamName
                      }
                    })}
                  </p>
                </Table.Cell>
                <Table.Cell value={btm}>{btm.bBA}</Table.Cell>
                <Table.Cell value={btm}>{btm.bHR}</Table.Cell>
                <Table.Cell value={btm}>{btm.bSO}</Table.Cell>
                <Table.Cell value={btm}>{btm.bBA}</Table.Cell>
              </Table.Row>
              )
          })}
        </Table.Body>
        </Table>
      </Grid.Column>
      </Segment>
      <Segment style={{marginTop: 2, height: 900}}>
      <Grid.Column  width={4}>
<Header>{props.selectedClass.name} Pitching</Header>
        <Table  compact striped >
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>ERA</Table.HeaderCell>
            <Table.HeaderCell>Wins</Table.HeaderCell>
            <Table.HeaderCell>Losses</Table.HeaderCell>
            <Table.HeaderCell>Saves</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.topTen.topTenPitching.map((ptm, ix) => {
            ptm.id=ix + 5
            return(

              <Table.Row                 
                    onClick={(e) => {   
                      handleClick(ptm, props.selectedMiLBTeam)                                  
                    }}   
                    active={props.selectedMiLBTeam.t_id === ix + 5}             
                     key={ix}>
              <Table.Cell>{ix + 1}</Table.Cell>
              <Table.Cell><Image src={ptm.logo} /></Table.Cell>
                <Table.Cell>
                <p style={{fontSize: '.8vw', fontWeight: 600}}>{ptm.yr}</p>
                  <p style={{fontSize: '.8vw', fontWeight: 600}}>
                    {ptm.milbTeam}
                   </p>
                  <p style={{fontSize: '.4vw'}}>
                    {props.allMLB.map(nm => {
                      if(nm.teamCode === ptm.majteam) {
                        return nm.teamName
                      }
                    })}
                  </p>
                </Table.Cell>
                <Table.Cell>{ptm.pER}</Table.Cell>
                <Table.Cell>{ptm.pW}</Table.Cell>
                <Table.Cell>{ptm.pL}</Table.Cell>
                <Table.Cell>{ptm.pSV}</Table.Cell>
              </Table.Row>
              )
          })}
        </Table.Body>
        </Table>
      </Grid.Column>
      </Segment>
    </Grid.Row>       
     </Grid>

    </Collapsible>
    )
} else {return <div>...</div>}
}

export { BestFive, ClassPicker, CurrentParams, Divisions, Batters, Pitchers, Stats, TeamList, YearPicker} ;





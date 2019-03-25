import React, { useEffect } from 'react';
import { Card, Container, Divider, Form, Grid, Header, Image, Loader, Modal, Placeholder, Statistic,  Segment, Sticky, Table } from 'semantic-ui-react'
import Collapsible from 'react-collapsible';
import '../App.css'

function YearPicker(props) {
  function handleChange(e, { value }) {
  console.log(e.target)
     /* props.getBestMinors(props.selectedClass.code, props.selectedDivision.value, props.selectedClass.regex, value) */
      props.setSelectedYear(value) 
      props.getTopTen(props.selectedClass.name, value, props.selectedDivision.value) 
      props.setSelectedMiLBTeam(props.topTen.topTenBatting[0])
/*  props.getPlayerList(props.selectedClass.regex, props.selectedMiLBTeam.franchise, value, props.selectedMiLBTeam.name)
*/}
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
/*      props.getBestMinors(JSON.parse(value).code, props.selectedDivision.value, JSON.parse(value).regex, props.selectedYear) 
*/      props.setSelectedClass(value)  
        props.getTopTen(value.code, props.selectedYear, props.selectedDivision.value) 
/*        props.getPlayerList(value.regex, props.selectedMiLBTeam.franchise, props.selectedYear, props.selectedMiLBTeam.name)
*/
}
var tempObj = {
      displayName: "All MiLB Classes",
      name: "%%",
      code: "%%",
      regex: "%"
}
    return ( 
    <div> 
     <Segment style={{alignItems: 'center'}}>
       <Form.Group> 
        <Form.Checkbox
         toggle
          key={'allClasses'}
          label={"All MiLB Classes"}
          value={tempObj}          
          onChange={handleChange}
          checked={props.selectedClass === tempObj}
        />
        </Form.Group>
    </Segment>
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
      console.log(value)
      props.setSelectedDivision({value: value, display: label}) 
      props.getTopTen(props.selectedClass.name, props.selectedYear, value) 
    /*  props.getPlayerList(props.selectedClass.regex, props.selectedMiLBTeam.franchise, props.selectedYear, props.selectedMiLBTeam.name)*/
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
          value={"%L%"}          
          onChange={handleChange}
          checked={props.selectedDivision.value === "%L%"}
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
          value={"A%%"}          
          onChange={handleChange}
          checked={props.selectedDivision.value === "A%%"}
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
           )} else {return null}
       })}     
    </Form.Group>
    </Segment>
    <Segment style={{marginTop: 0, paddingBottom: -6}}>
     <Form.Group>   
        <Form.Checkbox
         toggle
          key={'allNL'}
          label={"All National League"}
          value={"N%%"}          
          onChange={handleChange}
          checked={props.selectedDivision.value === "N%%"}
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
           )} else {return null}
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
      <div>
      <Table  selectable >
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

const Batters = (props) => {
  if(props.playerList) {
  return(
    <div style={{width: '45vw', marginTop: 2, height: 240, overflowY: 'scroll', paddingBottom: 10}}>
    <Segment>
    <Header> </Header>
      <Table compact >
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell  style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Batter</Table.HeaderCell>          
          <Table.HeaderCell  style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell  style={{fontSize: '1.2rem', fontWeight: 'bold'}}>At Bats</Table.HeaderCell>          
          <Table.HeaderCell  style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Average</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.playerList.map((pl, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell  style={{fontSize: '1.2rem', fontWeight: 'bold'}} >{pl.playerName}</Table.Cell>
          <Table.Cell style={{fontSize: '1.2rem', fontWeight: 'bold', color: pl.color}}>{pl.teamID}</Table.Cell>
          <Table.Cell  style={{fontSize: '1.2rem', fontWeight: 'bold'}} >{pl.AB}</Table.Cell>
          <Table.Cell  style={{fontSize: '1.2rem', fontWeight: 'bold'}} >{parseFloat(pl.AVG).toFixed(3)}</Table.Cell>
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
      <div style={{width: '45vw', marginTop: 2, height: 240, overflowY: 'scroll'}}>
      <Segment>
      <Table compact>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Pitcher</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Innings</Table.HeaderCell>                   
          <Table.HeaderCell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>ERA</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.pitcherList.map((pt, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{pt.playerName}</Table.Cell>
          <Table.Cell style={{fontSize: '1.2rem', fontWeight: 'bold', color: pt.color}}>{pt.teamID}</Table.Cell>
          <Table.Cell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{pt.IP.toFixed(1)}</Table.Cell>
          <Table.Cell style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{parseFloat(9 * (pt.ER / pt.IP)).toFixed(2)}</Table.Cell>
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
  if(props.synthStats && props.selectedMiLBTeam.name && props.players.playerList && props.players.pitcherList){
return(
  <Modal defaultOpen={true}>

    <Modal.Content wrapped basic image>

  <Segment  style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
   <div style={{display: 'flex', flexDirection: 'row', fontSize: '1.6rem', fontWeight: 600}}>{props.selectedYear}
   <div style={{fontSize: '1.6rem', fontWeight: 600, color: props.selectedMiLBTeam.color}}>{props.selectedMiLBTeam.name}</div></div>          

   <Image rounded src={props.selectedMiLBTeam.logo} width={110} height={84}/>
 
    <Segment >    
      <Statistic size="mini">
        <Statistic.Value>{props.synthStats.batting.bat.AB}</Statistic.Value> 
        <Statistic.Label>At Bats</Statistic.Label>       
      </Statistic>
      <Statistic size="mini">
        <Statistic.Value>{props.synthStats.batting.bat.AVG}</Statistic.Value>   
        <Statistic.Label>Batting Average</Statistic.Label>     
      </Statistic>
      <Statistic size="mini">
        <Statistic.Value>{props.synthStats.pitching.pit.IP.toFixed(1)}</Statistic.Value>  
        <Statistic.Label>Innings Pitched</Statistic.Label>      
      </Statistic>
      <Statistic size="mini">

        <Statistic.Value>{props.synthStats.pitching.pit.ERA}</Statistic.Value> 
        <Statistic.Label>ER Avg.</Statistic.Label>       
      </Statistic>
      <Statistic size="mini"> 
        <Statistic.Value>{props.players.playerList.length + props.players.pitcherList.length}</Statistic.Value> 
        <Statistic.Label>2018 MLB Players</Statistic.Label>       
      </Statistic>   
    </Segment>
   </Segment>
   <Segment style={{display: 'flex', flexDirection: 'column'}}>
         <Batters
          {...props.batterList} 
          selectedMiLBTeam={props.selectedMiLBTeam} 
          synthStats={props.synthStats} />
     <Pitchers
          {...props.pitcherList} 
          selectedMiLBTeam={props.selectedMiLBTeam} 
          synthStats={props.synthStats} />
   </Segment>

    </Modal.Content>
  </Modal>

    )
  } else {
    return (
<Placeholder />
      )}
}
function CurrentParams(props) {
  return(
    <Statistic.Group>
      <Statistic size='mini'>
        <Statistic.Label>Minor League Class</Statistic.Label>
        <Statistic.Value>{props.selectedClass.name}</Statistic.Value>        
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Label>Minor League Year</Statistic.Label>
        <Statistic.Value>{props.selectedYear}</Statistic.Value>        
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Label>Major League Selection</Statistic.Label>
        <Statistic.Value>{props.selectedDivision.display}</Statistic.Value>        
      </Statistic>
     
    </Statistic.Group>
    )
}
function BestFive(props) {

  if(props.topTen && props.allMLB && props.selectedClass /*&& props.selectedMiLBTeam*/) {
    useEffect(() => {
       props.setSelectedMiLBTeam({name: props.topTen.topTenBatting[0].milbTeam, logo: props.topTen.topTenBatting[0].logo, franchise: props.topTen.topTenBatting[0].majteam, franchiseLogo: props.topTen.topTenBatting[0].franchiseLogo, color: props.topTen.topTenBatting[0].color})
/*       props.getPlayerList(props.selectedClass.regex, props.topTen.topTenBatting[0].majteam, props.topTen.topTenBatting[0].yr, props.topTen.topTenBatting[0].milbTeam)
*/      /*  props.setSelectedYear(props.topTen.topTenBatting[0].yr) */
    }, {})
   const handleClick = (e) => { 
      console.log(e)
        props.getPlayerList(props.selectedClass.regex, e.majteam, e.yr, e.milbTeam)
        props.setSelectedMiLBTeam({name: e.milbTeam, logo: e.logo, franchise: e.majteam, franchiseLogo: e.franchiseLogo, color: e.color, t_id: e.id})
       /* props.setSelectedYear(e.yr) */
   }
  const handleBSort = (e) => {
    console.log(e)
    props.sortBTable(e)
  }
  const handlePSort = (e) => {
    console.log(e)
    props.sortPTable(e)
  }
  return( 
  <Grid>  
   <Grid.Row columns="2">
   <Grid.Column  style={{display: 'flex', flexDirection: 'row'}}>
   <div style={{minWidth: '45vw', maxHeight: 500, overflowY: 'scroll'}}>
        <Table style={{backgroundColor: 'seashell'}} compact='very'>
      
          <Table.Header>
          
          <Table.Row   style={{fontSize: '.7rem'}}>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bBA')}
           >AVG
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bHR')}
           >HRs
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bH')}>
           >Hits
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bBB')}
           >Walks
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bAB')}
           >At Bats
            
            </Table.HeaderCell>
          </Table.Row>
          
        </Table.Header>
        
        <Table.Body>
          { props.topTenHit && props.topTenHit.map((btm, idx) => {
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
              <Table.Cell value={btm}>
                <Image size="tiny" src={btm.logo} />
                <p>{btm.cl}</p>
              </Table.Cell>
                <Table.Cell value={btm}>
                  <p style={{fontSize: '.8rem', fontWeight: 600}}>{btm.yr}</p>
                  <p style={{color: btm.color, fontSize: '.8rem', fontWeight: 600}}>
                    {btm.milbTeam}
                   </p>
                  <p style={{fontSize: '1rem'}}>
                    {props.allMLB.map(nm => {
                      if(nm.teamCode === btm.majteam) {
                        return nm.teamName
                      } else {return null}
                    })}
                  </p>
                </Table.Cell>
                <Table.Cell value={btm}>{btm.bBA}</Table.Cell>
                <Table.Cell value={btm}>{btm.bHR}</Table.Cell>
                <Table.Cell value={btm}>{btm.bH}</Table.Cell>
                <Table.Cell value={btm}>{btm.bBB}</Table.Cell>
                <Table.Cell value={btm}>{btm.bAB}</Table.Cell>
              </Table.Row>
              )
          })}
        </Table.Body>
        </Table>        
        </div>
        </Grid.Column>
        <Grid.Column>
           <div style={{minWidth: '45vw', maxHeight: 500}}>
        <Table style={{backgroundColor: 'seashell'}} compact='very'>
          <Table.Header>
          <Table.Row style={{fontSize: '.7rem'}}>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pERA')}>ERA</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pW')}>Wins</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pL')}>Losses</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pSV')}>Saves</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pIP')}>Innings </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.topTenPitch && props.topTenPitch.map((ptm, ix) => {
            ptm.id=ix + 5
            return(

              <Table.Row                 
                    onClick={(e) => {   
                      handleClick(ptm, props.selectedMiLBTeam)                                  
                    }}   
                    active={props.selectedMiLBTeam.t_id === ix + 5}             
                     key={ix}>
              <Table.Cell>{ix + 1}</Table.Cell>
              <Table.Cell>
                <Image size="tiny" src={ptm.logo} />
                <p>{ptm.cl}</p>
              </Table.Cell>
                <Table.Cell>
                <p style={{fontSize: '.8rem', fontWeight: 600}}>{ptm.yr}</p>
                  <p style={{color: ptm.color, fontSize: '.8rem', fontWeight: 600}}>
                    {ptm.milbTeam}
                   </p>
                  <p style={{fontSize: '1rem'}}>
                    {props.allMLB.map(nm => {
                      if(nm.teamCode === ptm.majteam) {
                        return nm.teamName
                      } else {return null}
                    })}
                  </p>
                </Table.Cell>
                <Table.Cell>{ptm.pERA}</Table.Cell>
                <Table.Cell>{ptm.pW}</Table.Cell>
                <Table.Cell>{ptm.pL}</Table.Cell>
                <Table.Cell>{ptm.pSV}</Table.Cell>
                <Table.Cell>{ptm.pIP}</Table.Cell>
              </Table.Row>
              )
          })}
        </Table.Body>
        </Table>
        </div>
        </Grid.Column>
        </Grid.Row>
       </Grid> 
    )
} else {return <div>...</div>}
}
function BestPlayers(props) {
  if(props.players.playerList && props.players.pitcherList){
return(
  <Container>
  <Table style={{width: '45vw'}} unstackable>
  <Table.Header>
      <Table.Row style={{fontSize: '1rem', fontWeight: 600}}>
         <Table.HeaderCell>Best MLB 2018 Hitter </Table.HeaderCell>
         <Table.HeaderCell>Avg.</Table.HeaderCell>
         <Table.HeaderCell>Hits</Table.HeaderCell>
         <Table.HeaderCell>RBI</Table.HeaderCell>
         <Table.HeaderCell>HR</Table.HeaderCell>
         <Table.HeaderCell>At Bats</Table.HeaderCell>
      </Table.Row> 
      </Table.Header>
    <Table.Body>
      <Table.Row style={{fontSize: '1.2rem'}}>
      <Table.Cell>
      <span>{props.players.playerList[0].playerName}<br/><div style={{color: props.players.pitcherList[0].color}}>{props.players.pitcherList[0].teamName}</div></span>
      </Table.Cell>
      <Table.Cell>{parseFloat(props.players.playerList[0].AVG).toFixed(3)}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].H}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].RBI}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].HR}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].AB}</Table.Cell>
      </Table.Row>
     </Table.Body>
     <Table.Header>
      <Table.Row style={{fontSize: '1rem', fontWeight: 600}}>
         <Table.HeaderCell>Best MLB 2018 Pitcher </Table.HeaderCell>       
         <Table.HeaderCell>Innings</Table.HeaderCell>
         <Table.HeaderCell>ER Avg.</Table.HeaderCell>
         <Table.HeaderCell>Wins</Table.HeaderCell>
         <Table.HeaderCell>Losses</Table.HeaderCell>
         <Table.HeaderCell>Saves</Table.HeaderCell>
      </Table.Row>
      </Table.Header> 
    <Table.Body>
    <Table.Row style={{fontSize: '1.2rem'}}>
      <Table.Cell>
      <span>{props.players.pitcherList[0].playerName}<br/><div style={{color: props.players.playerList[0].color}}>{props.players.playerList[0].teamName}</div></span>
      </Table.Cell>
      <Table.Cell>{parseFloat(props.players.pitcherList[0].IP).toFixed(1)}</Table.Cell>
      <Table.Cell>{parseFloat(9 * (props.players.pitcherList[0].ER / props.players.pitcherList[0].IP)).toFixed(2)}</Table.Cell>
      <Table.Cell>{props.players.pitcherList[0].W}</Table.Cell>
      <Table.Cell>{props.players.pitcherList[0].L}</Table.Cell>
      <Table.Cell>{props.players.pitcherList[0].SV}</Table.Cell>
    </Table.Row>
    </Table.Body>
  </Table>
  </Container>
  ) 
} else {return <div></div>}
}
export { BestFive, BestPlayers, ClassPicker, CurrentParams, Divisions, Batters, Pitchers, Stats, TeamList, YearPicker} ;





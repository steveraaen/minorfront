import React, { useState, useEffect } from 'react';
import { Card, Grid, Icon, Responsive, Segment } from 'semantic-ui-react'

import axios from 'axios'
import Collapsible from 'react-collapsible';
import { BestFive, ClassPicker, CurrentParams, Batters, LeaderBoard, Pitchers, TeamList, YearPicker, Divisions, Stats } from './components/Selections.js'
import MainChart from './components/MainChart'

import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import leagues from './assets/leagues.js'

const yrs = [
    { text: "2013", value: 2013, key: "2013" },
    { text: "2014", value: 2014, key: "2014" },
    { text: "2015", value: 2015, key: "2015" },
    { text: "2016", value: 2016, key: "2016" },
    { text: "2017", value: 2017, key: "2017" },
    { text: "2018", value: 2018, key: "2018" }
]

function App() {
   /* const [allMiLB, setAllMiLB] = useState(allMinorTeams);*/
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [minors, setMinors] = useState({});
    const [years] = useState(yrs);
    const [bestMinors, setBestMinors] = useState();
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(2013);
    const [playerList, setPlayerList] = useState();
    const [pitcherList, setPitcherList] = useState();
    const [classIcon] = useState('angle down');
    const [allDivisions, setAllDivisions] = useState();
    const [selectedDivision, setSelectedDivision] = useState({value: "L", display: "All Major League Teams"});
    const [radialData, setRadialData] = useState();
    const [synthStats, setSynthStats] = useState();
    const [selectedMiLBTeam, setSelectedMiLBTeam] = useState();
    const [statsToDb, setStatsToDb] = useState();
    const [topTen, setTopTen] = useState();
    const [classStats, setClassStats] = useState();
   
    async function getTopTen(cl) {
      try {
        
        
        const topTenPromise = axios('/api/classSummary', { params: { cl } })
        const topTen = await topTenPromise; 
        console.log(topTen)
        setTopTen({
          topTenBatting: topTen.data[1],
          topTenPitching: topTen.data[0]
        })       
      }
    catch (e) {
    console.error(e);  
  };
    }


    function makeDivs() {
      var uniqueDivisions = allMLB.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.league === thing.league && t.color === thing.color
      ))
    )
  return setAllDivisions({allDivisions: uniqueDivisions})
    }
    async function saveStats(tm, yr, dv, cl, ba, pi) {

        await axios.get('/api/sendStats', { params: {tm, yr, dv, cl, ba, pi}})

            .catch(err => {
                console.log(err);
                return null;
            });
    }
    async function getMinors() {
        await axios.get('/api/allMinors')
            .then(res => {
                console.log(res)
                setMinors({
                    minors: res.data
                })
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }
    async function getBestMinors(p, d, m, y) {
      console.log(p,d, m,y)
        await axios.get('/api/bestMinors', { params: { p, d, m, y } })
            .then(res => {
              console.log(res.data)
                var radialFormatted = res.data.map((tm, idx) => {
                var radObj = {}
                for(let i = 0; i < allMLB.length; i++) {
                  if(tm.franchise === allMLB[i].teamCode) {
                    radObj.fill = allMLB[i].color
                    radObj.franchiseLogo = allMLB[i].picUrl
                    radObj.division= allMLB[i].display
                    radObj.franchise= allMLB[i].teamCode
                    }
                }
                  radObj.name = tm.team
                  radObj.value= tm.playerCount
                  radObj.logo= tm.logo
                  
                  return radObj
                })
                 setRadialData({
                   radialData: radialFormatted.sort((a, b) => (a.value < b.value) ? 1 : -1)
                 })
              
                setBestMinors({
                    bestMinors: res.data
                })
                 setPlayerList({
                    playerList: null
                })
                 setPitcherList({
                    pitcherList: null
                })
                 setSelectedMiLBTeam({
                    selectedMiLBTeam: null
                })
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    async function getPlayerList(r, f, y, t) {
      try {
        console.log(selectedDivision)
        const batterPromise = axios('/api/batterList', { params: { r, f, y, t } })
        const pitcherPromise = axios('/api/pitcherList', { params: { r, f, y, t } })
        const [batterList, pitcherList] = await Promise.all([batterPromise, pitcherPromise]);                    
           var batStats = {}
           batStats.bat = batterList.data.reduce((a, b) => ({
               AB: a.AB + b.AB,
               H: a.H + b.H,
               AVG: ((a.H + b.H) /(a.AB + b.AB)).toFixed(3),
               SB: a.SB = b.SB,
               SO: a.SO + b.SO,
               HR: a.HR + b.HR,
               HBP: a.HBP + b.HBP,
               BB: a.BB + b.BB,
               G: a.G + b.G

             })
           )
           var pitStats = {}
           pitStats.pit = pitcherList.data.reduce((a, b) => ({
               ERA: (9 * (a.ER + b.ER) / (a.IP + b.IP)).toFixed(2),
               IP: a.IP + b.IP,
               SO: a.SO + b.SO,
               BB: a.BB + b.BB,
               ER: a.ER + b.ER,
               H: a.H + b.H,
               SV: a.SV + b.SV,
               W: a.W + b.W,
               L: a.L + b.L,
               G: a.G + b.G,
               GS: a.GS + b.GS,
               HBP: a.HBP + b.HBP,
               IBB: a.IBB + b.IBB,
             })
           )              
          setSynthStats({
            synthStats: {
              batting: batStats,
              pitching: pitStats,
              allPlayers: { ...batStats, ...pitStats}
            }
          })

           batterList.data.map((plyr, idx) => {               
             for(let i = 0; i < allMLB.length; i++) {
               if(plyr.teamID === allMLB[i].teamCode) {
                 plyr.color = allMLB[i].color
               }
             }
           })
           pitcherList.data.map((ptchr, idx) => {               
             for(let i = 0; i < allMLB.length; i++) {
               if(ptchr.teamID === allMLB[i].teamCode) {
                 ptchr.color = allMLB[i].color
               }
             }
           })
            setPlayerList({
                playerList: batterList.data
            })
            setPitcherList({
                pitcherList: pitcherList.data
            })               
      }
             catch (e) {
    console.error(e);  
  };
    }
    useEffect(() => {
        getTopTen(selectedClass.name)
    }, {});
    useEffect(() => {
        getMinors()
    }, {});
    useEffect(() => {
        makeDivs()
    }, {});
    useEffect(() => {
        getBestMinors(selectedClass.code, selectedDivision.value, selectedClass.regex, selectedYear)
    }, {});

    return (

  <Grid  stackable>

      <BestFive
        topTen={topTen}
        classStats={classStats} 
        selectedClass={selectedClass}
        allMLB={allMLB}/>
  
  <Grid.Row>
      <Grid.Column width="16">
      
        <Segment stacked>
           <Collapsible 
            trigger={<div>Select Minor League Class, Year and Franchise  <Icon name={classIcon} /></div>} 
            triggerStyle={{fontSize: 36, padding: 6, margin: 6, borderWidth: 4, borderColor: 'green', borderStyle: 'line'}}
            > 
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: 400}} >  
            <ClassPicker
              minors={minors}
              years={years}
              classes={classes} 
              getTopTen={getTopTen}
              getBestMinors={getBestMinors} 
              selectedClass={selectedClass} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              setSelectedYear={setSelectedYear}
              setSelectedClass={setSelectedClass}
              />        
            <YearPicker 
              years={years} 
              classes={classes} 
              getBestMinors={getBestMinors} 
              selectedClass={selectedClass} 
              setSelectedClass={setSelectedClass} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              setSelectedYear={setSelectedYear} 
              />            
            <Divisions 
              setSelectedDivision={setSelectedDivision} 
              getBestMinors={getBestMinors} 
              allMLB={allMLB} {...allDivisions} 
              setSelectedDivision={setSelectedDivision} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              selectedClass={selectedClass}
              />
            </div>
          </Collapsible> 
        </Segment>
      </Grid.Column>
  </Grid.Row>
  <Grid.Row>
    <Grid.Column width="5">
      <Segment>
      <CurrentParams 
        allDivisions={allDivisions} 
        selectedClass={selectedClass} 
        selectedDivision={selectedDivision}
        selectedYear={selectedYear}/>
      </Segment>
     </Grid.Column>
     <Grid.Column width="11">
      <Segment>
       <Stats  
            {...synthStats} 
            selectedMiLBTeam={selectedMiLBTeam} 
            selectedYear={selectedYear}
            setStatsToDb={setStatsToDb}
            saveStats={saveStats}
            selectedDivision={selectedDivision}
            selectedClass={selectedClass}
            {...radialData}
            />
       </Segment>
    </Grid.Column>
  </Grid.Row>
      <Grid.Column mobile={16} tablet={12} computer={5}>  
            
        <MainChart 
         {...radialData}
         {...bestMinors} 
         allMLB={allMLB} 
         selectedClass={selectedClass}
         selectedYear={selectedYear} 
         getBestMinors={getBestMinors}
         />  
          
      </Grid.Column>
      <Grid.Column width="5">
      <TeamList 
       {...radialData}
       {...bestMinors} 
       allMLB={allMLB} 
       selectedYear={selectedYear} 
       selectedClass={selectedClass} 
       playerList={playerList} 
       getPlayerList={getPlayerList}
       setSelectedMiLBTeam={setSelectedMiLBTeam} 
        />
      </Grid.Column>
      <Grid.Column width="6">
        <Grid.Row>
          <Grid.Column width="3">
            <Batters  
              {...playerList} 
              selectedMiLBTeam={selectedMiLBTeam} 
              synthStats={synthStats}
              />
          </Grid.Column>
          <Grid.Column width="3">
            <Pitchers 
              {...pitcherList} 
              selectedMiLBTeam={selectedMiLBTeam} 
              synthStats={synthStats}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
  </Grid>
    );
}


export default App
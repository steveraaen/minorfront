import React, { useState, useEffect } from 'react';
import { Grid, Header, Icon} from 'semantic-ui-react'

import axios from 'axios'
import Collapsible from 'react-collapsible';
import { BestFive, ClassPicker,   YearPicker, Divisions, Stats } from './components/Selections.js'


import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
/*import leagues from './assets/leagues.js'*/

const yrs = [

    { text: "All Years", value: "20%", key: "20%" },
    { text: "2013", value: 2013, key: "2013" },
    { text: "2014", value: 2014, key: "2014" },
    { text: "2015", value: 2015, key: "2015" },
    { text: "2016", value: 2016, key: "2016" },
    { text: "2017", value: 2017, key: "2017" },
    { text: "2018", value: 2018, key: "2018" }
]

function App() {
   /* const [allMiLB, setAllMiLB] = useState(allMinorTeams);*/
    const [selectedClass, setSelectedClass] = useState(classes[1]);
    const [minors, setMinors] = useState({});
    const [years] = useState(yrs);
    const [/*bestMinors,*/ setBestMinors] = useState();
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(yrs[0].value);
    const [playerList, setPlayerList] = useState();
    const [pitcherList, setPitcherList] = useState();
    const [classIcon] = useState('angle down');
    const [allDivisions, setAllDivisions] = useState();
    const [selectedDivision, setSelectedDivision] = useState({value: "%L%", display: "All Major League Teams"});
    const [/*radialData,*/ setRadialData] = useState();
    const [synthStats, setSynthStats] = useState();
    const [selectedMiLBTeam, setSelectedMiLBTeam] = useState();
  /*  const [statsToDb, setStatsToDb] = useState();*/
    const [topTenHit, setTopTenHit] = useState();
    const [topTenPitch, setTopTenPitch] = useState();
    const [topTen, setTopTen] = useState();
/*    const [classStats, setClassStats] = useState();*/
   /* const [column, setColumn] = useState();*/
 /*   const [direction, setDirection] = useState();*/
/*    const [curSortB, setCurSortB] = useState({bsrt: "bBA", bsDir: "desc"});
    const [curSortP, setCurSortP] = useState({psrt: "bBA", bsDir: "desc"});*/
    const [modalOpen, setModalOpen] = useState();

    function sortBTable(e) {  
      let { topTenBatting } = topTen
       var newArr = topTenBatting.sort((a,b) => {      
        return b[e] - a[e]
      })
       setTopTenHit({
         topTenHit: newArr
       })
   }

    function sortPTable(e) {  
      let { topTenPitching } = topTen
       var newArr = topTenPitching.sort((a,b) => {      
        return b[e] - a[e]
      })
       setTopTenPitch({
         topTenPitch: newArr
       })
   } 
   
    async function getTopTen(cl, yr, dv) {
      try {
               
        const topTenPromise = axios('/api/classSummary', { params: { cl, yr, dv } })
        const topTen = await topTenPromise; 
        console.log(topTen.data[1])
        setTopTen({
          topTenBatting: topTen.data[1],
          topTenPitching: topTen.data[0]
        })
         setTopTenHit({
          topTenHit: topTen.data[1]
        })
         setTopTenPitch({
          topTenPitch: topTen.data[0]
        })
/*                 setPlayerList({
                    playerList: null
                })
                 setPitcherList({
                    pitcherList: null
                })
                 setSelectedMiLBTeam({
                    selectedMiLBTeam: null
                })
                 setSynthStats({
                    synthStats: null
                })*/
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
/*    async function saveStats(tm, yr, dv, cl, ba, pi) {
        await axios.get('/api/sendStats', { params: {tm, yr, dv, cl, ba, pi}})
            .catch(err => {
                console.log(err);
                return null;
            });
    }*/
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
      console.log(r, f, y, t)
      try {
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
               G: a.G + b.G,
               RBI: a.RBI + b.RBI,
               YR: a.YR

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
               YR: a.YR
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
                 plyr.teamName = allMLB[i].teamName
               } else{ return null}
             }
           })
           pitcherList.data.map((ptchr, idx) => {               
             for(let i = 0; i < allMLB.length; i++) {
               if(ptchr.teamID === allMLB[i].teamCode) {
                 ptchr.color = allMLB[i].color
                 ptchr.teamName = allMLB[i].teamName
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
        getTopTen(selectedClass.name, selectedYear, selectedDivision.value)
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

  <Grid  stackable centered>
<Grid.Row columns={1}>  
    <Grid.Column >
      <Header as="h1" style={{fontSize: '1.8rem',display: 'flex', flexDirection: 'row', justifyContent: 'center', color: 'LemonChiffon'}}>2018 MLB Performance of MiLB Teams (2013-2018)</Header>
    </Grid.Column>
</Grid.Row>  
<Grid.Row columns={1}>  
      <Grid.Column>
           <Collapsible 
            trigger={<div>Select Minor League Class, Year and Franchise  <Icon name={classIcon} /></div>} 
            triggerWhenOpen={<div>Click here to close the selection form  <Icon name="angle up" /></div>}
            triggerStyle={{fontSize: '1.2rem', padding: 2, margin: 2}}
            > 
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: 260}} >  
            <ClassPicker
              minors={minors}
              years={years}
              classes={classes} 
              getTopTen={getTopTen}
              getPlayerList={getPlayerList} 
              getBestMinors={getBestMinors} 
              selectedClass={selectedClass} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              setSelectedYear={setSelectedYear}
              setSelectedClass={setSelectedClass}
              selectedMiLBTeam={selectedMiLBTeam}
              setSelectedMiLBTeam={setSelectedMiLBTeam}
              />        
            <YearPicker 
              topTen={topTen}
              years={years} 
              classes={classes} 
              getBestMinors={getBestMinors}
              getTopTen={getTopTen}
              getPlayerList={getPlayerList}  
              selectedClass={selectedClass} 
              setSelectedClass={setSelectedClass} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              setSelectedYear={setSelectedYear} 
              selectedMiLBTeam={selectedMiLBTeam}
              setSelectedMiLBTeam={setSelectedMiLBTeam}
              />            
            <Divisions 
              setSelectedDivision={setSelectedDivision} 
              getBestMinors={getBestMinors} 
              allMLB={allMLB} {...allDivisions} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              selectedClass={selectedClass}
              selectedMiLBTeam={selectedMiLBTeam}
              getPlayerList={getPlayerList}  
              setSelectedMiLBTeam={setSelectedMiLBTeam}
              getTopTen={getTopTen}
              topTen={topTen}
              />
            </div>
          </Collapsible>   
      </Grid.Column>
</Grid.Row>  
<Grid>  
  <Grid.Row columns={1}>
 
     <Grid.Column>  
      <Collapsible  
      open           
      trigger={<div>Show list of top MiLB teams <Icon name={classIcon} /></div>} 
      triggerWhenOpen={<div>Hide list of top MiLB teams <Icon name="angle up" /></div>}
      triggerStyle={{textAlign: "left", fontSize: '1.2rem', padding: 2, margin: 2}}

      > 
      <BestFive
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        sortBTable={sortBTable}
        sortPTable={sortPTable}
        topTen={topTen}
        setTopTen={setTopTen}
   
        selectedClass={selectedClass}
        allMLB={allMLB}
        setSelectedMiLBTeam={setSelectedMiLBTeam}
        getPlayerList={getPlayerList}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMiLBTeam={selectedMiLBTeam}
        synthStats={synthStats}
        {...topTenHit}
        {...topTenPitch}

        />
          </Collapsible>
      </Grid.Column>
   </Grid.Row>
  <Grid.Row>
     <Grid.Column width="8">
       <Stats  
            setModalOpen ={setModalOpen}
            modalOpen={modalOpen}
            selectedMiLBTeam={selectedMiLBTeam} 
            selectedYear={selectedYear}
          
            selectedDivision={selectedDivision}
            selectedClass={selectedClass}
            {...pitcherList} 
            {...playerList}
             {...synthStats} 
         
            
            />  
 
    </Grid.Column>
    </Grid.Row> 
        </Grid>

  </Grid>
    );
}


export default App
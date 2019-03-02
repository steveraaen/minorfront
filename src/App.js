import React, { useState, useEffect } from 'react';
import { div, Button } from 'semantic-ui-react'
import axios from 'axios'
import Collapsible from 'react-collapsible';
import { ClassPicker, MinorTeamPicker, MLBMaster, Players, TeamList, YearPicker } from './components/Selections.js'
import MainChart from './components/MainChart'

import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import leagues from './assets/leagues.js'
import allMinorTeams from './assets/allMinorTeams.js'

console.log(leagues)
const yrs = [
    { text: "2013", value: 2013, key: "2013" },
    { text: "2014", value: 2014, key: "2014" },
    { text: "2015", value: 2015, key: "2015" },
    { text: "2016", value: 2016, key: "2016" },
    { text: "2017", value: 2017, key: "2017" },
    { text: "2018", value: 2018, key: "2018" }
]

function App() {
    const [allMiLB, setAllMiLB] = useState(allMinorTeams);
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [minors, setMinors] = useState({});
    const [years, setYears] = useState(yrs);
    const [bestMinors, setBestMinors] = useState();
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(2013);
    const [playerList, setPlayerList] = useState();

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

    async function getBestMinors(p, m, y) {
        await axios.get('/api/bestMinors', { params: { p, m, y } })
            .then(res => {
                setBestMinors({
                    bestMinors: res.data
                })
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }
    async function getPlayerList(r, f, y) {
        await axios.get('/api/playerList', { params: { r, f, y } })
            .then(res => {
                setPlayerList({
                    playerList: res.data
                })
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }
    useEffect(() => {
        getMinors()
    }, {});
    return (
<div>
      <h1>Minor League Connector </h1>


      <ClassPicker 
        years={years}
        classes={classes} 
        getBestMinors={getBestMinors} 
        selectedClass={selectedClass} 
        selectedYear={selectedYear} 
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
        setSelectedYear={setSelectedYear} 
        />     

  {selectedClass.name}

   {selectedYear}


     <div style={{marginTop: '8vh', height:"50vh", overflow: 'scroll'}}>
       <TeamList {...bestMinors} allMLB={allMLB} selectedYear={selectedYear} selectedClass={selectedClass} playerList={playerList} getPlayerList={getPlayerList} />
     </div>

       <MainChart 
         {...bestMinors} 
         allMLB={allMLB} 
         selectedClass={selectedClass}
         selectedYear={selectedYear} 
         getBestMinors={getBestMinors}
         />
         <div >
           <Players {...playerList} /> 
         </div>
</div>
    );
}


export default App
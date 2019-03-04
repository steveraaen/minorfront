import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import Collapsible from 'react-collapsible';
import { ClassPicker, Players, TeamList, YearPicker, Divisions } from './components/Selections.js'
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
/*    const [minors, setMinors] = useState({});*/
    const [years] = useState(yrs);
    const [bestMinors, setBestMinors] = useState();
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(2013);
    const [playerList, setPlayerList] = useState();
    const [classIcon] = useState('angle down');
    const [divisions, setDivisions] = useState();

    function multiSelect(cl) {
     var classSelections=[] 
 !classSelections.includes(cl) ? classSelections.push(cl) : classSelections.slice(classSelections.indexOf(cl)) 
      
    
      console.log(classSelections)
    }

    function makeDivs() {
      const tempDivisions = []
/*      for(let i = 0; i < allMLB.length; i++) {
        let dvsn = {}
        dvsn.league = allMLB[i].league
        dvsn.color = allMLB[i].color
        tempDivisions.push(dvsn)
        }*/
  var uniqueDivisions = allMLB.filter((thing, index, self) =>
  index === self.findIndex((t) => (
    t.league === thing.league && t.color === thing.color
  ))
)
  return setDivisions({divisions: uniqueDivisions})
    }


/*    async function getMinors() {
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
    }*/
    async function getBestMinors(p, m, y) {
      console.log(p,m,y)
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

/*    useEffect(() => {
        getMinors()
    }, {});*/
    useEffect(() => {
        makeDivs()
    }, {});
    useEffect(() => {
        getBestMinors(selectedClass.code, selectedClass.regex, selectedYear)
    }, {});
 console.log(selectedClass)
    return (
<div>
  <span>Home town fantasy</span>
    <Collapsible 
      trigger={<div>Select Minor League Class  <Icon name={classIcon} /></div>} 
      triggerStyle={{fontSize: 36, padding: 6, margin: 6, borderWidth: 4, borderColor: 'green', borderStyle: 'line'}}
      >
    
    <ClassPicker 
      years={years}
      classes={classes} 
      getBestMinors={getBestMinors} 
      selectedClass={selectedClass} 
      selectedYear={selectedYear} 
      setSelectedYear={setSelectedYear}
      setSelectedClass={setSelectedClass}
      /> 
      </Collapsible> 
     <Collapsible 
      trigger={<div>Select Year  <Icon name={classIcon} /></div>} 
      triggerStyle={{fontSize: 36, padding: 6, margin: 6, borderWidth: 4, borderColor: 'green', borderStyle: 'line'}}
      >  
    <YearPicker 
      years={years} 
      classes={classes} 
      getBestMinors={getBestMinors} 
      selectedClass={selectedClass} 
      setSelectedClass={setSelectedClass} 
      selectedYear={selectedYear} 
      setSelectedYear={setSelectedYear} 
      />     
      </Collapsible> 

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', width: '30vw'}}>
        <div style={{fontSize: 36, fontWeight: 600}}>{selectedClass.name}</div>

        <div style={{fontSize: 36, fontWeight: 600}}>{selectedYear}</div>
      </div>
      <Divisions multiSelect={multiSelect} allMLB={allMLB} {...divisions}/>
   <div style={{display: 'flex', flexDirection: 'row'}}>
      <MainChart 
       {...bestMinors} 
       allMLB={allMLB} 
       selectedClass={selectedClass}
       selectedYear={selectedYear} 
       getBestMinors={getBestMinors}
       />
   <div style={{marginRight: 6}}>
     <TeamList {...bestMinors} allMLB={allMLB} selectedYear={selectedYear} selectedClass={selectedClass} playerList={playerList} getPlayerList={getPlayerList} />
     </div>
     <Players {...playerList} /> 
     </div>     
     <div>
        
       </div>
</div>
    );
}


export default App
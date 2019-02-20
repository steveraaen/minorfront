import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react'

import axios from 'axios'
/*import ClassPicker from './components/ClassPicker'
import LeagueList from './components/LeagueList'
import MLBMaster from './components/MLBMaster'*/
import MainChart from './components/MainChart'
import FormA from './components/Form'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import leagues from './assets/leagues.js'
console.log(leagues)
const yrs = [
          {text: "2013", value: 2013, key: "2013"}, 
          {text: "2014", value: 2014, key: "2014"}, 
          {text: "2015", value: 2015, key: "2015"}, 
          {text: "2016", value: 2016, key: "2016"}, 
          {text: "2017", value: 2017, key: "2017"}, 
          {text: "2018", value: 2018, key: "2018"}
          ]
function App() {
  
  const [minorLeagues/*, setLeagues*/] = useState(leagues);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [minors, setMinors] = useState({});
  const [years, setYears] = useState(yrs);
  const [bestMinors, setBestMinors] = useState({});
  const [allMLB] = useState(mlbTeams);
  
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
    async function getBestMinors(p, m) {
    await axios.get('/api/bestMinors', { params: { p, m}})
           .then(res => {
             console.log(res)
             setBestMinors({
               bestMinors: res.data
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

  <Grid celled='internally'>
    <Grid.Row className='header'>
      <Grid.Column width={16}>
        <h1>Minor League Connector </h1>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row className="topselect">
      <Grid.Column width={16}>
        <Button.Group>
          <Button>By Minor League</Button>
          <Button>By Minor League Level</Button>
          <Button>By Minor League Team</Button>
          <Button>By Major League Team</Button>
          </Button.Group>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
            <Grid.Column width={16}>
          <FormA getBestMinors={getBestMinors} allMLB={allMLB} minorLeagues={minorLeagues} years={years} classes={classes}/>
      </Grid.Column>
      </Grid.Row>
  </Grid>


    
  );
}


export default App




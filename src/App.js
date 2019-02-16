import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import axios from 'axios'
import ClassPicker from './components/ClassPicker'
import MainChart from './components/MainChart'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'

console.log(classes[0])
const yrs = [2013, 2014, 2015, 2016, 2017, 2018]
function App() {
  
  const [minorClass, setClasses] = useState(classes);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [minors, setMinors] = useState({});
  const [years, setYears] = useState(yrs);
   const [visible, setVisible] = useState(false);
  const [bestMinors, setBestMinors] = useState({});
  
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
            <div className="App">
        <Button.Group>
          <Button disabled={visible} onClick={() => setVisible(true)}>
            Show leagues
          </Button>
          <Button disabled={!visible} onClick={() => setVisible(false)}>
            Hide leagues
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}>
            <ClassPicker classes={classes} bestMinors={bestMinors} setSelectedClass={setSelectedClass} getBestMinors={getBestMinors}/>
          </Sidebar>

          <Sidebar.Pusher>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <div className="chart">
         <MainChart {...bestMinors} />
       </div>
      </div>

    
  );
}


export default App




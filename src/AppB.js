import React, { Component } from 'react';
import axios from 'axios'
import ClassPicker from './components/ClassPicker'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minors: [],
      classes: classes,
      mlbTeams: mlbTeams
    }
        
  }
    async getUsers  () {
       return await axios.get('/api/allMinors')
           .then(res => {
             this.setState({
               minors: res.data
             })             
           })
           .catch(err => {
               console.log(err);
               return null;
           });
    };

    componentDidMount() {

      this.getUsers()
    }

   render() {
  return (
    <div className="App">    
      <ClassPicker classes={this.state.classes}  />
    </div>
    
  );
}
}

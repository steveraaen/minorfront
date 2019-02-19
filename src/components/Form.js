import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'



function FormA(props) { 
	console.log(props)
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]
var value;
	var mappedMLB = props.allMLB.map((tm, idx) => {
		var semanticMLB = {
				text: tm.teamName,
				value: tm.teamCode,
				image: tm.picUrl,
				league: tm.league,
				key: tm.teamCode
			}
		return semanticMLB
	})
	var mappedMinorL = props.minorLeagues.map((tm, idx) => {
		var semanticMinorL = {
				text: tm.league,
				value: tm.league,
				image: tm.logo,
				franchise: tm.franchise,
				key: tm.league
			}
		return semanticMinorL
	})
	var mappedClasses = props.classes.map((tm, idx) => {
		var semanticClasses = {
				text: tm.name,
				value: tm.regex,
				key: tm.code
			}
		return semanticClasses
	})	
	  function handleChange(e, { value }) {this.setState({ value })}
	return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Select fluid label='By Minor League Class' options={mappedClasses} placeholder='Triple A' />
          <Form.Select fluid label='By Minor League' options={mappedMinorL} placeholder='All' />

          <Form.Select fluid label='Year' options={props.years} placeholder='2018' />
          
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label='Small'
            value='sm'
            checked={value === 'sm'}
            onChange={console.log('changed')}
          />
          <Form.Radio
            label='Medium'
            value='md'
            checked={value === 'md'}
            onChange={console.log('changed')}
          />
          <Form.Radio
            label='Large'
            value='lg'
            checked={value === 'lg'}
            onChange={console.log('changed')}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>

)}
export default FormA
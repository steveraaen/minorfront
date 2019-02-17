import React, { useState, useEffect } from 'react';
import { Container, Image, Label, Table } from 'semantic-ui-react'

function LeagueList(props) {

  return(
    <div style={{maxWidth: 20}}>
      <Table>
      <Table.Header>
        <Table.Row>
         
          <Table.HeaderCell>League</Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.minorLeagues.map((lg, idx) => {
        return(
        <Table.Row key={lg.league}>
          <Table.Cell>
           
          </Table.Cell>
          <Table.Cell>{lg.league}</Table.Cell>
          <Table.Cell><Image src={lg.logo} size="tiny" circular/></Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>

    </Table>
  </div>
  )
}

export default LeagueList
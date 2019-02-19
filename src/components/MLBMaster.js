import React, { useState, useEffect } from 'react';
import { Image, Label, List, Table} from 'semantic-ui-react'

function MLBMaster(props) {

	return(
    <div style={{maxWidth: 20}}>
      <Table>
      <Table.Header>
        <Table.Row>
         
          <Table.HeaderCell>League</Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.allMLB.map((tm, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell>
           
          </Table.Cell>
          <Table.Cell>{tm.teamName}</Table.Cell>
          <Table.Cell><Image src={tm.picUrl} size="tiny" circular/></Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>

    </Table>
  </div>
)
}

export default MLBMaster
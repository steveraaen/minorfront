      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Triple A</Table.HeaderCell>
            <Table.HeaderCell>Double A</Table.HeaderCell>
            <Table.HeaderCell>Single A</Table.HeaderCell>
            <Table.HeaderCell>A Advanced</Table.HeaderCell>
            <Table.HeaderCell>A Short</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.topTenBatting.map(tarr => {
            return(
              tarr.map((tm, idx) => {
                return(
                   <Table.Row key={idx}>
                     <Table.Cell>
                       {tm.milbTeam}
                     </Table.Cell>
                   </Table.Row>
                  )
              })
              )
          })}
        </Table.Body>
      </Table>



      <Grid columns="equal" divided>
      <Grid.Row>
        {props.topTenBatting.map((tarr, ix) => {
          return(
            <Grid.Column>
            {tarr[ix].cl}
              {tarr.map((tm, idx) => {
                return(
                  <div>
                  {idx + 1}
                 
                      <Image src={tm.logo} width="100" height="100"/>
                        <Card.Meta>{tm.yr}</Card.Meta>
                        <Card.Description>{tm.milbTeam}</Card.Description>
                        <Statistic.Group horizontal>
                          <Statistic size='mini'>
                            <Statistic.Value>{tm.bG}</Statistic.Value>
                            <Statistic.Label>Games</Statistic.Label>
                          </Statistic>                        
                          <Statistic size='mini'>
                            <Statistic.Value>{tm.bAB}</Statistic.Value>
                            <Statistic.Label>At Bats</Statistic.Label>
                          </Statistic>
                          <Statistic size='mini'>
                            <Statistic.Value>{tm.bBA}</Statistic.Value>
                            <Statistic.Label>Average</Statistic.Label>
                          </Statistic>
                          <Statistic size='mini'>
                            <Statistic.Value>{tm.bSO}</Statistic.Value>
                            <Statistic.Label>Strike Outs</Statistic.Label>
                          </Statistic>
                     </Statistic.Group>
                  </div>
               
                  )
              })}
            </Grid.Column>
            )
        })}
      </Grid.Row>
    </Grid>



















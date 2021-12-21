import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

function NotFound() {
    return (
      <Segment placeholder>
          <Header icon>
              <Icon name="search" />
              Ooops - we've looked everywhere but could not find this
          </Header>
          <Segment.Inline>
            <Button as={Link} to='/activities' positive >Return to Activities page</Button>
          </Segment.Inline>
      </Segment>
    )
}

export default NotFound

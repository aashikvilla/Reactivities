import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default function HomePage() {
    return (
       <Container>
           <h1>Homepage</h1>
           <h1>Go to <Link to='/activities'>Activities</Link> </h1>

       </Container>
    )
}



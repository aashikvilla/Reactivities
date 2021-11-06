import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
interface Props{
    inverted:boolean
    content:string
}

function LoadingComponent({inverted=true,content='Loading ...'}:Props) {
    return (
        
        <Dimmer active inverted> 
          <Loader content='Loading'/>
        </Dimmer>
  
        //<img src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
     
    )
}

export default LoadingComponent

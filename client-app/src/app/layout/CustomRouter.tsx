import { JSXElement } from '@babel/types';
import React,{useState,useLayoutEffect} from 'react'
import { Router } from 'react-router'

interface Props{
    history:any,    
    children :JSXElement
}

function CustomRouter({history,children,...props}:Props) {
    const [custom,setCustom]=useState({
        action:history.action,
        location:history.location
    });

    useLayoutEffect(() => (
        history.listen(setCustom)
        
    ), [history])

    return (
      <Router {...props}
      location={custom.location}
      navigator={history}
      navigationType={custom.action}
      >
          {children}
          </Router>
    )
}

export default CustomRouter

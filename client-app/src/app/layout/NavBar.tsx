import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";



export default function NavBar(){
  
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'2rem'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'  as={NavLink} to='/activities'/>
                <Menu.Item name='Errors'  as={NavLink} to='/errors'/>
                <Menu.Item  >
                    <Button as={NavLink} to='/CreateActivity' positive content='Create Activity'/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}
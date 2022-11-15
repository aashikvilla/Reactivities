import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu ,Image, Dropdown} from "semantic-ui-react";
import { useStore } from "../stores/store";
import UserStore from "../stores/UserStore";



export default function NavBar(){
  
    const {userStore :{user,logout}}=useStore()
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

                <Menu.Item position="right">
                    <Image src={user?.displayName || "/assets/user.png"} avatar spaced='right'/>
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text={'My Profile'}/>
                            <Dropdown.Item onClick={logout} text={'Logout'} icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Item>
            </Container>

        </Menu>
    )
}
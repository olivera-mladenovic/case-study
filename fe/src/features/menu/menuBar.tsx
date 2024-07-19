import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import './styles/menuBar.css'

export const MenuBar =() => {
    
    return (
        <Menu inverted fixed='top'>
            <Menu.Item header>
                <img src='/vite.svg'/>
            </Menu.Item>
            <Menu.Item name='Book Reviews'/>               
                <Menu.Menu position='right'>
                    <Button positive content='Logout' onClick={()=> {console.log('log out probably')}}/>
                </Menu.Menu> 
        </Menu>
    )
}
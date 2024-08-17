import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import './styles/menuBar.css'
import { useSelectedReview, useUser } from '../../contexts';
import { useNavigate } from 'react-router-dom';

export const MenuBar =() => {

    const contextData = useUser();
    const reviewContextData = useSelectedReview();
    const navigate = useNavigate();

    const onLogout = () => {
        contextData?.logoutUser();
        reviewContextData?.cancelSelectedReview();
        navigate('/')
    }
    
    return (
        <Menu inverted fixed='top'>
            <Menu.Item header>
                <img src='/book.png'/>
            </Menu.Item>
            <Menu.Item name='Book Reviews'/>               
                <Menu.Menu position='right'>
                    <Button positive content='Logout' onClick={onLogout}/>
                </Menu.Menu> 
        </Menu>
    )
}
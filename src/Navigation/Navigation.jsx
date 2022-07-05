import './Navigation.css'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useState } from 'react';


function Navigation ({isLoggedIn, closeLoginModal, loggedUser, handleDisconnectClick, disconnectUser, handleFormSubmit}) {

  const [activeItem, setActiveItem] = useState('home');

  const handleClickMenu = (e, {name}) => {
    setActiveItem(name);
  }

  return (
    <>
      <Menu secondary pointing>
        <Menu.Item header>Mon créateur de recette</Menu.Item>
        <Menu.Item
          name='home'
          as={Link}
          to='/'
          active={activeItem === 'home'}
          onClick={handleClickMenu}
        >Accueil</Menu.Item>
        <Menu.Item
          name='recipes'
          as={Link}
          to='/recipes'
          active={activeItem === 'recipes'}
          onClick={handleClickMenu}
        >Mes recettes</Menu.Item>
        <Menu.Item
          name='createrecipe'
          as={Link}
          to='/recipes/createmyrecipes'
          active={activeItem === 'createrecipe'}
          onClick={handleClickMenu}
        >Créer une recette</Menu.Item>
        
        <Menu.Menu position='right' icon='labeled'>
          {
             isLoggedIn ?
             <Menu.Item>
                <p>Bienvenue, <strong>{loggedUser[0].first_name} {loggedUser[0].last_name}</strong></p>
             </Menu.Item> :
             null
          }
          {
            isLoggedIn ? 
            <Menu.Item as='a' onClick={handleDisconnectClick}>
              <Icon name='sign out'/> 
              {' '}<p>Se déconnecter</p>
            </Menu.Item> : 
            <Menu.Item as='a' onClick={closeLoginModal}>
              <Icon name='sign in'/>
              {' '}Se connecter
            </Menu.Item>
          }
          
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default Navigation;
import './Navigation.css'

import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navigation ({isLoggedIn, openCloseLoginModal, loggedUser, handleDisconnectClick, handleFormSubmit}) {

  const location = useLocation();

  return (
      <Navbar sticky='top' expand='lg'>
        <Container fluid id='navbar-container'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" b>
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/' active={location.pathname === '/' ? true : false}>
                  Accueil
              </Nav.Link>
              
              <Nav.Link as={Link} to='/recipes' active={location.pathname === '/recipes' ? true : false}>
                Toutes les recettes
              </Nav.Link>

              <Nav.Link as={Link} to='/recipes/myrecipes' active={location.pathname === '/recipes/myrecipes' ? true : false} 
                disabled={!isLoggedIn  ? true : false}>
                  Mes recettes
              </Nav.Link>

              <Nav.Link as={Link} to='/recipes/createmyrepice' active={location.pathname === '/recipes/createmyrepice' ? true : false} 
                disabled={!isLoggedIn ? true : false}>
                  Créer une recette
              </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {
                  !isLoggedIn ? 
                  <Button id='navbar-buttons' onClick={openCloseLoginModal}>
                    <img src='https://cdn-icons-png.flaticon.com/512/1388/1388906.png' width={25} height={25} alt='connecticon'/> 
                    {' Connexion'}
                  </Button> :
                  <>
                    {loggedUser[0].first_name} {loggedUser[0].last_name}
                    <Button id='navbar-buttons' onClick={handleDisconnectClick}>
                      <img src='https://cdn-icons-png.flaticon.com/512/1828/1828479.png' width={25} height={25} alt='deconnecticon'/> 
                      {' Déconnexion'}
                    </Button>
                  </>
                }
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Navigation;
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

//import Recipes from './Recipes/MyRecipes';
import Navigation from './Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
//import CreateRecipes from './CreateRecipes/CreateRecipes';
import Home from './Home/Home'
import { useEffect, useState } from 'react';
//import ModalLoginUser from './Modals/ModalLoginUser';
//import ModalDisconnectUser from './Modals/ModalDiconnectUser';
import { toast } from 'react-toastify';


function App() {

  const [isModalVisible, toggleModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [isLoggedIn, toggleIsLoggedIn]= useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isDiscModalVisible, toggleDiscModalVisible] = useState(false);

  useEffect(() => {
    if(user.length !== 0){
      /* Hide Login Modal */
      toggleModalVisible(false);

      /* Clear form Values */
      setLogin('');
      setPassword('');

      /* Show that we are connected */
      toggleIsLoggedIn(true);
    }
  }, [user, isModalVisible])

  const handleLogin = (e) =>{
    setLogin(e.target.value)
  }

  const handlePwd = (e) =>{
    setPassword(e.target.value)
  }
  
  const handleDisconnectClick = () => {
    toggleDiscModalVisible(v => !v)
  }

  const handleOpenCloseModal = () => {
    toggleModalVisible(v => !v);
  }

  const disconnectUser = () => {
    /* no user */
    setUser([]);

    /* not connected */
    toggleIsLoggedIn(false);

    /* redirect to home */
    window.location.href = "/";
  }

  const handleErrorLogin = () => {
    toast.error("Login ou mot de passe incorrect");
    setPassword('');
  }

  const connectUser = (e) =>{
    e.preventDefault()
    fetch('https://x12wp3hf39.execute-api.us-east-2.amazonaws.com/log-user', {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({login: login, pwd: password})
    })
    .then((res) => res.json())
    .then((res) => setUser(res))
  }

  return (
    <>
      <Navigation 
          openCloseLoginModal={handleOpenCloseModal}
          handleDisconnectClick={handleDisconnectClick} 
          loggedUser={user} 
          isLoggedIn={isLoggedIn} 
      />
      <Routes>
            <Route path='/' element={<Home />} />
            {/*<Route path='/recipes' element={<Recipes user={user}/>} />
            <Route path='/recipes/createmyrecipes' element={<CreateRecipes user={user} />} />*/}
      </Routes>
      {/*
        isModalVisible ? <ModalLoginUser 
          modalVisible={isModalVisible} 
          closeModalVisibility={handleOpenCloseModal} 
          login={login}
          pwd={password}
          onChangeLogin={handleLogin}
          onChangePwd={handlePwd}
          connectUser={connectUser} /> : null*/
      }
      {
        /*isLoggedIn ? <ModalDisconnectUser 
          modalVisible={isDiscModalVisible} 
          toggleModalVisible={handleDisconnectClick} 
          disconnectUser={disconnectUser} 
         /> : null*/
      }
    </>
  )
  /*return (
      <>
        <Navigation 
            closeLoginModal={handleOpenCloseModal}
            handleDisconnectClick={handleDisconnectClick} 
            loggedUser={user} 
            isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Home />} />
          {<Route path='/recipes' element={<Recipes user={user}/>} />
          <Route path='/recipes/createmyrecipes' element={<CreateRecipes user={user} />} />}
        </Routes>
        
    </>
  )*/
}

export default App;

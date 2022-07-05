import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Recipes from './Recipes/Recipes';
import Navigation from './Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import CreateRecipes from './CreateRecipes/CreateRecipes';
import Home from './Home/Home'
import { useState } from 'react';
import ModalLoginUser from './Modals/ModalLoginUser';
import ModalDisconnectUser from './Modals/ModalDiconnectUser';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const [isModalVisible, toggleModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [isLoggedIn, toggleIsLoggedIn]= useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isDiscModalVisible, toggleDiscModalVisible] = useState(false);

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
    setUser([]);
    toggleIsLoggedIn(false);
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
    .then(res => res.json())
    .then(res => setUser(res))
    .then(() => {
        if(user.length === 0){
          toast.error('Le couple login/mot de passe est incorrect', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
          })
        } else {
          /* Hide Login Modal */
          toggleModalVisible(false);

          /* Clear form Values */
          setLogin('');
          setPassword('');

          /* Show that we are connected */
          toggleIsLoggedIn(true);
        }
    })

    

  }

  return (
      <>
        <Navigation 
            closeLoginModal={handleOpenCloseModal}
            handleDisconnectClick={handleDisconnectClick} 
            loggedUser={user} 
            isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/createmyrecipes' element={<CreateRecipes />} />
        </Routes>
        {
            isModalVisible ? <ModalLoginUser 
              modalVisible={isModalVisible} 
              closeModalVisibility={handleOpenCloseModal} 
              login={login}
              pwd={password}
              onChangeLogin={handleLogin}
              onChangePwd={handlePwd}
              connectUser={connectUser} /> : null
        }
        {
          isLoggedIn ? <ModalDisconnectUser 
            modalVisible={isDiscModalVisible} 
            toggleModalVisible={handleDisconnectClick} 
            disconnectUser={disconnectUser} 
           /> : null
        }
    </>
  )
}

export default App;

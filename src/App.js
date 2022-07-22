import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Base64 } from 'js-base64';

//import Recipes from './Recipes/MyRecipes';
import Navigation from './Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
//import CreateRecipes from './CreateRecipes/CreateRecipes';
import AllRecipes from './Recipes/AllRecipes';
import Home from './Home/Home'
import { useEffect, useState } from 'react';
import ModalLoginUser from './Modals/ModalLoginUser';
import ModalDisconnectUser from './Modals/ModalDiconnectUser';
import { toast } from 'react-toastify';
import Footer from './Navigation/Footer';

function App() {

  const [isModalVisible, toggleModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [isLoggedIn, toggleIsLoggedIn]= useState(false);

  /* FOR THE CONNECT USER MODAL */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* FOR THE NEW USER MODAL  */
  const [newLastname, setNewLastname] = useState('');
  const [newFirstname, setNewFirstname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [isDiscModalVisible, toggleDiscModalVisible] = useState(false);

  useEffect(() => {
    if(user.length !== 0){
      /* Hide Login Modal */
      toggleModalVisible(false);

      /* Clear form Values */
      setEmail('');
      setPassword('');

      /* Show that we are connected */
      toggleIsLoggedIn(true);
    }
  }, [user, isModalVisible])

  const handleNewFirstname = (e) =>{
    setNewFirstname(e.target.value)
  }

  const handleNewLastname = (e) =>{
    setNewLastname(e.target.value)
  }

  const handleNewEmail = (e) =>{
    setNewEmail(e.target.value)
  }

  const handleNewPassword = (e) =>{
    setNewPassword(e.target.value)
  }

  const handlePasswordConfirm = (e) =>{
    setPwdConfirm(e.target.value)
  }

  const handleEmail = (e) =>{
    setEmail(e.target.value)
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
    if(window.location.pathname !== '/')
      window.location.href = "/";
  }

  const handleErrorLogin = () => {
    toast.error('E-mail ou mot de passe incorrect, veuillez réessayer.', {
      position: 'top-center'
    });
    setPassword('');
  }

  const connectUser = (e) =>{
    e.preventDefault();

    const encryptedPwd = Base64.encode(password);

    fetch('https://crecipe-api.herokuapp.com/log-user', {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, pwd: encryptedPwd})
    })
    .then((res) => res.json())
    .then((res) => {
      setUser(res)
    })
    .then(() => {
      if(user.length >= 1){
        toggleModalVisible(false);
      } else {
        handleErrorLogin();
      }
    })
  }

  const createNewUser = (e) => {
    e.preventDefault()

    if(newPassword !== pwdConfirm){
      toast.error('Vos 2 mots de passe ne sont pas égaux.', {position: 'top-center'});
      setPwdConfirm('');
      return false;
    }

    const encryptedPwd = Base64.encode(newPassword);

    fetch('https://crecipe-api.herokuapp.com/create-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstname: newFirstname, lastname: newLastname, email: newEmail, pwd: encryptedPwd})  
    })
    .then((res) => res.json())
    .then((res) => {

      if(JSON.stringify(res).charAt(0) === '['){
        if(res.length === 0){
          toast.success('Création de compte terminée !', {position: 'top-center'});
          resetFormCreate();
          if(window.location.pathname !== '/' && window.location.pathname !== '/recipes')
            window.location.href = "/";
        }
      } else if (JSON.stringify(res).charAt(0) === '{'){
        if(res.ERR !== '')
          toast.error(res.ERR, {position: 'top-center'});
      }
    })
  }

  const resetFormCreate = () => {
    setNewEmail('');
    setNewPassword('');
    setPwdConfirm('');
    setNewFirstname('');
    setNewLastname('');
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
            <Route path='/recipes' element={<AllRecipes/>} />
            {/*<Route path='/recipes/:id' element={<RecipeViewer />} />*/}
            {/*<Route path='/recipes/createmyrecipes' element={<CreateRecipes user={user} />} />*/}
      </Routes>
      {
        isModalVisible ? <ModalLoginUser 
          modalVisible={isModalVisible} 
          closeModalVisibility={handleOpenCloseModal} 
          newFirstname={newFirstname}
          newLastname={newLastname}
          newEmail={newEmail}
          newPassword={newPassword}
          pwdConfirm={pwdConfirm}
          onChangeNewFirstname={handleNewFirstname}
          onChangeNewLastname={handleNewLastname}
          onChangeNewEmail={handleNewEmail}
          onChangeNewPassword={handleNewPassword}
          onChangePwdConfirm={handlePasswordConfirm}
          login={email}
          pwd={password}
          onChangeEmail={handleEmail}
          onChangePwd={handlePwd}
          connectUser={connectUser}
          createNewUser={createNewUser} /> : null
      }
      {
        isLoggedIn ? <ModalDisconnectUser 
          modalVisible={isDiscModalVisible} 
          toggleModalVisible={handleDisconnectClick} 
          disconnectUser={disconnectUser} 
         /> : null
      }
      <Footer />
    </>
  )
}

export default App;

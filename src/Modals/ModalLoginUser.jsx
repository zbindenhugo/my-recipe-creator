import './ModalLoginUser.css';

import { Modal, Divider,  Form, Grid, Button, Header } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

function ModalLoginUser ({modalVisible, closeModalVisibility, login, pwd, onChangeLogin, onChangePwd, connectUser}) {
    return (
        <Modal
            closeIcon
            onClose={closeModalVisibility}
            open={modalVisible}
            header={false}
        >
            <Modal.Content>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                    <Form onSubmit={connectUser}>
                        <Header>
                            Connexion utilisateur
                        </Header>
                        <Form.Input
                            required
                            icon='user'
                            name='login'
                            iconPosition='left'
                            label='Login'
                            placeholder='Login'
                            value={login}
                            onChange={onChangeLogin}

                        />
                        <Form.Input
                            required
                            icon='lock'
                            name='pwd'
                            iconPosition='left'
                            label='Mot de passe'
                            type='password'
                            value={pwd}
                            onChange={onChangePwd}
                        />

                        <Form.Button content='Se connecter' primary />
                    </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Header>Pas de compte ? Créer en un !</Header>
                        <Button content='Créer un compte' icon='signup' size='big' />
                    </Grid.Column>
                </Grid>

                <Divider vertical>OU</Divider>
          </Modal.Content>
          <ToastContainer />
          
        </Modal>
    )
}

export default ModalLoginUser;
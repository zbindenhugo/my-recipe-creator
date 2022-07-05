import {Modal, Button, Icon, Header} from 'semantic-ui-react';

function ModalDisconnectUser({modalVisible, toggleModalVisible, disconnectUser, handleFormSubmit}){

    const handleConfirm = () => {
        disconnectUser()
        toggleModalVisible()
    }

    return (
        <Modal
            basic
            onClose={toggleModalVisible}
            open={modalVisible}
            size='small'
            style={{textAlign: 'center'}}
            >
            <Header icon>
                <Icon name='archive' />
                Deconnexion
            </Header>
            <Modal.Content>
                <p>
                Êtes-vous sûr de vouloir vous déconnecter ? 
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={toggleModalVisible}>
                    <Icon name='remove' /> Non
                </Button>
                <Button color='green' inverted onClick={handleConfirm}>
                    <Icon name='checkmark' /> Oui
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalDisconnectUser;
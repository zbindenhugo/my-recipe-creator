import {Modal, Button} from 'react-bootstrap';

function ModalDisconnectUser({modalVisible, toggleModalVisible, disconnectUser, handleFormSubmit}){

    const handleConfirm = () => {
        disconnectUser()
        toggleModalVisible()
    }

    return (
        <Modal
            onHide={toggleModalVisible}
            show={modalVisible}
            style={{textAlign: 'center'}}
            >
            <Modal.Body>
                <p>
                Êtes-vous sûr de vouloir vous déconnecter ? 
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={toggleModalVisible}>
                   Annuler
                </Button>
                <Button variant='outline-success' onClick={handleConfirm}>
                    Oui
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDisconnectUser;
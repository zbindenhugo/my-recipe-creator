import './ModalLoginUser.css';

import {Modal, Typography, Box} from '@mui/material';
import { ToastContainer } from 'react-toastify';

function ModalLoginUser ({modalVisible, closeModalVisibility, login, pwd, onChangeLogin, onChangePwd, connectUser}) {
    return (
        <Modal
            open={modalVisible}
            onClose={closeModalVisibility}
        >
            <Box>
                <p>azdazdazd</p>
            </Box>

          <ToastContainer />
          
        </Modal>
    )
}

export default ModalLoginUser;
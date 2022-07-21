import './ModalLoginUser.css';

import {Modal, Button, Form, Row, Col, Container, Tabs, Tab, Divider} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

function ModalLoginUser (props) {
    return (
        <Modal show={props.modalVisible} onHide={props.closeModalVisibility} size='lg' centered>
            <Container style={{marginTop: 15, marginBottom: 15}} fluid>
                <Tabs
                    defaultActiveKey="connect"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="connect" title="Se connecter" >
                        <Container fluid>
                            <Row style={{textAlign: 'center'}}>
                                <Col md={1} />
                                <Col>
                                    <h3 className='display-h3'>Connexion à mon compte</h3>
                                    <hr style={{width: 200, marginTop: 10, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto'}} />
                                </Col>
                                <Col md={1} />
                            </Row>
                            <Row>
                                <Form onSubmit={props.connectUser}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Adresse e-mail</Form.Label>
                                        <Form.Control type="email" placeholder="Renseignez votre adresse e-mail" value={props.email} onChange={props.onChangeEmail} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control type="password" placeholder="Renseignez votre mot de passe" value={props.pwd} onChange={props.onChangePwd} required/>
                                    </Form.Group>

                                    <Button type="submit" variant='outline-success'>Se connecter</Button>
                                </Form>
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="noaccount" title="Pas de compte ?">
                        <Container fluid>
                            <Row style={{textAlign: 'center'}}>
                                <Col md={1} />
                                <Col>
                                    <h3>Création d'un nouveau compte</h3>
                                    <hr style={{width: 200, marginTop: 10, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto'}} />
                                </Col>
                                <Col md={1} />
                            </Row>
                            <Row>
                                <Col md={1} />
                                <Col>
                                    <Form onSubmit={props.createNewUser}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formBasicLastname">
                                                <Form.Label>Nom</Form.Label>
                                                <Form.Control value={props.newLastname} onChange={props.onChangeNewLastname} type="text" placeholder="Renseignez votre nom" required/>
                                            </Form.Group>

                                            <Form.Group  as={Col} controlId="formBasicFirstname">
                                                <Form.Label>Prénom</Form.Label>
                                                <Form.Control value={props.newFirstname} onChange={props.onChangeNewFirstname} type="text" placeholder="Renseignez votre prénom" required/>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group className="mb-3" controlId="formBasicNewEmail">
                                                <Form.Label>Adresse e-mail</Form.Label>
                                                <Form.Control type="email" placeholder="Renseignez votre adresse e-mail" value={props.newEmail} onChange={props.onChangeNewEmail} required/>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formBasicNewPassword">
                                                <Form.Label>Mot de passe</Form.Label>
                                                <Form.Control type="password" placeholder="Renseignez votre mot de passe" value={props.newPassword} onChange={props.onChangeNewPassword} required/>
                                            </Form.Group>

                                            <Form.Group as={Col} className="mb-3" controlId="formBasicPwdConfirm">
                                                <Form.Label>Confirmez votre mot de passe</Form.Label>
                                                <Form.Control type="password" placeholder="Confirmez votre mot de passe" value={props.pwdConfirm} onChange={props.onChangePwdConfirm} required/>
                                            </Form.Group>
                                        </Row>

                                        <Button type="submit" variant='outline-success'>Créer mon compte !</Button>
                                    </Form>
                                </Col>
                                <Col md={1} />
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>
            </Container>

        <ToastContainer />
      </Modal>
    )
}

export default ModalLoginUser;
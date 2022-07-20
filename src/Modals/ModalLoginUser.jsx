import './ModalLoginUser.css';

import {Modal, Button, Form, Row, Col, Container, Tabs, Tab, Divider} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

function ModalLoginUser ({modalVisible, closeModalVisibility, email, pwd, onChangeEmail, onChangePwd, connectUser}) {
    return (
        <Modal show={modalVisible} onHide={closeModalVisibility} size='lg' centered>
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
                                <Form onSubmit={connectUser}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Adresse e-mail</Form.Label>
                                        <Form.Control type="email" placeholder="Renseignez votre adresse e-mail" value={email} onChange={onChangeEmail} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control type="password" placeholder="Renseignez votre mot de passe" value={pwd} onChange={onChangePwd} required/>
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
                                    <Form onSubmit={connectUser}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formBasicEmail">
                                                <Form.Label>Nom</Form.Label>
                                                <Form.Control type="text" placeholder="Renseignez votre nom" required/>
                                            </Form.Group>

                                            <Form.Group  as={Col} controlId="formBasicPassword">
                                                <Form.Label>Prénom</Form.Label>
                                                <Form.Control type="text" placeholder="Renseignez votre prénom" required/>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Adresse e-mail</Form.Label>
                                                <Form.Control type="email" placeholder="Renseignez votre adresse e-mail" value={email} onChange={onChangeEmail} required/>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Mot de passe</Form.Label>
                                                <Form.Control type="password" placeholder="Renseignez votre mot de passe" value={email} onChange={onChangeEmail} required/>
                                            </Form.Group>

                                            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Confirmez votre mot de passe</Form.Label>
                                                <Form.Control type="password" placeholder="Confirmez votre mot de passe" value={email} onChange={onChangeEmail} required/>
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
        {/*<Modal.Header closeButton>
          <Modal.Title>Connexion utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>
                        
                    </Col>
                    <Col style={{textAlign: 'center'}} md={1}>
                         <div className='vr' style={{height: '30px'}} />
                         
                         <div className='vr' style={{height: '30px'}} />
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </Modal.Body>*/}

        <ToastContainer />
      </Modal>
    )
}

export default ModalLoginUser;
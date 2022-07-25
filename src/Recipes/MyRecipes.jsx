import './MyRecipes.css';
import React, { useEffect, useState } from 'react';
import { Card, Container, Stack, Row, Col, Button } from 'react-bootstrap';

export default function MyRecipes({user}){

    const [recipes, setRecipes] = useState([]);
    const [modalVisible, toggleModalVisible] = useState(false);

    useEffect(() => {
        fetch('https://crecipe-api.herokuapp.com/get-my-recipes/' + user[0].id)
        .then(res => res.json())
        .then(res => setRecipes(res));
    }, [recipes])

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };


    return (
        <Container>
            <Row>
                <Col />
                <Col style={{textAlign: 'center'}}>

                    <h3 className="display-3">Mes recettes</h3>
                    <small className='text-muted lead'>Trouvez ici toutes vos recettes !</small>

                </Col>
                <Col />
            </Row>
            <Row>
                <Stack gap={3}>
                    {
                        recipes.map((recipe) => {

                            const imgStr = arrayBufferToBase64(recipe.image.data);
                            const base64prefix = 'data:image/png;base64,';
                            const dateModif = new Date(recipe.date_updated)

                            return (
                                <Card key={recipe.id} style={{ width: '20rem'}}>
                                <Card.Body>
                                    <Card.Img variant="top" src={base64prefix + imgStr} />
                                    <hr />
                                    <Card.Title as="h3">{recipe.title}</Card.Title>
                                    <Card.Subtitle>Pour {recipe.quantity} pers.</Card.Subtitle>
                                    <hr />
                                    <Card.Text>
                                        {recipe.description}
                                    </Card.Text>
                                    <p className='fw-light' style={{fontSize: 'smaller'}}><small>Dernière modification le {recipe.date_updated}</small></p>
                                </Card.Body>
                                <Card.Footer>
                                    <Stack gap={3} direction='horizontal'>
                                        <Button variant='outline-dark'>
                                            Modifier la recette
                                        </Button>
                                        <Button variant='danger'>
                                            Supprimer la recette
                                        </Button>
                                    </Stack>
                                </Card.Footer>
                            </Card>
                            )
                        })
                    }
                </Stack>  
            </Row>
        </Container>
        
    )
}
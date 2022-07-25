import './AllRecipes.css';

import { useState, useEffect } from 'react';
import { Spinner, Row, Container, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function AllRecipes () {

    const [recipes, setRecipes] = useState([]);
    const [loadingData, toggleLoadingData] = useState(true);

    const nbRows = recipes.length / 5;

    useEffect(() => {
        fetch('https://crecipe-api.herokuapp.com/get-all-recipes',{
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => setRecipes(res))
        .then(() => toggleLoadingData(false));
    },[])

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return(
        !loadingData ?
            <Container fluid className='main-container' style={{textAlign: 'center'}}>
                <Row>
                    <Container style={{textAlign: 'center'}}>
                        <h1 className="display-1">Les recettes</h1>
                        <small className='text-muted lead'>Retrouvez ici toutes les recettes créées par les utilisateurs de CRECIPE !</small>
                    </Container> 
                </Row>
                {
                    recipes.length === 0 ? 
                        <div style={{marginTop: '300px'}}>                        
                            <p className='lead' style={{fontWeight: 'bold', fontSize: '30px'}}>
                                Il n'y pas encore de recette sur le site ... Créer un compte puis soyez le premier à créer une recette ! 
                            </p> 
                        </div>
                    :   
                    <Container className='recipes' fluid>
                        {
                            recipes.map((recipe) => {
                                var imgStr = arrayBufferToBase64(recipe.image.data);
                                var base64prefix = 'data:image/png;base64,';
 
                                return(
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
                                            <p className='fw-light'><small>Écrit par : {recipe.lastname} {recipe.firstname}</small></p>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button as={Link} variant='outline-dark' to={`/recipes/${recipe.id}`}>
                                                Voir la recette !
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                )
                                }
                            )
                        }   

                    </Container>
                    
                }   
            </Container> 
            :
            <Container fluid className='main-container' style={{textAlign: 'center'}}>
                <Row>
                    <Container style={{textAlign: 'center'}}>
                        <h1 className="display-1">Les recettes</h1>
                        <small className='text-muted lead'>Retrouvez ici toutes les recettes créées par les utilisateurs de CRECIPE !</small>
                    </Container> 
                </Row>
                <Row>
                    <Col/>
                    <Col style={{marginTop: 150}}>
                        <Spinner animation="border" /> {' Chargement ...'}
                    </Col>
                    <Col/>
                </Row> 
            </Container>
    )
}

function addRows(nbRows, recipes) {
    const rows = [];

    for(let i = 0; i < nbRows; i++){
        rows.push(
            <Row key={i} style={{marginTop: 20}}>
                {
                    addCols(recipes)
                }
            </Row>
        )
    }

    return rows
}

function addCols(recipes) {

    const cols = [];

    for(let i = 0; i < recipes.length ; i++){
        cols.push(
            <Col key={recipes[i]._id}>
                {recipes[i].title}
            </Col>
        )
    }

    return cols;

}

export default AllRecipes;
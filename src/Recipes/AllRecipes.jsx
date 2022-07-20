import './AllRecipes.css';

import { useState, useEffect } from 'react';
import { Spinner, Row, Container, Col, } from 'react-bootstrap'

function AllRecipes () {

    const [recipes, setRecipes] = useState([]);
    const [loadingData, toggleLoadingData] = useState(true);

    const nbRows = recipes.length / 5;

    useEffect(() => {
        fetch('https://bu8aednpzj.execute-api.us-east-2.amazonaws.com/get-all-recipes',{
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => setRecipes(res))
        .then(() => toggleLoadingData(false));
    },[])

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
                    addRows(nbRows, recipes)
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
                    <Col>
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
import './RecipeViewer.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Container, Row, Col, Card } from 'react-bootstrap';

export default function RecipeViewer() {

    const params = useParams();
    const [recipe, setRecipe] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [isLoading, toggleIsLoading] = useState(true);

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };  

    useEffect(() => {
        fetch('https://crecipe-api.herokuapp.com/get-recipe/' + params.id)
        .then((res) => res.json())
        .then((res) => setRecipe(res))
        .then(() => {
            fetch('https://crecipe-api.herokuapp.com/get-recipe-ingredients/' + params.id)
            .then((res) => res.json())
            .then((res) => setRecipeIngredients(res))
            .then(() => {
                fetch('https://crecipe-api.herokuapp.com/get-recipe-steps/' + params.id)
                .then((res) => res.json())
                .then((res) => setRecipeSteps(res))
            })
            toggleIsLoading(false);
        })

        
    }, [recipe, recipeIngredients, params.id])    

    return(
        <>
            {
                !isLoading ? 
                    recipe.length === 0 ? 
                        <Container style={{textAlign: 'center'}} fluid>
                            <Row>
                                <Col />
                                <Col>
                                   <h6 className='display-6'>Étrange ... Cette recette n'existe plus. Veuillez nous excuser pour le désagrément.</h6>
                                </Col>
                                <Col />
                            </Row>
                        </Container>
                    :
                        <Container style={{textAlign: 'center'}}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            {
                                                recipe.map((rec) => {
                                                    const imgStr = arrayBufferToBase64(rec.image.data);
                                                    const base64prefix = 'data:image/png;base64,';

                                                    return (<img key={rec.id} src={base64prefix + imgStr} alt={recipe.description} id='recipe-img'/>)
                                                })
                                            }
                                        </Col>
                                        <Col style={{textAlign: 'left'}}>
                                            <h4 className='display-4'>{recipe[0].title}</h4>
                                            <p className='fw-light'><small>Pour {recipe[0].quantity} {recipe[0].quantity > 1 ? 'personnes' : 'personne'}</small></p>
                                            <p id='recipe-text'>Les ingrédients :</p>
                                            <ol>
                                                {
                                                    recipeIngredients.map((ingredient) =>
                                                        <li key={ingredient.id}>
                                                            <strong>{ingredient.name}</strong> - {ingredient.quantity} {ingredient.measure}
                                                        </li>
                                                    )
                                                }
                                            </ol>
                                        </Col>
                                    </Row>
                                    <hr style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}/>
                                    <Row style={{marginTop: 30}} id='row-steps'>
                                        <Col>
                                            <h5 className='display-5' id='prepa-title'>La préparation</h5>
                                            <Container style={{textAlign: 'left'}} fluid>
                                                {
                                                    recipeSteps.map((rs) => 
                                                        <Row key={rs.id}>
                                                            <h3><strong>Étape {rs.step_number}</strong></h3>
                                                            <p style={{marginLeft: 15}}>{rs.description}</p>
                                                        </Row>
                                                    )
                                                }
                                            </Container>
                                        </Col>
                                    </Row>
                                    <Row style={{textAlign: 'right'}}>
                                        <Col />
                                        <Col />
                                        <Col>
                                            Auteur(trice) de la recette : {recipe[0].firstname} {recipe[0].lastname}
                                        </Col>
                                        
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                :
                <Container>
                    <Row>
                        <Col />
                        <Col>
                            Chargement ...
                        </Col>
                        <Col />
                    </Row>
                </Container>
            }
            </>
    );
}
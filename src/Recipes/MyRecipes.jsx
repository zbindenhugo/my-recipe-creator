import './MyRecipes.css';
import React, { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import ModalRecipe from '../Modals/ModalRecipe';

import { Card, Image, Icon, Button } from 'semantic-ui-react'

function Recipes({user}){

    const [recipes, setRecipes] = useState([]);
    const [modalVisible, toggleModalVisible] = useState(false);
    const [actualRecipe, setActualRecipe] = useState({});

    useEffect(() => {
        fetch('https://im01v2le77.execute-api.us-east-2.amazonaws.com/get-my-recipes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: user[0]._id})
        })
        .then(res => res.json())
        .then(res => setRecipes(res));
    }, [recipes])

    const handleDetailClick = function (e) {
        e.preventDefault();
        toggleModalVisible(v => !v)
        if(!modalVisible)
            setActualRecipe(recipes[e.target.name])
  }

    return (
        <Container fluid className='main-container'>
            <Grid 
                columns={5}
                relaxed
                centered
            >
            {
                recipes.map((recipe) => 
                <Grid.Column key={recipe._id}>
                    <Card raised>
                        <Image src={recipe.img} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{recipe.title}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Pour {recipe.quantity} pers.</span>
                        </Card.Meta>
                        <Card.Description>
                            {recipe.description}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Button basic onClick={handleDetailClick} name={recipe._position}><Icon name='eye' />Voir la recette</Button>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                )
            }
            </Grid>
            {
                modalVisible ? <ModalRecipe modalVisible={modalVisible} closeModalVisibility={handleDetailClick} recipe={actualRecipe}/> : null
            }
        </Container>
        
    )
}

export default Recipes;
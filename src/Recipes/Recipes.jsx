import './Recipes.css';
import React, { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import axios from 'axios';
import ModalRecipe from '../Modals/ModalRecipe';

import { Card, Image, Icon, Button } from 'semantic-ui-react'

function Recipes(){

    const [recipes, setRecipes] = useState([]);
    const [modalVisible, toggleModalVisible] = useState(false);
    const [actualRecipe, setActualRecipe] = useState({});

    useEffect(() => {
        axios.get('https://d9m3oxzlck.execute-api.us-east-2.amazonaws.com/get-recipes')
        .then(res => {
            setRecipes(res.data)
        })
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
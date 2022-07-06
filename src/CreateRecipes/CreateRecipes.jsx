import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Form, Grid, Header, TextArea, Button, Divider, Dropdown } from '@ma-ui-react';
import './CreateRecipes.css';

function CreateRecipes ({user}){

    const typeqty = [
        {
            key:'gr',
            text: 'Grammes',
            value: 'gr'
        },
        {
            key:'kg',
            text: 'Kilos',
            value: 'kg'
        },
        {
            key:'pin',
            text: 'Pincées',
            value: 'pincées'
        },
        {
            key:'ml',
            text: 'Mili-litres',
            value: 'ml'
        },
        {
            key:'l',
            text: 'Litre',
            value: 'l'
        }
    ]

    const [myRecipeForm, setMyRecipeForm] = useState({
        name:'',
        qty: 0,
        desc: '',
        iduser: user[0]._id
    })
    const [ingredients, setRecipeIngredients] = useState([{
        id: 1,
        name: '',
        qty: 0,
        typeqty: ''
    }]);
    const [recipeSteps, setRecipeSteps] = useState([]);

    const handleRecipeForm = (e) =>{
        setMyRecipeForm((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const createRecipe = (e) => {
        e.preventDefault();
        fetch('https://fyaywcew43.execute-api.us-east-2.amazonaws.com/create-recipe',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myRecipeForm)
        })
        .then(res => res.json())
        .then((res) => {
            res === null ? toast.error("Une erreur est survenue lors de l'ajout de la nouvelle recette") : toast.success('Ajout de la recette avec succès !')
        })
    }

    const addNewIngredient = (e) => {
        e.preventDefault();
        setRecipeIngredients(oldIngre => [...oldIngre, {id: oldIngre.length + 1, name: '', qty: 0, typeqty: ''}])
    }

    const handleIngreChange = (e) => {
        setMyRecipeForm(oldIngre => [...oldIngre, {[e.target.name]: [e.target.value]}])
    }
    return (
        <>
            <Grid 
                columns={3}
                textAlign='center'
            >
                <Grid.Column>
                    {' '}
                </Grid.Column>
                <Grid.Column>
                    <Header as='h1' content="Création d'une recette" />
                    <p>Dans cet onglet, créez votre propre recette</p>
                </Grid.Column>
                <Grid.Column>
                    {' '}
                </Grid.Column>
            </Grid>
            <Container fluid id='main-container'>
                <Form onSubmit={createRecipe}>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            label='Nom de la recette' 
                            placeholder='Saisissez le nom de la recette ...' 
                            required 
                            type='text' 
                            value={myRecipeForm.name}
                            onChange={handleRecipeForm}
                            name='name'
                        />
                        <Form.Input 
                            label='Quantité (nombres de personnes)' 
                            placeholder='Saisissez la quantité par personnes ...' 
                            required
                            type='number' 
                            value={myRecipeForm.qty}
                            onChange={handleRecipeForm}
                            name='qty'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            control={TextArea} 
                            label='Description' 
                            placeholder='Saisissez une description simple pour la recette ...' 
                            required 
                            type='text'
                            value={myRecipeForm.desc}
                            onChange={handleRecipeForm}
                            name='desc'
                        />
                    </Form.Group>
                    <Divider />
                    {
                        ingredients.map((ingredient) => {
                            <h1>{ingredient.id}</h1>
                        })
                    }
                    <Button onClick={addNewIngredient}> Ajouter un ingrédient</Button>
                    <Button type='submit'>Créer la recette</Button>
                </Form>
            </Container>
            <ToastContainer />
        </>
    )
}

export default CreateRecipes;
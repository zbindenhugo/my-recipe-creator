import './ModalRecipe.css'
import { useState, useEffect } from 'react';
import { Header, Image, ListItem, Modal, List, Loader, Dimmer, Grid } from 'semantic-ui-react'

function ModalRecipe ({modalVisible, closeModalVisibility, recipe}){

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [isLoading, toggleIsLoading] = useState(true);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        fetch('https://bhc39h7p72.execute-api.us-east-2.amazonaws.com/get-recipe-ingredients', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: recipe._position})
        })
        .then(res => res.json())
        .then(res => setIngredients(res));

        fetch('https://xhv48ltf1h.execute-api.us-east-2.amazonaws.com/get-recipe-steps', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: recipe._position})
        })
        .then(res => res.json())
        .then(res => setSteps(res));

        toggleIsLoading(false);
    }, [])

    return (
        <Modal
            closeIcon
            onClose={closeModalVisibility}
            open={modalVisible}
            dimmer='blurring'
        >
            <Modal.Content image scrolling={true}>
                <Image src={recipe.img} wrapped />
                {
                    isLoading ? 
                    <Dimmer active>
                        <Loader />
                    </Dimmer> : 
                        <Modal.Description >
                        {
                            steps.map((step) => 
                                <div key={step._id} className="modaldesc-container">
                                    <Header as='h3' dividing>Étape n°{step.stepnumber} :</Header>
                                    <p>{step.description}</p>
                                </div>
                            )
                        }
                        
                        <Header as='h3'>Et maintenant ... C'est prêt !</Header>

                        </Modal.Description>
                }
            </Modal.Content>
            <Modal.Actions>
                <Grid
                    textAlign='left'
                >
                    <Grid.Column>
                        <Header as='h3' >Pour cette recette il vous faudra ...</Header>
                        <List divided horizontal>
                        {
                            ingredients.map((ingredient) => 
                                <ListItem key={ingredient._id}>
                                    <List.Content>
                                        <List.Header as='h4'>{capitalize(ingredient.name)}</List.Header>
                                        <List.Description>Quantité : {ingredient.quantity} {ingredient.typeQty}</List.Description>
                                    </List.Content>
                                </ListItem>
                            )
                        }
                        </List>
                    </Grid.Column>
                </Grid>
                
            </Modal.Actions>
        </Modal>
    )
}

export default ModalRecipe;
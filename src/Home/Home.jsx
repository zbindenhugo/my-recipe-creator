import './Home.css'
import { Container, Header, Icon } from "semantic-ui-react";

function Home () {
    return <Container textAlign="center" className="main-container">
        <Header as='h2' icon>
            <Icon name='file alternate outline' circular />
            <Header.Content>Mon créateur de recettes</Header.Content>
            <Header sub>Application web permettant de créer vos propres recettes</Header>
        </Header>
        
    </Container>
}

export default Home;
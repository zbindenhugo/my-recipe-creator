import { Container, Row, Col } from 'react-bootstrap';
import './Home.css'

function Home () {
    return (
        <Container fluid style={{textAlign: 'center'}}>
            <Container>
                <h1 className="display-1 animate__animated animate__backInRight">CRECIPE</h1>
                <small className='text-muted lead animate__animated animate__fadeIn animate__delay-1s'>Votre créateur de recette en ligne. Moins de papier, plus d'imagination !</small>
            </Container> 
            <Container className='animate__animated animate__backInLeft animate__delay-1s home-text-container' fluid>
                <Row>
                    <Col>
                        <h6 className="display-6">Crecipe c'est quoi ?</h6>
                    </Col>
                    
                    <Col>
                        <Col><h6 className="display-6">Mais pourquoi créer Crecipe ?</h6></Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='home-simpletext'>Crecipe c'est une idée simple, qui nous servirai au quotidien : <br /><strong>créer ses propres recette</strong></p>
                        <p className='home-simpletext'>Fini de re-demander encore une fois la recette à quelqu'un</p>
                        <p className='home-simpletext'>Stop aux feuilles qui ont servis a écrire une recette et qui se perdent quand on range</p>
                        <p className='home-simpletext'>Crecipe (Create Recipe : Créer recette en anglais) vous permettra de créer vos recette, et de les garder ...</p>
                        <p className='home-simpletext'><strong>A VIE</strong></p>
                        <p>(Plûtot cool non ?)</p>
                    </Col>
                    <Col>
                        <p className='home-simpletext'>Je suis un jeune web développeur, qui, pour se perfectionner voulais avoir un projet concret.</p>
                        <p className='home-simpletext'>J'adore également cuisiner, mais je ne note jamais mes recettes... c'est un jour où je demandais une recette à ma mère que l'idée m'est venu !</p>
                        <p className='home-simpletext'>C'est un jour où je demandais une recette à ma mère que l'idée m'est venu !</p>
                        <figcaption className='blockquote-footer'>
                                Hugo, 2022 : "Et si je faisais un créateur de recette pour tout les gens tête en l'air comme moi ?"
                            </figcaption>
                        <p className='home-simpletext'>Et voilà comment est né le projet !</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Home;
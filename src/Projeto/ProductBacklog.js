import React, { Component, Fragment } from 'react';
import { Modal, Button, Icon, Grid, ModalActions} from 'semantic-ui-react'
import Story from './Story';

class ProductBacklog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openAndClose: false,
        }
    }

    showAndHide = () => {
        this.setState(prevState => ({
            openAndClose: !prevState.openAndClose
        }));
    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.showAndHide} floated='left' color='teal'>
                    <Icon name='list' />Todas as Estórias
                </Button>
                <Modal
                    
                    size='fullscreen'
                    dimmer='blurring'
                    open={this.state.openAndClose}>
                    <ModalActions>
                        <Icon onClick={this.showAndHide} link name='close'></Icon>
                    </ModalActions>
                    <Modal.Header color='teal'><Icon name='list' /> Todas as Estórias</Modal.Header>
                    <Modal.Content>
                        <Grid columns={4} stackable>
                            <br />
                            {
                                this.props.stories && Object.keys(this.props.stories)
                                    .map(
                                        key => {
                                            return (
                                                <Fragment key={key}>
                                                    <Grid.Column >
                                                        <Story
                                                            key={key}
                                                            id={key}
                                                            idProj={this.props.idProj}
                                                            descricao={this.props.stories[key].storiesDesc}
                                                            titulo={this.props.stories[key].storiesTitulo}
                                                            dataInicio={this.props.stories[key].dataInicio}
                                                            dataFim={this.props.stories[key].dataFim}
                                                            situacao={this.props.stories[key].situacao}
                                                            pontos={this.props.stories[key].storyPoint}
                                                            atualizadoPor={this.props.stories[key].atualizadoPor}
                                                            handleLoad={this.carregaStories}
                                                        />
                                                    </Grid.Column>
                                                </Fragment>)
                                        })
                            }
                        </Grid>
                    </Modal.Content>
                    <ModalActions>
                        <Button onClick={this.showAndHide}>Fechar</Button>
                    </ModalActions>
                </Modal>
            </Fragment>
        );
    }
}

export default ProductBacklog;
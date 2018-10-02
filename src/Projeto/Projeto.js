import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Icon, List, Modal, Button, Input } from 'semantic-ui-react';


class Projeto extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpenRenomear: false,
            modalOpenExcluir: false,
            modalOpenFechar: false
        }
    }

    handleOpenRenomear = () => this.setState({ modalOpenRenomear: true })

    handleCloseRenomear = () => this.setState({ modalOpenRenomear: false })

    handleOpenExcluir = () => this.setState({ modalOpenExcluir: true })

    handleCloseExcluir = () => this.setState({ modalOpenExcluir: false })

    handleOpenFechar = () => this.setState({ modalOpenFechar: true })

    handleCloseFechar = () => this.setState({ modalOpenFechar: false })

    render() {

        return (
            <Grid.Column>

                <Segment >
                    <Link to={`/kanban/${this.props.titulo}`}>
                        <Header as='h2'>
                            <Header.Subheader>
                                <Icon name={this.props.icone} />
                            </Header.Subheader>
                            {this.props.titulo}
                        </Header>
                    </Link>
                    <List>
                        <List.Item>
                            <Modal
                                trigger={<Button onClick={this.handleOpenFechar} size='mini'>Sobre</Button>}
                                basic size='small'
                                open={this.state.modalOpenFechar}
                                onClose={this.handleCloseFechar}
                            >
                                <Header icon='info circle' content='Sobre este projeto' />
                                <Modal.Content>
                                    <Modal.Description>
                                        <Header>Projeto 1</Header>
                                        <h3>We've found the following gravatar image associated with your e-mail address.</h3>
                                        <h3>Is it okay to use this photo?</h3>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.handleCloseFechar} basic color='red' inverted>
                                        <Icon name='remove' /> Fechar
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Modal
                                trigger={<Button onClick={this.handleOpenRenomear} size='mini'>Renomear</Button>}
                                basic size='small'
                                open={this.state.modalOpenRenomear}
                                onClose={this.handleCloseRenomear}
                            >
                                <Header icon='edit outline' content='Renomear Projeto' />
                                <Modal.Content>
                                    <Input></Input>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.handleCloseRenomear} basic color='red' inverted>
                                        <Icon name='remove' /> Cancelar
                                    </Button>
                                    <Button color='green' inverted>
                                        <Icon name='checkmark' /> Confirmar
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Link to='/burndown'><Button size='mini'>Burndown</Button></Link>
                        </List.Item>
                        <List.Item>
                            <Modal
                                trigger={<Button onClick={this.handleOpenExcluir} size='mini'>Excluir</Button>}
                                basic size='small'
                                open={this.state.modalOpenExcluir}
                                onClose={this.handleCloseExcluir}
                            >
                                <Header icon='archive' content='Deletar esse projeto' />
                                <Modal.Content>
                                    <h4>
                                        Você realmente deseja excluir este projeto?
                                </h4>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.handleCloseExcluir} basic color='red' inverted>
                                        <Icon name='remove' /> Não
                            </Button>
                                    <Button color='green' inverted>
                                        <Icon name='checkmark' /> Sim
                            </Button>
                                </Modal.Actions>
                            </Modal>
                        </List.Item>
                    </List>
                </Segment>
            </Grid.Column >
        )
    }
}

export default Projeto;
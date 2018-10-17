import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Icon, List, Modal, Button, Input } from 'semantic-ui-react';
import config, { auth, providers, db } from './../config';

class Projeto extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nomeNovo: '',
            modalOpenRenomear: false,
            modalOpenExcluir: false,
            modalOpenFechar: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    

    removeItem(itemId) {
        const projetoRef = db.ref(`/projetos/${itemId}`);
        projetoRef.remove();
    }

    renomearItem(itemId) { 
        const projetoRef = db.ref(`/projetos/${itemId}`);
        console.log('descricaoProps: ', this.props.descricao)

        projetoRef.update({
            nome: this.state.nomeNovo,
        });
        
        this.setState({
            nomeNovo: '',     
        });
        
}

    handleOpenRenomear = () => this.setState({ modalOpenRenomear: true })

    handleCloseRenomear = () => this.setState({ modalOpenRenomear: false })

    handleOpenExcluir = () => {
        this.setState({ modalOpenExcluir: true })
    }

    handleCloseExcluir = () => {

        this.setState({ modalOpenExcluir: false })
        console.log('abriu');
    }
    handleOpenFechar = () => this.setState({ modalOpenFechar: true })

    handleCloseFechar = () => this.setState({ modalOpenFechar: false })

    render() {

        return (
            <Grid.Column >
                <Segment >
                    <Link to={`/kanban/${this.props.titulo}/${this.props.id}`}>
                        <Header as='h3' color='teal'>
                            {this.props.titulo} <Icon name='sign in' size='mini' />
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
                                        <h3>{this.props.descricao}</h3>
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
                                    <Input type='text' name='nomeNovo' placeholder='Novo Nome' onChange={this.handleChange} />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.handleCloseRenomear} basic color='red' inverted>
                                        <Icon name='remove' /> Cancelar
                                    </Button>
                                    <Button onClick={() => this.renomearItem(this.props.id)} color='green' inverted>
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
                                    <Button basic color='red' inverted>
                                        <Icon name='remove' /> Não
                            </Button>
                                    <Button onClick={() => this.removeItem(this.props.id)} color='green' inverted>
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
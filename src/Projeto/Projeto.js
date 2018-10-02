import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Icon, List, Modal, Button, Input } from 'semantic-ui-react';


const Projeto = props => {



    return (
        <Grid.Column>

            <Segment >
                <Link to={`/kanban/${props.titulo}`}>
                    <Header as='h2'>
                        <Header.Subheader>
                            <Icon name={props.icone} />
                        </Header.Subheader>
                        {props.titulo}
                    </Header>
                </Link>
                <List>
                    <List.Item>
                        <Modal trigger={<Button size='mini'>Sobre</Button>} basic size='small'>
                            <Header icon='info circle' content='Sobre este projeto' />
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>Projeto 1</Header>
                                    <h3>We've found the following gravatar image associated with your e-mail address.</h3>
                                    <h3>Is it okay to use this photo?</h3>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </List.Item>
                    <List.Item>
                        <Modal trigger={<Button size='mini'>Renomear</Button>} basic size='small'>
                            <Header icon='edit outline' content='Renomear Projeto' />
                            <Modal.Content>
                                <Input></Input>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='red' inverted>
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
                        <Modal trigger={<Button size='mini'>Excluir</Button>} basic size='small'>
                            <Header icon='archive' content='Deletar esse projeto' />
                            <Modal.Content>
                                <h4>
                                    Você realmente deseja excluir este projeto?
                                </h4>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={null} basic color='red' inverted>
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

export default Projeto;
import React, { Component, Fragment } from 'react';
import { Grid, Segment, Header, Icon, ListItem, List, Button, Modal, Input, Form, TextArea, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config, { auth, providers, db } from './../config';

class Storie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //atributos novos para update
            tituloNovo: '',
            descricaoNovo: '',
            dataInicioNovo: '',
            dataFimNovo: '',
            progressoNovo: '',
            pontosNovo: '',
            
            situacao: '',

            //modals
            modalOpenUpdate: false,
        }
    }

    componentDidMount = () => {
        this.loadData()
    }

    loadData = () => {
        this.setState({
            tituloNovo: this.props.titulo,
            descricaoNovo: this.props.descricao,
            dataInicioNovo: this.props.dataInicio,
            dataFimNovo: this.props.dataFim,
            pontosNovo: this.props.pontos,
            situacao: this.props.situacao,
        })
    }

    edit = () => {
        this.loadData()
        this.show()
    }

    hide = () => {
        this.setState({modalOpenUpdate: false})
     }
 
     show = () => {
        this.setState({modalOpenUpdate: true})
     }
    
    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({ 
            [name]: value,
        })
    }


    handleUpdate = event => {
        
        event.preventDefault();
        
        const itemId = this.props.id;
        const projId = this.props.idProj

        const storyRef = db.ref(`/projetos/${projId}/stories/${itemId}`);
        
        const updateStory = {
            storiesTitulo: this.state.tituloNovo,
            storiesDesc: this.state.descricaoNovo,
            dataInicio: this.state.dataInicioNovo,
            dataFim: this.state.dataFimNovo,
            situacao: this.state.situacao,
            storyPoint: this.state.pontosNovo,
        }
        
        storyRef.update(updateStory)

        this.setState({
            tituloNovo: '',
            descricaoNovo: '',
            dataInicioNovo: '',
            datafimNovo: '',
            situacao: 'A fazer',
            storyPointNovo: '',
        });

        this.hide()

    }

    //Primeiro preciso codar os projetos pra receber os parametros certos pra exluir usando a ID do projeto
    removeItem(itemId, projId) {
      //  console.log('id da story: ', itemId);
      //  console.log('id do projeto: ', itemId);
        const itemRef = db.ref(`/projetos/${projId}/stories/${itemId}`);
        itemRef.remove();
    }

    render() {
        return (
            <Fragment >
                {/* Os parâmetros passados pelas rotas chegam no componente através da propriedade params.
                Poderíamos acessar o parâmetro id de dentro do componente respectivo à rota */
                }
                < Segment >
                    <List size={"tiny"}>
                        <Header as='h4'>Título: {this.props.titulo}
                            <Header.Subheader>
                                <List.Item>
                                    <p>Descrição: {this.props.descricao}</p>
                                </List.Item>
                                <ListItem>
                                    <p>Data Inicio: {this.props.dataInicio}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Data Fim: {this.props.dataFim}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Progresso: {this.props.situacao}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Pontos: {this.props.pontos}</p>
                                </ListItem>
                            </Header.Subheader>
                        </Header>
                        <Link to=''><Button icon='clipboard outline' size='mini' /></Link>
                        <Button onClick={this.edit} size='mini' icon='edit outline' />
                        <Modal
                            size='small'
                            open={this.state.modalOpenUpdate}
                            dimmer='blurring'                      
                        >
                            <Header icon='edit outline' content='Atualizar Story' />
                            <Message color='yellow'>*Deixe o campo em branco vazio se não quiser alterá-lo</Message>
                                <Modal.Content>
                                    <Form onSubmit={this.handleUpdate}>
                                        <Form.Field>
                                            <label>Novo Título:</label>
                                            <Input type='text' name='tituloNovo' value={this.state.tituloNovo} placeholder='Novo Título' onChange={this.handleChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Nova Descrição:</label>
                                            <TextArea type='text' name='descricaoNovo' value={this.state.descricaoNovo} rows='3' onChange={this.handleChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Nova Data Inicio:</label>
                                            <Input type='text' name='dataInicioNovo'  value={this.state.dataInicioNovo}  placeholder='Nova Data Início' onChange={this.handleChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Nova Data Fim:</label>
                                            <Input type='text' name='dataFimNovo'  value={this.state.dataFimNovo} placeholder='Nova Data Fim' onChange={this.handleChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Novo Progresso</label>
                                            <select value={this.state.situacao} name="situacao" onChange={this.handleChange}>
                                                <option value="A fazer">A Fazer</option>
                                                <option value="Fazendo">Fazendo</option>
                                                <option value="Concluida">Concluída</option>
                                            </select>
                                            {/*<Input type='text' name='progressoNovo' placeholder='Novo Status de Progresso' onChange={this.handleChange} />*/}
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Nova Pontuação</label>
                                            <Input type='text' name='pontosNovo' value={this.state.pontosNovo} placeholder='Nova Pontuação' onChange={this.handleChange} />
                                        </Form.Field>
                                        
                                    <Button onClick={this.hide} color='red' inverted>
                                        <Icon name='remove' /> Fechar
                                        </Button>
                                    <Button type='submit'>Atualizar</Button>
                                    </Form>
                                </Modal.Content>
                        </Modal>
                        <Button icon='delete' size='mini' onClick={() => this.removeItem(this.props.id, this.props.idProj)} />
                    </List>
                </Segment>
            </Fragment>
        )
    }
}

export default Storie;
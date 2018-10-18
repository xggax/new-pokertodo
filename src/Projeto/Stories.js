import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import config, { auth, providers, db } from './../config';

import HeaderCustom from './HeaderCustom';
import { Container, Segment, Grid, Button, Header, List, Modal, Icon, Form, Divider, Progress } from 'semantic-ui-react'
import Storie from './Storie';
import Participantes from './Participantes';

class Stories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            descProj: '',
            stories: {},
            storyAtual: 0,
            quantStories: 3,
            estaCarregando: false,
            titulo: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            situacao: '',
            storyPoint: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.carregaStories(this.props.match.params.nome);

    }


    // receber os eventos de mudança de estado pra cada field do formulário e armazenar nos meus estados
    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            situacao: 'A fazer',
            storyPoint: '?',
        })
    }

    //Enviar o formulário e guardar a nova storie no Banco de dados
    handleSubmit(e) {
        e.preventDefault();
        const idSubmit = this.props.match.params.id;
        const proj = this.props.match.params.nome;

        //const projetosRef = db.ref(`projetos/${idSubmit}/stories/${id}`);
        const storiesRef = db.ref(`projetos/${idSubmit}/stories`);
        const story = {
            storiesTitulo: this.state.titulo,
            storiesDesc: this.state.descricao,
            dataInicio: this.state.dataInicio,
            dataFim: this.state.dataFim,
            situacao: this.state.situacao,
            storyPoint: this.state.storyPoint,
        }

        storiesRef.push(story);
        
        this.setState({
            titulo: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            situacao: '',
            storyPoint: '',
        });

        this.carregaStories(proj);

    }

    carregaStories(proj) {
        console.log('projeto: ', proj);
        this.setState({
            stories: {},
            estaCarregando: true,
        })
        //const storiesRef = db.ref(`projetos/${proj}/stories/`);
        const storiesRef = db.ref('projetos');
        storiesRef.on('value', (snapshot) => {
            let projetos = snapshot.val();
            console.log('projetos: ', projetos);
            let stories = projetos;
            let newState = {};
            let descProj = '';

            for (let key in stories) {
                console.log(stories[key]);
                if(stories[key].nome === proj){
                    console.log('É esse aqui:', stories[key]);
                    newState = stories[key].stories;
                    descProj =  stories[key].descricao;
                }
            }

            console.log('newState: ', newState );
            
            this.setState({
                stories: newState,
                estaCarregando: false,
                descProj: descProj
            });
        });
}




render() {
    /*let item = [];*/
    if (this.state.estaCarregando) {
        return <p><Icon loading name='spinner' /> Carregando...</p>
    }

    return (

        <div>
            <HeaderCustom />
            {/*<h2>{JSON.stringify(this.state.stories)}</h2>*/}
            <Container>
                <Segment piled>
                    <Header as='h2'>Kanban</Header>
                </Segment>
                <Header as='h2' >
                    Projeto: {this.props.match.params.nome}
                    <Header.Subheader>Descrição: {this.state.descProj}</Header.Subheader>
                    <Divider />
                    <Participantes />
                    <Divider />
                </Header>
                <Link to=''><Button floated='left' color='teal'><Icon name='book' /> Product Backlog</Button></Link><br /><br />
                <Modal trigger={
                    <Button floated='left'
                        color='teal'
                    >
                        <Icon name='plus' /> Nova Story</Button>}>
                    <Modal.Header color='teal'>Cadastrar Nova Story</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Título</label>
                                <input type='text' name='titulo' placeholder='Título' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Descrição</label>
                                <textarea type='text' name='descricao' rows='3' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Data Início</label>
                                <input type='text' name='dataInicio' placeholder='Data Início' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Data Fim</label>
                                <input type='text' name='dataFim' placeholder='Data Fim' onChange={this.handleChange} />
                            </Form.Field>
                            <Button>Cancelar</Button><Button type='submit'>Cadastrar</Button>
                        </Form>
                    </Modal.Content>
                </Modal>

                <br /><br /><br />

                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={5} >
                            <List>
                                {

                                    <List.Item>

                                        <Header as='h2' dividing>A Fazer</Header>
                                        <br />

                                        {
                                            this.state.stories && Object.keys(this.state.stories)
                                                .map(
                                                    key => {
                                                        // isMember ? "$2.00" : "$10.00"

                                                        return (this.state.stories[key].situacao === 'A fazer' ?
                                                            <Storie
                                                                id = {key}
                                                                key = {key}
                                                                idProj = {this.props.match.params.id}
                                                                descricao={this.state.stories[key].storiesDesc}
                                                                titulo={this.state.stories[key].storiesTitulo}
                                                                dataInicio={this.state.stories[key].dataInicio}
                                                                dataFim={this.state.stories[key].dataFim}
                                                                situacao={this.state.stories[key].situacao}
                                                                pontos={this.state.stories[key].storiesPoint}
                                                            /> : null)

                                                    })
                                        }

                                    </List.Item>
                                }
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <List>
                                {

                                    <List.Item>

                                        <Header as='h2' dividing>Fazendo</Header>
                                        <br />
                                        {
                                            this.state.stories && Object.keys(this.state.stories)
                                                .map(
                                                    key => {
                                                        // isMember ? "$2.00" : "$10.00"
                                                        return (this.state.stories[key].situacao === 'Fazendo' ?
                                                            <Storie 
                                                                id = {key}
                                                                key = {key}
                                                                idProj = {this.props.match.params.id}
                                                                descricao={this.state.stories[key].storiesDesc}
                                                                titulo={this.state.stories[key].storiesTitulo}
                                                                dataInicio={this.state.stories[key].dataInicio}
                                                                dataFim={this.state.stories[key].dataFim}
                                                                situacao={this.state.stories[key].situacao}
                                                                pontos={this.state.stories[key].storiesPoint}
                                                            /> : null)

                                                    })
                                        }

                                    </List.Item>
                                }
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <List>
                                {

                                    <List.Item>

                                        <Header as='h2' dividing>Concluída</Header>
                                        <br />
                                        {
                                            this.state.stories && Object.keys(this.state.stories)
                                                .map(
                                                    key => {
                                                        // isMember ? "$2.00" : "$10.00"
                                                        return (this.state.stories[key].situacao === 'Concluida' ?
                                                            <Storie 
                                                                key={key}
                                                                id={key}
                                                                idProj = {this.props.match.params.id}
                                                                descricao={this.state.stories[key].storiesDesc}
                                                                titulo={this.state.stories[key].storiesTitulo}
                                                                dataInicio={this.state.stories[key].dataInicio}
                                                                dataFim={this.state.stories[key].dataFim}
                                                                situacao={this.state.stories[key].situacao}
                                                                pontos={this.state.stories[key].storiesPoint}
                                                            /> : null)

                                                    })
                                        }

                                    </List.Item>
                                }
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Header as='h3'>Concluídas</Header>
                <Progress value={this.state.storyAtual} total={this.state.quantStories} progress='ratio' />
            </Container>
        </div>
    )
}
}

export default Stories;
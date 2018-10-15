import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import config from './../config';

import HeaderCustom from './HeaderCustom';
import { Container, Segment, Grid, Button, Header, List, Modal, Icon, Form, Divider, Progress } from 'semantic-ui-react'
import Storie from './Storie';
import Participantes from './Participantes';

class Stories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stories: {},
            storyAtual: 0,
            quantStories: 3,
            estaCarregando: false,
            titulo: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
            situacao: '',
            storiesPoint: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.carregaStories(this.props.match.params.nome);
        
    }


    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;




        this.setState({
            [name]: value,
            situacao: 'A fazer', 
            storiesPoint: '?',
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        // Array que vai guardar as chaves
        let item = [];
        let id;
        //const projSubmit = this.props.match.params.nome;
        const idSubmit = this.props.match.params.id;

        //iteração pra guardar as chaves
        Object.keys(this.state.stories.stories)
            .map(key => {
                return item.push(key);
            });
            id = item.length;
            console.log('idSubmit', idSubmit);
            console.log('id', id);
        
        config.post(`projetos/${idSubmit}/stories/${id}`, {
            data: {
                storiesTitulo: this.state.titulo,
                storiesDesc: this.state.descricao,
                dataInicio: this.state.dataInicio,
                dataFim: this.state.dataFim,
                situacao: 'A fazer', 
                storiesPoint: '?',
                
            },
            then(err) {

                if (!err) {
                    console.log('works');
                }
            }
        });
        
        this.setState({
            quantStories: 3,
            titulo: ' ',
            descricao:' ',
            dataInicio: ' ',
            dataFim: ' ',
            situacao: ' ',
            storiesPoint: ' '
        })
        
        this.carregaStories(this.props.match.params.nome);
        

    }

    carregaStories(proj) {
        this.setState({
            estaCarregando: true,
            stories: {}
        })
        const url = `https://newpokertodo.firebaseio.com/projetos.json?orderBy="nome"&equalTo="${proj}"`;
        axios
            .get(url)
            .then(dados => {
                console.log('dados.data: ', dados.data);
                console.log('ObjectKeys: ', Object.keys(dados.data)[0])
                const chave = Object.keys(dados.data)[0];
                console.log('chave: ', chave);
                console.log('lista de stories:', dados.data[chave]);
                this.setState({
                    estaCarregando: false,
                    stories: dados.data[chave]
                })
            })
            .catch(err => {
                console.log('erro');
            })

    }




    render() {
        let item = [];
        if (this.state.estaCarregando) {
            return <p><Icon loading name='spinner' /> Carregando...</p>
        }
        return (

            <div>
                <HeaderCustom />
                {/*<h2>{JSON.stringify(this.props)}</h2>*/}
                <Container>
                    <Segment piled>
                        <Header as='h2'>Kanban</Header>
                    </Segment>
                    <Header as='h2' >
                        {this.props.match.params.nome}
                        <Header.Subheader>{this.state.stories.descricao}</Header.Subheader>
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
                                    {this.state.titulo}
                                </Form.Field>
                                <Form.Field>
                                    <label>Descrição</label>
                                    <textarea type='text' name='descricao' rows='3' onChange={this.handleChange} />
                                    {this.state.descricao}
                                </Form.Field>
                                <Form.Field>
                                    <label>Data Início</label>
                                    <input type='text' name='dataInicio' placeholder='Data Início' onChange={this.handleChange} />
                                    {this.state.dataInicio}
                                </Form.Field>
                                <Form.Field>
                                    <label>Data Fim</label>
                                    <input type='text' name='dataFim' placeholder='Data Fim' onChange={this.handleChange} />
                                    {this.state.dataFim}
                                    {this.state.situacao}
                                    {this.state.storiesPoint}
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
                                                this.state.stories.stories && Object.keys(this.state.stories.stories)
                                                    .map(
                                                        key => {
                                                            // isMember ? "$2.00" : "$10.00"

                                                            return (this.state.stories.stories[key].situacao === 'A fazer' ?
                                                                <Storie id={key}
                                                                    descricao={this.state.stories.stories[key].storiesDesc}
                                                                    titulo={this.state.stories.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories.stories[key].dataInicio}
                                                                    dataFim={this.state.stories.stories[key].dataFim}
                                                                    situacao={this.state.stories.stories[key].situacao}
                                                                    pontos={this.state.stories.stories[key].storiesPoint}
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
                                                this.state.stories.stories && Object.keys(this.state.stories.stories)
                                                    .map(
                                                        key => {
                                                            // isMember ? "$2.00" : "$10.00"
                                                            return (this.state.stories.stories[key].situacao === 'Fazendo' ?
                                                                <Storie id={key}
                                                                    descricao={this.state.stories.stories[key].storiesDesc}
                                                                    titulo={this.state.stories.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories.stories[key].dataInicio}
                                                                    dataFim={this.state.stories.stories[key].dataFim}
                                                                    situacao={this.state.stories.stories[key].situacao}
                                                                    pontos={this.state.stories.stories[key].storiesPoint}
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

                                            <Header as='h2' dividing>Concluida</Header>
                                            <br />
                                            {
                                                this.state.stories.stories && Object.keys(this.state.stories.stories)
                                                    .map(
                                                        key => {
                                                            // isMember ? "$2.00" : "$10.00"
                                                            return (this.state.stories.stories[key].situacao === 'Concluida' ?
                                                                <Storie id={key}
                                                                    descricao={this.state.stories.stories[key].storiesDesc}
                                                                    titulo={this.state.stories.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories.stories[key].dataInicio}
                                                                    dataFim={this.state.stories.stories[key].dataFim}
                                                                    situacao={this.state.stories.stories[key].situacao}
                                                                    pontos={this.state.stories.stories[key].storiesPoint}
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
                    <Progress value={this.state.storyAtual} total={this.state.quantStories} progress='ratio'/>
                    <Divider />
                    <Participantes />
                    <Divider />
                </Container>
            </div>
        )
    }
}

export default Stories;
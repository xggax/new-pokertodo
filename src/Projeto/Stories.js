import React, { Component, Fragment } from 'react';
import { db, auth } from './../config';
import { Container, Segment, Grid, Button, Header, List, Modal, Icon, Form, Divider, Progress } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import isAfter from 'date-fns/isAfter';
import "react-datepicker/dist/react-datepicker.css";

import HeaderCustom from './HeaderCustom';
import Participantes from './Participantes';
import Story from './Story';

class Stories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openAndClose: false,
            estaCarregando: false,
            stories: {},
            equipeProj: {},
            scrumMasterProj: '',
            descProj: '',
            concluidas: '',
            quantStories: '',
            titulo: '',
            descricao: '',
            dataInicio: new Date(),
            dataFim: new Date(),
            situacao: '',
            storyPoint: '',
            atualizadoPor: '',

        }

    }

    componentDidMount = () => {

        //this.carregaStories(this.props.match.params.nome);
        this.carregaStories(this.props.match.params.id);
    }

    // receber os eventos de mudança de estado pra cada field do formulário e armazenar nos meus estados
    handleChangeNormal = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            situacao: 'A fazer',
            storyPoint: '?',
            atualizadoPor: auth.currentUser.displayName
        })
    }

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.dataInicio;
        endDate = endDate || this.state.dataFim;

        if (isAfter(startDate, endDate)) {
            endDate = startDate;
        }

        this.setState({ dataInicio: startDate, dataFim: endDate });
    };

    handleChangeDataInicio = (startDate) => {
        this.handleChange({ startDate });
    }

    handleChangeDataFim = (endDate) => {
        this.handleChange({ endDate })
    };

    //Enviar o formulário e guardar a nova story no Banco de dados
    handleSubmit = e => {
        e.preventDefault();
        const idProj = this.props.match.params.id;
        // Pegar uma chave para a nova Story.
        const novaChaveStory = db.ref(`projetos/${idProj}`).child('stories').push().key;
        // Objeto da nova Story
        const story = {
            storiesTitulo: this.state.titulo,
            storiesDesc: this.state.descricao,
            dataInicio: this.state.dataInicio,
            dataFim: this.state.dataFim,
            situacao: this.state.situacao,
            storyPoint: this.state.storyPoint,
            atualizadoPor: this.state.atualizadoPor,
        }

        const usuario = db.ref().child('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);

        usuario.once('value', (snapshot) => {
            let usuarioObjeto = snapshot.val();
            let chaveUsuario = Object.keys(usuarioObjeto)[0];
            let updates = {};
            updates['/projetos/' + idProj + '/stories/' + novaChaveStory] = story;
            updates['/projetosDoUsuario/' + chaveUsuario + '/' + idProj + '/stories/' + novaChaveStory] = story;

            db.ref().update(updates);

        })

        this.showAndHide();


    }

    carregaStories = (idProj) => {

        this.setState({
            stories: {},
            estaCarregando: true,
        })

        const projetoRef = db.ref(`projetos/${idProj}`);
        //Observador ligado pra atualizar nos outros
        projetoRef.on('value', (snapshot) => {
            let projeto = snapshot.val();
            if (projeto) {
                this.setState({
                    stories: projeto.stories,
                    descProj: projeto.descricao,
                    equipeProj: projeto.equipeProj,
                    scrumMasterProj: projeto.scrumMasterProj,
                    estaCarregando: false,
                });
            }
        });

        this.totalConcluidas();
    }

    showAndHide = () => {
        this.setState(prevState => ({
            openAndClose: !prevState.openAndClose
        }));
    }

    totalConcluidas = () => {
        const idSubmit = this.props.match.params.id;
        const storiesRef = db.ref(`projetos/${idSubmit}/stories`);

        storiesRef.on('value', (snapshot) => {
            let concluidas = 0;
            let quantStories = 0;
            let stories = snapshot.val();

            for (let key in stories) {

                quantStories += 1

                if (stories[key].situacao === 'Concluida') {
                    concluidas += 1;
                }

            }

            this.setState({
                concluidas: concluidas,
                quantStories: quantStories
            });
        });


    }


    render() {
        if (this.state.estaCarregando) {
            return <p><Icon loading name='spinner' /> Carregando...</p>
        }

        return (

            <Fragment>
                <HeaderCustom />
                {/*<h2>{JSON.stringify(this.state.stories)}</h2>*/}
                <Container>
                    <Segment piled>
                        <Header as='h2'>Quadro Kanban</Header>
                    </Segment>
                    <Header as='h2' >
                        Projeto: {this.props.match.params.nome}
                        <Header.Subheader>Descrição: {this.state.descProj}</Header.Subheader>
                        <Divider />
                        <Participantes
                            equipeProj={this.state.equipeProj}
                            scrumMasterProj={this.state.scrumMasterProj}
                            idProj={this.props.match.params.id}
                            carregaStories={this.carregaStories}
                        //carregaStories= {this.carregaStories}
                        />
                        <Divider />
                    </Header>
                    <Divider />
                    <Header as='h3'>Concluídas</Header>
                    <Progress color='teal' value={this.state.concluidas} total={this.state.quantStories} progress='ratio' />
                    <Divider />
                    {/*<Link to=''><Button floated='left' color='teal'><Icon name='book' /> Product Backlog</Button></Link><br /><br />*/}
                    <Button onClick={this.showAndHide} floated='left' color='teal'>
                        <Icon name='plus' />Nova Story
                </Button>
                    <Modal open={this.state.openAndClose}>
                        <Modal.Header color='teal'>Cadastrar Nova Story</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Título</label>
                                    <input required value={this.state.titulo} type='text' name='titulo' placeholder='Título' onChange={this.handleChangeNormal} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Descrição</label>
                                    <textarea required value={this.state.descricao} type='text' name='descricao' rows='3' onChange={this.handleChangeNormal} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Data de Início Prevista:</label>
                                    <DatePicker
                                        selected={this.state.dataInicio}
                                        selectsStart
                                        startDate={this.state.dataInicio}
                                        endDate={this.state.dataFim}
                                        onChange={this.handleChangeDataInicio}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="DD/MM/AAAA"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Data Fim Prevista:</label>
                                    <DatePicker
                                        selected={this.state.dataFim}
                                        selectsEnd
                                        startDate={this.state.dataInicio}
                                        endDate={this.state.dataFim}
                                        onChange={this.handleChangeDataFim}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="DD/MM/AAAA"
                                    />
                                </Form.Field>
                                {/*<Form.Field>
                                    <label>Data Início</label>
                                    <input required type='date' name='dataInicio' placeholder='Data Início' onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Data Fim</label>
                                    <input required type='date' name='dataFim' placeholder='Data Fim' onChange={this.handleChange} />
                                </Form.Field>*/}
                                <Button onClick={this.showAndHide}>Cancelar</Button><Button type='submit'>Cadastrar</Button>
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
                                                            return (this.state.stories[key].situacao === 'A fazer' ?
                                                                <Story
                                                                    key={key}
                                                                    id={key}
                                                                    idProj={this.props.match.params.id}
                                                                    descricao={this.state.stories[key].storiesDesc}
                                                                    titulo={this.state.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories[key].dataInicio}
                                                                    dataFim={this.state.stories[key].dataFim}
                                                                    situacao={this.state.stories[key].situacao}
                                                                    pontos={this.state.stories[key].storyPoint}
                                                                    atualizadoPor={this.state.stories[key].atualizadoPor}
                                                                    handleLoad={this.carregaStories}
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
                                                                <Story
                                                                    id={key}
                                                                    key={key}
                                                                    idProj={this.props.match.params.id}
                                                                    descricao={this.state.stories[key].storiesDesc}
                                                                    titulo={this.state.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories[key].dataInicio}
                                                                    dataFim={this.state.stories[key].dataFim}
                                                                    situacao={this.state.stories[key].situacao}
                                                                    pontos={this.state.stories[key].storyPoint}
                                                                    atualizadoPor={this.state.stories[key].atualizadoPor}
                                                                    handleLoad={this.carregaStories}
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
                                                                <Story
                                                                    key={key}
                                                                    id={key}
                                                                    idProj={this.props.match.params.id}
                                                                    descricao={this.state.stories[key].storiesDesc}
                                                                    titulo={this.state.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories[key].dataInicio}
                                                                    dataFim={this.state.stories[key].dataFim}
                                                                    situacao={this.state.stories[key].situacao}
                                                                    pontos={this.state.stories[key].storyPoint}
                                                                    atualizadoPor={this.state.stories[key].atualizadoPor}
                                                                    handleLoad={this.carregaStories}
                                                                /> : null)

                                                        })
                                            }

                                        </List.Item>
                                    }
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

export default Stories;
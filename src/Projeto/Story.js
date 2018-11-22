import React, { Component, Fragment } from 'react';
import { Segment, Header, Icon, ListItem, List, Button, Modal, Input, Form, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import isAfter from 'date-fns/isAfter';
import "react-datepicker/dist/react-datepicker.css";

import { db, auth } from '../config';

class Story extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //atributos novos para update
            tituloNovo: '',
            descricaoNovo: '',
            dataInicioNovo: new Date(),
            dataFimNovo: new Date(),
            progressoNovo: '',
            pontosNovo: '',
            atualizadoPorNovo: '',
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
            dataInicioNovo: new Date(`${this.props.dataInicio}`),
            dataFimNovo: new Date(`${this.props.dataFim}`),
            pontosNovo: this.props.pontos,
            situacao: this.props.situacao,
            atualizadoPorNovo: this.props.atualizadoPor,
        })
    }

    edit = () => {
        this.loadData();
        this.show();
    }

    hide = () => {
        this.setState({ modalOpenUpdate: false })
    }

    show = () => {
        this.setState({ modalOpenUpdate: true })
    }

    handleChangeNormal = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value,
        })
    }

    dataFormatada = (dataPraFormatar) => {
        console.log(dataPraFormatar)
        let date = new Date(`${dataPraFormatar}`);
        let dia = date.getDate();
        let mes = date.getMonth();
        mes += 1;
        let ano = date.getFullYear();
        console.log('data:', dia + '/' + mes + '/' + ano);
        return (<Fragment>{dia + '/' + mes + '/' + ano}</Fragment>)
    }

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.dataInicioNovo;
        endDate = endDate || this.state.dataFimNovo;

        if (isAfter(startDate, endDate)) {
            endDate = startDate;
        }

        this.setState({ dataInicioNovo: startDate, dataFimNovo: endDate });
    };

    handleChangeDataInicio = (startDate) => {
        this.handleChange({ startDate });
    }

    handleChangeDataFim = (endDate) => {
        this.handleChange({ endDate })
    };


    handleUpdate = event => {

        event.preventDefault();
        const itemId = this.props.id;
        const projId = this.props.idProj

        //const storyRef = db.ref(`/projetos/${projId}/stories/${itemId}`);

        const updateStory = {
            storiesTitulo: this.state.tituloNovo,
            storiesDesc: this.state.descricaoNovo,
            dataInicio: this.state.dataInicioNovo,
            dataFim: this.state.dataFimNovo,
            situacao: this.state.situacao,
            storyPoint: this.state.pontosNovo,
            atualizadoPor: auth.currentUser.displayName,
        }

        const usuario = db.ref().child('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);

        usuario.once('value', (snapshot) => {
            let usuarioObjeto = snapshot.val();
            let chaveUsuario = Object.keys(usuarioObjeto)[0];
            let updates = {};
            updates['projetos/' + projId + '/stories/' + itemId] = updateStory;
            updates['projetosDoUsuario/' + chaveUsuario + '/' + projId + '/stories/' + itemId] = updateStory;
            db.ref().update(updates);
        })

        this.setState({
            tituloNovo: '',
            descricaoNovo: '',
            dataInicioNovo: new Date(),
            datafimNovo: new Date(),
            situacao: 'A fazer',
            storyPointNovo: '',
            atualizadoPorNovo: '',
        });

        this.hide();
    }

    //Primeiro preciso codar os projetos pra receber os parametros certos pra exluir usando a ID do projeto
    removeItem(itemId, projId) {
        const usuario = db.ref().child('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);

        usuario.once('value', (snapshot) => {
            let usuarioObjeto = snapshot.val();
            let chaveUsuario = Object.keys(usuarioObjeto)[0];
            let removes = {};
            removes['projetos/' + projId + '/stories/' + itemId] = null;
            removes['projetosDoUsuario/' + chaveUsuario + '/' + projId + '/stories/' + itemId] = null;
            db.ref().update(removes);
        })

        this.props.handleLoad();
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
                                    <p>Data Inicio: {this.dataFormatada(this.props.dataInicio)}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Data Fim: {this.dataFormatada(this.props.dataFim)}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Progresso: {this.props.situacao}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Pontos: {this.props.pontos}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Atualizado por: {this.props.atualizadoPor}</p>
                                </ListItem>
                                <br />
                            </Header.Subheader>
                        </Header>
                        {/*<Link to='/configurarPlanningPoker'><Button icon='clipboard outline' size='mini' /></Link>*/}
                        <Button onClick={this.edit} size='mini' icon='edit outline' />
                        <Modal
                            size='small'
                            open={this.state.modalOpenUpdate}
                            dimmer='blurring'
                        >
                            <Header icon='edit outline' content='Atualizar Estória' />
                            <Modal.Content>
                                <Form onSubmit={this.handleUpdate}>
                                    <Form.Field>
                                        <label>Novo Título:</label>
                                        <Input required type='text' name='tituloNovo' value={this.state.tituloNovo} placeholder='Novo Título' onChange={this.handleChangeNormal} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nova Descrição:</label>
                                        <TextArea required type='text' name='descricaoNovo' value={this.state.descricaoNovo} rows='3' onChange={this.handleChangeNormal} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nova Data de Início Prevista:</label>
                                        <DatePicker
                                            selected={this.state.dataInicioNovo}
                                            selectsStart
                                            startDate={this.state.dataInicioNovo}
                                            endDate={this.state.dataFimNovo}
                                            onChange={this.handleChangeDataInicio}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="DD/MM/AAAA"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Novo Data Fim Prevista:</label>
                                        <DatePicker
                                            selected={this.state.dataFimNovo}
                                            selectsEnd
                                            startDate={this.state.dataFimNovo}
                                            endDate={this.state.dataFimNovo}
                                            onChange={this.handleChangeDataFim}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="DD/MM/AAAA"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Novo Progresso</label>
                                        <select value={this.state.situacao} name="situacao" onChange={this.handleChangeNormal}>
                                            <option value="A fazer">A Fazer</option>
                                            <option value="Fazendo">Fazendo</option>
                                            <option value="Concluida">Concluída</option>
                                        </select>
                                        {/*<Input type='text' name='progressoNovo' placeholder='Novo Status de Progresso' onChange={this.handleChange} />*/}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nova Pontuação</label>
                                        <Input required type='text' name='pontosNovo' value={this.state.pontosNovo} placeholder='Nova Pontuação' onChange={this.handleChangeNormal} />
                                    </Form.Field>

                                    <Button onClick={this.hide} color='red' inverted>
                                        <Icon name='remove' /> Fechar
                                        </Button>
                                    <Button type='submit' color='green' inverted >Atualizar</Button>
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

export default Story;
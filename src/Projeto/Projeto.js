import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Icon, List, Modal, Button, Input, Form, ListContent, Image } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import isAfter from 'date-fns/isAfter';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/pt-br';

import { db } from './../config';

class Projeto extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equipe: '',
            nomeProj: '',
            descricaoProj: '',
            dataInicioPrevista: new Date(),
            dataFimPrevista: new Date(),
            equipeProj: '',
            modalOpenRenomear: false,
            modalOpenExcluir: false,
            modalOpenFechar: false
        }

    }

    componentDidMount = () => {
        this.loadData()
    }

    loadData = () => {
        this.setState({
            nomeProj: this.props.titulo,
            descricaoProj: this.props.descricao,
            dataInicioPrevista: new Date(`${this.props.dataInicioPrevista}`),
            dataFimPrevista: new Date(`${this.props.dataFimPrevista}`),
            equipeProj: this.props.equipe
        })

    }

    edit = () => {
        this.loadData();
        this.handleOpenRenomear();
    }

    handleChange = event => {
        console.log(event)
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })

    }

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.dataInicioPrevista;
        endDate = endDate || this.state.dataFimPrevista;

        if (isAfter(startDate, endDate)) {
            endDate = startDate;
        }

        this.setState({ dataInicioPrevista: startDate, dataFimPrevista: endDate });
    };

    handleChangeDataInicio = (startDate) => {
        this.handleChange({ startDate });
    }

    handleChangeDataFim = (endDate) => {
        this.handleChange({ endDate })
    };

    dataFormatada = (dataPraFormatar) => {
        console.log(dataPraFormatar)
        let date = new Date(`${dataPraFormatar}`);
        let dia = date.getDate();
        let mes = date.getMonth();
        mes+=1;
        let ano = date.getFullYear();
        console.log('data:', dia + '/' + mes + '/' + ano);
        return (<p>{dia + '/' + mes + '/' + ano}</p>)
    }

    removeItem(idProj) {

        const projetoRef = db.ref().child('projetos').child(`${idProj}`);
        projetoRef.once('value', (snapshot) => {
            let projeto = snapshot.val();
            let updates = {};
            updates['projetos/' + idProj] = null;
            updates['usuariosNoProjeto/' + idProj] = null;
            Object.keys(projeto.equipeProj).map(key => {
                console.log('vai enviar!!!!')
                console.log('key: ', key);
                updates['projetosDoUsuario/' + key + '/' + idProj] = null;
                console.log('enviou!!!!');
                console.log('-------------------')
                return db.ref().update(updates);
            });
        })

        this.props.carregaProjetos();
    }

    renomearItem = (e) => {
        e.preventDefault();
        const idProj = this.props.id;

        const projetoRef = db.ref().child('projetos').child(`${idProj}`);
        projetoRef.once('value', (snapshot) => {
            let projeto = snapshot.val();
            let updates = {};
            updates['projetos/' + idProj + '/nome'] = this.state.nomeProj;
            updates['projetos/' + idProj + '/descricao'] = this.state.descricaoProj;
            updates['projetos/' + idProj + '/dataInicioPrevista'] = this.state.dataInicioPrevista;
            updates['projetos/' + idProj + '/dataFimPrevista'] = this.state.dataFimPrevista;

            Object.keys(projeto.equipeProj).map(key => {
                console.log('vai enviar!!!!')
                console.log('key: ', key);
                updates['projetosDoUsuario/' + key + '/' + idProj + '/nome'] = this.state.nomeProj;
                updates['projetosDoUsuario/' + key + '/' + idProj + '/descricao'] = this.state.descricaoProj;
                updates['projetosDoUsuario/' + key + '/' + idProj + '/dataInicioPrevista'] = this.state.dataInicioPrevista;
                updates['projetosDoUsuario/' + key + '/' + idProj + '/dataFimPrevista'] = this.state.dataFimPrevista;
                console.log('enviou!!!!');
                console.log('-------------------')
                return db.ref().update(updates);
            });

        });

        this.props.carregaProjetos();
    }

    handleOpenRenomear = () => this.setState({ modalOpenRenomear: true })

    handleCloseRenomear = () => this.setState({ modalOpenRenomear: false })

    handleOpenExcluir = () => { this.setState({ modalOpenExcluir: true }) }

    handleCloseExcluir = () => { this.setState({ modalOpenExcluir: false }) }

    handleOpenFechar = () => this.setState({ modalOpenFechar: true })

    handleCloseFechar = () => this.setState({ modalOpenFechar: false })

    render() {
        return (
            //this.state.equipe.includes(auth.currentUser.email) &&
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
                                size='small'
                                open={this.state.modalOpenFechar}
                                onClose={this.handleCloseFechar}
                            >
                                <Header icon='info circle' content={`SOBRE O PROJETO: ${this.props.titulo}`} />
                                <Modal.Content>

                                    <Header as='h3'>Título: {this.props.titulo}</Header>


                                    <Header as='h3'>Descrição: {this.props.descricao}</Header>


                                    <Header as='h3'>Data Início Prevista: {this.dataFormatada(this.props.dataInicioPrevista)}</Header>


                                    <Header as='h3'>Data Final Prevista: {this.dataFormatada(this.props.dataFimPrevista)}</Header>

                                    <h3>Equipe:</h3>
                                    <List>
                                        {
                                            this.props.equipe && Object.keys(this.props.equipe).map(key => {
                                                return (
                                                    <Fragment key={key}>
                                                        <List.Item>
                                                            <Image avatar src={this.props.equipe[key].foto} />
                                                            <ListContent>
                                                                <List.Header as='h3'>
                                                                    {this.props.equipe[key].nome}
                                                                </List.Header>
                                                            </ListContent>
                                                        </List.Item>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </List>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.handleCloseFechar} color='red' inverted>
                                        <Icon name='remove' /> Fechar
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Modal
                                trigger={<Button onClick={this.edit} size='mini'>Atualizar</Button>}
                                size='small'
                                open={this.state.modalOpenRenomear}
                                onClose={this.handleCloseRenomear}
                            >
                                <Header icon='edit outline' content='Atualizar Dados Básicos do Projeto' />
                                <Modal.Content>
                                    <Form onSubmit={this.renomearItem}>
                                        <Form.Field>
                                            <label>Novo Título:</label>
                                            <Input required type='text' name='nomeProj' placeholder='Novo Nome' value={this.state.nomeProj} onChange={this.handleChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Nova Descrição:</label>
                                            <Input required type='text' name='descricaoProj' placeholder='Nova Descrição' value={this.state.descricaoProj} onChange={this.handleChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Nova Data de Início Prevista:</label>
                                            <DatePicker
                                                selected={this.state.dataInicioPrevista}
                                                selectsStart
                                                startDate={this.state.dataInicioPrevista}
                                                endDate={this.state.dataFimPrevista}
                                                onChange={this.handleChangeDataInicio}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="DD/MM/AAAA"
                                                todayButton={"Vandaag"}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Novo Data Fim Prevista:</label>
                                            <DatePicker
                                                todayButton={"Vandaag"}
                                                selected={this.state.dataFimPrevista}
                                                selectsEnd
                                                startDate={this.state.dataFimPrevista}
                                                endDate={this.state.dataFimPrevista}
                                                onChange={this.handleChangeDataFim}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="DD/MM/AAAA"
                                            />
                                        </Form.Field>
                                        {/*<Input required type='text' name='dataFimPrevista' value={this.state.dataFimPrevista} onChange={this.handleChange} />*/}
                                        <Button onClick={this.handleCloseRenomear} color='red' inverted>
                                            <Icon name='remove' /> Fechar
                                        </Button>
                                        <Button type='submit' color='green' inverted >Atualizar</Button>
                                    </Form>
                                </Modal.Content>
                            </Modal>
                        </List.Item>
                        <List.Item>
                            <Link to={`/burndown/${this.props.titulo}/${this.props.id}`}><Button size='mini'>Burndown</Button></Link>
                        </List.Item>
                        <List.Item>
                            <Modal
                                trigger={<Button onClick={this.handleOpenExcluir} size='mini'>Excluir</Button>}
                                size='small'
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
                                    <Button onClick={this.handleCloseExcluir} color='red' inverted>
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
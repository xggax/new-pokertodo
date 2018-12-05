import React, { Component, Fragment } from 'react';
import { Grid, Container, Header, Segment, Button, Icon, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import isAfter from 'date-fns/isAfter';
import "react-datepicker/dist/react-datepicker.css";

import Projeto from './Projeto';
import HeaderCustom from './HeaderCustom';
import { db, auth } from './../config';


class ProjetosLista extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usuario: {},
            chaveUsuario: '',
            username: '',
            projetos: {},
            equipe: {},
            tituloNovo: '',
            descricaoNovo: '',
            dataInicioNovo: new Date(),
            dataFimNovo: new Date(),
            estaCarregando: false,
            open: false,
            estaLogado: false
        }

    }

    componentDidMount = () => {

        console.log('entrou aqui')
        auth.onAuthStateChanged((usuario) => {
            if (usuario) {
                //console.log('entrou aqui e logou');
                this.setState({
                    usuario,
                    estaLogado: true,
                })
            } else {
                //console.log('nao logou');
                this.setState({
                    estaLogado: false,
                })
            }
        })
        
        this.carregaProjetos();
    }

    handleChangeNormal = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })

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

    //Criando novo projeto
    handleSubmit = event => {
        //bloquear o carregamento da página:
        event.preventDefault();

        // referencia para projetos
        const projetosRef = db.ref(`projetos`);

        // criando uma id única para colocar no projeto;
        let idFirstSearch = Date.now();
        // Dados que seão submetidos ao banco
        const projeto = {
            id: idFirstSearch.toString(),
            nome: this.state.tituloNovo,
            descricao: this.state.descricaoNovo,
            dataInicioPrevista: this.state.dataInicioNovo,
            dataFimPrevista: this.state.dataFimNovo,
            scrumMasterProj: auth.currentUser.email,
        }

        //Enviando dados ao banco
        projetosRef.push(projeto);

        //variável pra armazenar o chave do projeto
        let chaveProj;

        //Query que busca o projeto recem cadastrado pela id que foi gerada pra ele
        const queryProjetoCadastrado = db.ref('projetos').orderByChild('id').equalTo(`${projeto.id}`);

        //Query que busca nos usuários quem cadastrou o projeto, que é quem será o Scrum Master
        const queryMe = db.ref('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);

        //Cadastrar-me na minha equipe nova em projetos, gerando uma chave pra minha equipe.
        queryProjetoCadastrado.once('value', (snapshot) => {

            // Pegou meu objeto projeto recém cadastrado e retornou.
            let projetoCadastrado = snapshot.val();

            //Pegando a chave do JSON do projeto
            chaveProj = Object.keys(projetoCadastrado)[0];

            queryMe.once('value', (snapshot) => {
                let me = snapshot.val();

                // Pegando a chave do meu JSON de usuário
                const chaveMe = Object.keys(me);

                // Passando meus dados dentro de um objeto:
                me[chaveMe].scrumMasterProj = projeto.scrumMasterProj;
                // Update pra poder cadastrar o usuário com a mesma chave que ele possui lá em usuários
                let updates = {};

                updates['projetos/' + chaveProj + '/dataInicioPrevista/'] = this.state.dataInicioNovo;
                updates['projetos/' + chaveProj + '/dataFimPrevista/'] = this.state.dataFimNovo;
                updates['projetos/' + chaveProj + '/equipeProj/' + chaveMe] = me[chaveMe];
                updates['usuariosNoProjeto/' + chaveProj + '/' + chaveMe] = me[chaveMe];
                projeto.equipeProj = me;
                updates['projetosDoUsuario/' + chaveMe + '/' + chaveProj] = projeto;
                db.ref().update(updates);
            })

        })

        this.setState({
            tituloNovo: '',
            descricaoNovo: '',
            //dataInicioNovo: new Date(),
            //dataFimNovo: new Date(),
        });

        this.hide();
        this.carregaProjetos();

    }

    carregaProjetos = () => {

        this.setState({
            projetos: {},
            estaCarregando: true,
        })

        this.getCurrentUserAndProjects();

    }

    getCurrentUserAndProjects = () => {
        let usuarioAtual = setInterval(() => {
            if (auth.currentUser !== null) {
                clearInterval(usuarioAtual);
                const usuarioLogado = {
                    email: auth.currentUser.email,
                    uid: auth.currentUser.uid,
                    nome: auth.currentUser.displayName,
                    foto: auth.currentUser.photoURL
                }

                const usuario = db.ref().child('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);

                usuario.once('value', (snapshot) => {
                    let usuarioObjeto = snapshot.val();
                    let chaveUsuario = Object.keys(usuarioObjeto)[0];
                    const projetosUsuarioRef = db.ref(`projetosDoUsuario/${chaveUsuario}`).orderByKey();
                    // Observador ligado, se der problema trocar pra ONCE e vice versa
                    projetosUsuarioRef.on('value', (snapshot) => {
                        let projetosUsuario = snapshot.val();
                        //console.log(projetosUsuario);

                        this.setState({
                            usuario: usuarioLogado,
                            estaLogado: true,
                            projetos: projetosUsuario,
                            estaCarregando: false,
                            chaveUsuario: chaveUsuario
                        });


                    })
                })
                //console.log(auth.currentUser)
                return auth.currentUser;
            } else {
                console.log('Recebendo os dados ainda...');
            }
        }, 400);

    }

    hide = () => {
        this.setState({ open: false })
    }

    show = () => {
        this.setState({ open: true })
    }


    render() {
        
        return (
            <Fragment>
                <HeaderCustom />
                {
                    this.state.estaCarregando ?
                        (
                            <p><Icon loading name='spinner' /> Carregando seus projetos... :D</p>
                        )
                        :
                        (
                            <Container>
                                <Segment piled>
                                    {/*JSON.stringify(this.props)*/}
                                    <Header as='h2'>Lista de Projetos</Header>
                                </Segment>
                                <Header as='h3'>Acesse seus projetos</Header>
                                <Button onClick={this.show} floated='left' color='teal'>
                                    <Icon name='plus' /> Novo Projeto
                                </Button>
                                <Modal open={this.state.open}>
                                    <Modal.Header color='teal'>Cadastrar Novo Projeto</Modal.Header>
                                    <Modal.Content>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Field>
                                                <label>Título:</label>
                                                <Input required type='text' name='tituloNovo' value={this.state.tituloNovo} placeholder='Título' onChange={this.handleChangeNormal} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Descrição:</label>
                                                <TextArea required type='text' name='descricaoNovo' value={this.state.descricaoNovo} placeholder='Descrição' rows='3' onChange={this.handleChangeNormal} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Data de Início Prevista:</label>
                                                <DatePicker
                                                    selected={this.state.dataInicioNovo}
                                                    selectsStart
                                                    startDate={this.state.dataInicioNovo}
                                                    endDate={this.state.dataFimNovo}
                                                    onChange={this.handleChangeDataInicio}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="DD/MM/AAAA"
                                                />
                                                {JSON.stringify(this.state.dataInicioNovo)}
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Data Fim Prevista:</label>
                                                <DatePicker
                                                    selected={this.state.dataFimNovo}
                                                    selectsEnd
                                                    startDate={this.state.dataInicioNovo}
                                                    endDate={this.state.dataFimNovo}
                                                    onChange={this.handleChangeDataFim}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="DD/MM/AAAA"
                                                />
                                                {JSON.stringify(this.state.dataFimNovo)}
                                            </Form.Field>
                                            <Button onClick={this.hide}>Cancelar</Button>
                                            <Button type='submit'>Cadastrar</Button>
                                        </Form>
                                    </Modal.Content>
                                </Modal>
                                <br /><br /><br />
                                <Grid columns={4} stackable>
                                    { // Renderizar só quando projetos e usuários estiverem não nulos

                                        this.state.projetos && this.state.usuario && Object.keys(this.state.projetos)
                                            .map(key => {
                                                return <Projeto
                                                    key={key}
                                                    id={key}
                                                    titulo={this.state.projetos[key].nome}
                                                    descricao={this.state.projetos[key].descricao}
                                                    dataInicioPrevista={this.state.projetos[key].dataInicioPrevista }
                                                    dataFimPrevista={this.state.projetos[key].dataFimPrevista}
                                                    equipe={(this.state.projetos[key].equipeProj)}
                                                    carregaProjetos={this.carregaProjetos}
                                                    chaveUsuario={this.state.chaveUsuario}
                                                    atualizadoPor={this.state.projetos[key].atualizadoPor}
                                                />
                                            }

                                            )
                                    }
                                </Grid>
                            </Container>
                        )
                }
            </Fragment>
        );
    }
}

export default ProjetosLista;
import React, { Component } from 'react'

import { db } from './../config';
import { Input, Button, Header, List, Modal, Icon, Form, ListItem } from 'semantic-ui-react';
import Participante from './Participante';

class Participantes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAndClose: false,
            emailMember: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const idProj = this.props.idProj;

        let novoMembro = {
            email: this.state.emailMember,
        }

        // Raiz da equipe do projeto
        //const equipeRef = db.ref(`projetos/${this.props.idProj}/equipeProj/`);

        //query buscando email do membro na equipe para retornar o objeto
        const queryBuscaNaEquipe = db.ref(`projetos/${this.props.idProj}/equipeProj/`).orderByChild('email').equalTo(`${novoMembro.email}`);

        // query buscando o email do novo membro nos usuários do sistema 
        const queryBuscaNosUsuarios = db.ref(`usuarios`).orderByChild('email').equalTo(`${novoMembro.email}`);

        queryBuscaNosUsuarios.once('value', (snapshot) => {
            const usuarioBuscado = snapshot.val();
            //console.log('usuarioBuscado: ', usuarioBuscado);
            //const chaveUsuarioBuscado = Object.keys(usuarioBuscado)[0];
            //console.log('usuarioBuscado[chave]: ', usuarioBuscado[chaveUser]);
            if (usuarioBuscado) {

                queryBuscaNaEquipe.once('value', (snapshot) => {
                    const estouNaEquipe = snapshot.val();
                    console.log('estouNaEquipe? ', estouNaEquipe);
                    if (estouNaEquipe) {
                        console.log('Já tá na equipe! ');
                    } else {
                        const chaveUsuarioBuscado = Object.keys(usuarioBuscado)[0];
                        //console.log('chave do usuario buscado', chaveUsuarioBuscado);

                        const projetoRef = db.ref(`projetos/${idProj}`).orderByKey();
                        projetoRef.once('value', (snapshot) => {
                            let projeto = snapshot.val();
                            //console.log('chave do projeto cadastrado no usuario:', snapshot.key);
                            //console.log('projeto cadastrado no usuario:', snapshot.val());
                            let updates1 = {};
                            let updates2 = {};

                            // inserir usuario na equipe da tabela proejetos
                            updates1['projetos/' + idProj + '/equipeProj/' + chaveUsuarioBuscado] = usuarioBuscado[chaveUsuarioBuscado];
                            //inserir usuario na tabela de usuários em um projeto
                            //updates1[idProj + '/' + chaveUsuarioBuscado] = usuarioBuscado[chaveUsuarioBuscado];

                            updates1['usuariosNoProjeto/' + idProj + '/' + chaveUsuarioBuscado] = usuarioBuscado[chaveUsuarioBuscado];

                            db.ref().update(updates1);


                            console.log('Equipe do Projeto:', projeto.equipeProj);

                            projeto.equipeProj[chaveUsuarioBuscado] = usuarioBuscado[chaveUsuarioBuscado];

                            console.log('Equipe do Projeto com novo usuario:', projeto.equipeProj);

                            Object.keys(projeto.equipeProj).map(key => {
                                //const usuariosDoProjeto = db.ref().child('projetosDoUsario').child(`${key}`);
                                //console.log('vai enviar!!!!')
                                //console.log('key: ', key);
                                updates2['projetosDoUsuario/' + key + '/' + idProj] = projeto;
                                //console.log('enviou!!!!');
                                //console.log('-------------------')
                                return db.ref().update(updates2);
                            })

                        })
                    }
                })
            } else {
                console.log("Usuário não está cadastrado no sistema!");
            }
        })

        this.props.carregaStories(this.props.idProj);
        this.showAndHide();

    }

    handleChange = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })

    }

    showAndHide = () => {
        this.setState(prevState => ({
            openAndClose: !prevState.openAndClose
        }));
    }

    render() {
        return (
            <List horizontal>
                {/*
                    this.props.scrumMasterProj === this.props.usuarioEmail ? 
                    <Button title='Trocar Papel' onClick={this.showAndHide} floated='left' size='mini' color='teal'>
                        <Icon name='user plus' floated='left' />
                    </Button>: null
                */}
                <Button title='Adicionar Membro' onClick={this.showAndHide} floated='left' size='mini' color='teal'>
                    <Icon name='user plus' floated='left' />
                </Button>
                <ListItem>
                    <Modal
                        dimmer='blurring'
                        open={this.state.openAndClose}>
                        <Modal.Header color='teal'><Icon name='user plus' floated='left' /> Adicionar Membro</Modal.Header>
                        <Modal.Content>
                            <Header as='h3'>Atenção: O membro a ser adicionado ao projeto precisa, alguma vez, já ter autenticado-se nesse sistema!
                            </Header>
                        </Modal.Content>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label><Icon name='mail' floated='left' /> Digite o E-mail:</label>
                                    <Input type='email' name='emailMember' placeholder='E-mail' onChange={this.handleChange} />
                                </Form.Field>
                                <Button onClick={this.showAndHide} color='red' inverted>Cancelar</Button>
                                <Button color='green' inverted type='submit'>Adicionar</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                </ListItem>
                <List.Item>
                    <Header as='h3' color='teal'>Equipe: </Header>
                </List.Item>
                <List.Item>
                    {
                        this.props.equipeProj && Object.keys(this.props.equipeProj)
                            .map(key => {
                                //console.log(this.props.equipe[key].isScrumMaster);
                                return <Participante
                                    idProj={this.props.idProj}
                                    key={key}
                                    idUsuario={key}
                                    nome={this.props.equipeProj[key].nome}
                                    foto={this.props.equipeProj[key].foto}
                                    email={this.props.equipeProj[key].email}
                                    scrumMasterProj={this.props.equipeProj[key].scrumMasterProj}
                                    equipeProj={this.props.equipeProj}
                                    carregaStories={this.props.carregaStories}
                                />
                            }

                            )
                    }
                </List.Item>
            </List>
        )
    }
}

export default Participantes;
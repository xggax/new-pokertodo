import React, { Component } from 'react';
import { Grid, Container, Header, Segment, Button, Icon, Modal, Form } from 'semantic-ui-react';

import Projeto from './Projeto';
import HeaderCustom from './HeaderCustom';
import config, { auth, providers, db } from './../config';


class ProjetosLista extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projetos: {},
            tituloNovo: '',
            descricaoNovo: '',
            projetoStories: {},
            estaCarregando: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //this.syncBegin();
        this.carregaProjetos()
    }

    carregaProjetos() {
        //console.log('projeto: ', proj);
        this.setState({
            projetos: {},
            estaCarregando: true,
        })

        const projetosRef = db.ref('projetos/');
        projetosRef.on('value', (snapshot) => {
            let projetos = snapshot.val();

            console.log('projetos: ', projetos);

            this.setState({
                projetos: projetos,
                estaCarregando: false,
            });
        });

    }

    /*
    syncBegin() {
        config.syncState(
            'projetos', {
                context: this,
                state: 'projetos',
                asArray: false
            })
    }
    */

    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            projetoStories: {},
        })

    }

    handleSubmit = event => {
        event.preventDefault();
        const projetosRef = db.ref(`projetos`);
        const projeto = {
            nome: this.state.tituloNovo,
            descricao: this.state.descricaoNovo,
            stories: this.state.projetoStories

        }

        projetosRef.push(projeto);

        this.setState({
            projetoTitulo: '',
            projetoDescricao: '',
        });

        this.carregaProjetos();
    }


    render() {
        return (
            <div>
                <HeaderCustom />
                <Container>
                    <Segment piled>
                        <Header as='h2'>Lista de Projetos</Header>
                    </Segment>
                    <Header as='h3'>Selecione o projeto</Header>
                    <Modal trigger={
                        <Button floated='left'
                            color='teal'
                        >
                            <Icon name='plus' /> Novo Projeto</Button>}>
                        <Modal.Header color='teal'>Cadastrar Novo Projeto</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Título</label>
                                    <input type='text' name='tituloNovo' placeholder='Título' onChange={this.handleChange} />
                                    {this.state.tituloNovo}
                                </Form.Field>
                                <Form.Field>
                                    <label>Descrição</label>
                                    <textarea type='text' name='descricaoNovo' rows='3' onChange={this.handleChange} />
                                    {this.state.descricaoNovo}
                                </Form.Field>
                                <Button>Cancelar</Button><Button type='submit'>Cadastrar</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                    <br /><br /><br />
                    <Grid columns={5} stackable>
                        {
                            Object.keys(this.state.projetos)
                                .map(key => {
                                    return <Projeto key={key}
                                        id={key}
                                        titulo={this.state.projetos[key].nome}
                                        descricao={this.state.projetos[key].descricao}
                                    />
                                }

                                )
                        }
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ProjetosLista;
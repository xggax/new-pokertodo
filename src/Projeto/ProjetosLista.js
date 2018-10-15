import React, { Component } from 'react';
import { Grid, Container, Header, Segment, Button, Icon, Modal, Form } from 'semantic-ui-react';

import Projeto from './Projeto';
import HeaderCustom from './HeaderCustom';
import config from './../config';


class ProjetosLista extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projetos: {},
            titulo: '',
            descricao: '',
            situacao: '',
            storiesPoint: ''

        }

        config.syncState(
            'projetos', {
                context: this,
                state: 'projetos',
                asArray: false
            })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
    }

    handleSubmit = event => {
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
                                    <input type='text' name='titulo' placeholder='Título' onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Descrição</label>
                                    <textarea type='text' name='descricao' rows='3' onChange={this.handleChange} />
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
                                    return <Projeto key={key} titulo={this.state.projetos[key].nome} descricao={this.state.projetos[key].descricao} id={key} />
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
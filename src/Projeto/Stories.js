import React, { Component } from 'react';
import axios from 'axios';

import HeaderCustom from './HeaderCustom';
import { Container, Segment, Grid, Image, Header, List, Divider, Icon, Dimmer, Loader } from 'semantic-ui-react'

class Stories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stories: {},
            estaCarregando: false
        }
    }

    componentDidMount() {
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
                const chave = Object.keys(dados.data)[0];
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
        if (this.state.estaCarregando) {
            return <p>Carregando...</p>
        }
        return (

            <div>
                <HeaderCustom />
                {/*<h2>{JSON.stringify(this.props)}</h2>*/}
                <Container>
                    <Header as='h2' dividing>Kanban</Header>
                    <Header as='h3' >
                        {this.props.match.params.nome}
                        <Header.Subheader>{this.state.stories.descricao}</Header.Subheader>
                    </Header>
                    <br/>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Header as='h3'>A Fazer</Header>
                                <List>
                                    <List.Item>Apples</List.Item>
                                    <List.Item>Pears</List.Item>
                                    <List.Item>Oranges</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header as='h3'>Fazendo</Header>
                                <List>
                                    <List.Item>Apples</List.Item>
                                    <List.Item>Pears</List.Item>
                                    <List.Item>Oranges</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Header as='h3'>Concluída</Header>
                                <List>
                                    <List.Item>Apples</List.Item>
                                    <List.Item>Pears</List.Item>
                                    <List.Item>Oranges</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default Stories;
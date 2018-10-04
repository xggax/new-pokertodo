import React, { Component } from 'react';
import axios from 'axios';

import HeaderCustom from './HeaderCustom';
import { Container, Segment, Grid, Image, Header, List, Divider, Icon, Dimmer, Loader } from 'semantic-ui-react'
import Storie from './Storie';

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

    renderStories(storie, id) {


        return (
            <span key={id}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Header as='h3'>A Fazer</Header>
                            <List>
                                {
                                    storie.situacao === 'A fazer' &&
                                    <List.Item>

                                        {storie.storiesTitulo}

                                    </List.Item>
                                }
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3'>Fazendo</Header>
                            <List>
                                {
                                    storie.situacao === 'Fazendo' &&
                                    <List.Item>

                                        {storie.storiesTitulo}

                                    </List.Item>
                                }
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3'>Concluída</Header>
                            <List>
                                {
                                    storie.situacao === 'Concluida' &&
                                    <List.Item>

                                        {storie.storiesTitulo}

                                    </List.Item>
                                }
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </span>
        )

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
                    <Segment piled>
                    <Header as='h2'>Kanban</Header>
                    </Segment>
                    <Header as='h3' >
                        {this.props.match.params.nome}
                        <Header.Subheader>{this.state.stories.descricao}</Header.Subheader>
                    </Header>
                    <br />

                    {
                        this.state.stories.stories && Object.keys(this.state.stories.stories)
                            .map(
                                key => {
                                    console.log('key:', key);
                                    console.log('storie: ', this.state.stories.stories[key]);
                                    //return this.state.stories.stories[key], key);
                                    return <Storie id={key}
                                        descricao={this.state.stories.stories[key].storiesDesc}
                                        titulo={this.state.stories.stories[key].storiesTitulo}
                                        dataInicio={this.state.stories.stories[key].dataInicio}
                                        dataFim={this.state.stories.stories[key].dataFim}
                                        situacao={this.state.stories.stories[key].situacao}
                                        pontos={this.state.stories.stories[key].storiesPoint}
                                    />
                                }
                            )
                    }

                </Container>
            </div>
        )
    }
}

export default Stories;
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
            estaCarregando: false,
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
                    <Segment piled>
                        <Header as='h2'>Kanban</Header>
                    </Segment>
                    <Header as='h2' >
                        {this.props.match.params.nome}
                        <Header.Subheader>{this.state.stories.descricao}</Header.Subheader>
                    </Header>

                    <br />

                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={5} >
                                <List>
                                    {

                                        <List.Item>

                                            <Header as='h2' dividing>A Fazer</Header>
                                            <br/>
                                            {
                                                this.state.stories.stories && Object.keys(this.state.stories.stories)
                                                    .map(
                                                        key => {
                                                            // isMember ? "$2.00" : "$10.00"
                                                            return this.state.stories.stories[key].situacao === 'A fazer' ?
                                                                <Storie id={key}
                                                                    descricao={this.state.stories.stories[key].storiesDesc}
                                                                    titulo={this.state.stories.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories.stories[key].dataInicio}
                                                                    dataFim={this.state.stories.stories[key].dataFim}
                                                                    situacao={this.state.stories.stories[key].situacao}
                                                                    pontos={this.state.stories.stories[key].storiesPoint}
                                                                /> : null

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
                                            <br/>
                                            {
                                                this.state.stories.stories && Object.keys(this.state.stories.stories)
                                                    .map(
                                                        key => {
                                                            // isMember ? "$2.00" : "$10.00"
                                                            return this.state.stories.stories[key].situacao === 'Fazendo' ?
                                                                <Storie id={key}
                                                                    descricao={this.state.stories.stories[key].storiesDesc}
                                                                    titulo={this.state.stories.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories.stories[key].dataInicio}
                                                                    dataFim={this.state.stories.stories[key].dataFim}
                                                                    situacao={this.state.stories.stories[key].situacao}
                                                                    pontos={this.state.stories.stories[key].storiesPoint}
                                                                /> : null

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
                                            <br/>
                                            {
                                                this.state.stories.stories && Object.keys(this.state.stories.stories)
                                                    .map(
                                                        key => {
                                                            // isMember ? "$2.00" : "$10.00"
                                                            return this.state.stories.stories[key].situacao === 'Concluida' ?
                                                                <Storie id={key}
                                                                    descricao={this.state.stories.stories[key].storiesDesc}
                                                                    titulo={this.state.stories.stories[key].storiesTitulo}
                                                                    dataInicio={this.state.stories.stories[key].dataInicio}
                                                                    dataFim={this.state.stories.stories[key].dataFim}
                                                                    situacao={this.state.stories.stories[key].situacao}
                                                                    pontos={this.state.stories.stories[key].storiesPoint}
                                                                /> : null

                                                        })
                                            }

                                        </List.Item>
                                    }
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
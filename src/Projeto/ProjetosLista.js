import React, { Component } from 'react';
import { Grid, Container, Header, Segment, Button, Icon } from 'semantic-ui-react';

import Projeto from './Projeto';
import HeaderCustom from './HeaderCustom';
import config from './../config';


class ProjetosLista extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projetos: {}
        }

        config.syncState(
            'projetos', {
                context: this,
                state: 'projetos',
                asArray: false
            })
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
                    <Grid columns={5} stackable>
                        {
                            Object.keys(this.state.projetos)
                                .map(key => {
                                    return <Projeto key={key} titulo={this.state.projetos[key].nome} descricao={this.state.projetos[key].descricao} id={key}/>
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
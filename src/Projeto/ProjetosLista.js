import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';

import Projeto from './Projeto';
import HeaderCustom from './HeaderCustom';


class ProjetosLista extends Component {
    render() {
        return (
            <div>
                <HeaderCustom />
                <Container>
                    <h2>Lista de Projetos</h2>
                    <p>Selecione o projeto</p>

                    <Grid columns={5} stackable>
                        <Projeto titulo='Projeto 1' icone='futbol outline' />
                        <Projeto titulo='Projeto 2' icone='trophy' />
                        <Projeto titulo='Projeto 3' icone='music' />
                        <Projeto titulo='Projeto 4' icone='globe' />
                        <Projeto titulo='Projeto 5' icone='paw' />
                        <Projeto titulo='Projeto 6' icone='puzzle piece' />
                        <Projeto titulo='Projeto 7' icone='user md' />
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ProjetosLista;
import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import config, { auth, providers } from './../config';
import { Redirect } from 'react-router-dom';

import Navegacao from './Navegacao';
import HeaderCustom from '../Projeto/HeaderCustom';

class Inicio extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            estaLogado: false
        }

        auth.onAuthStateChanged((usuario) => {
            if (usuario) {
                console.log(usuario);
                this.setState({
                    usuario:usuario,
                    estaLogado: true,
                })
            } else {
                console.log('nao logou');
                this.setState({
                    estaLogado: false,
                })
            }
        })
    }

    /*componentDidMount() {
        this.persistindo();
    }

    persistindo() {
        auth.onAuthStateChanged((usuario) => {
            if (usuario) {
                console.log(usuario);
                this.setState({
                    usuario,
                    estaLogado: true,
                })
            } else {
                console.log('nao logou');
                this.setState({
                    estaLogado: false,
                })
            }
        })
    }
    */

    render() {
        return (
            <div>
                {
                    !this.state.estaLogado
                        ?
                        (
                            <div>
                                <Navegacao />
                                <Container>
                                    <Segment piled>
                                        <Header as='h2'>Inicio</Header>
                                        <p>Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix</p>
                                    </Segment>
                                </Container>
                            </div>
                        )
                        :
                        (<div>
                            <HeaderCustom />
                            <Container>
                                <div>
                                    <h3>{this.state.usuario.displayName}</h3>
                                    <img alt="foto do perfil" width="100" height="100" src={this.state.usuario.photoURL} />
                                </div>
                            </Container>
                        </div>
                        )
                }

            </div>
        );
    }

}

export default Inicio;
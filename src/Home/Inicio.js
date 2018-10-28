import React, { Component, Fragment } from 'react';
import { Container, Header, Segment, Button, Form, Grid, Icon, Image, List, Item } from 'semantic-ui-react';
import { auth, providers, db } from './../config';

import Navegacao from './Navegacao';
import HeaderCustom from '../Projeto/HeaderCustom';

class Inicio extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            estaLogado: false,
            isLoading: false
        }

    }

    autenticarGoogle = (provider) => {
        // console.log(provider);
        auth.signInWithPopup(providers[provider]).then(function (result) {
            // The firebase.User instance:
            var usuarioAtual = result.user;
            let usuarioNovo = {};
            if (result.additionalUserInfo.isNewUser) {
                const usuariosRef = db.ref().child(`usuarios`);
                usuarioNovo = {
                    uid: usuarioAtual.uid,
                    nome: usuarioAtual.displayName,
                    email: usuarioAtual.email,
                    foto: usuarioAtual.photoURL
                }
                usuariosRef.push(usuarioNovo);
                console.log('cadastrou!');
            }else{
                console.log('já é cadastrado!')
            }
        var credential = result.credential;
    }, function(error) {
        // The provider's account email, can be used in case of
        // auth/account-exists-with-different-credential to fetch the providers
        // linked to the email:
        var email = error.email;
        // The provider's credential:
        var credential = error.credential;
        // In case of auth/account-exists-with-different-credential error,
        // you can fetch the providers using this:
        if (error.code === 'auth/account-exists-with-different-credential') {
            auth.fetchProvidersForEmail(email).then(function (providers) {
                // The returned 'providers' is a list of the available providers
                // linked to the email address. Please refer to the guide for a more
                // complete explanation on how to recover from this error.
            });
        }
    });

}

componentDidMount() {
    this.persistindo();
}

persistindo = () => {
    //this.setState({isLoading: true});
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
    //this.setState({isLoading: false});
}

render() {
    if (this.state.estaCarregando) {
        return <p><Icon loading name='spinner' /> Carregando...</p>
    }
    return (
        <Fragment>
            {
                !this.state.estaLogado
                    ?
                    (
                        <div className='login-form'>
                            <Navegacao />
                            {/*
                    Heads up! The styles below are necessary for the correct render of this example.
                    You can do same with CSS, the main idea is that all the elements up to the `Grid`
                    below must have a height of 100%.
                    */}
                            <style>{`
                            body > div,
                            body > div > div,
                            body > div > div > div.login-form {
                                height: 100%;
                            }
                            `}
                            </style>

                            <Grid textAlign='center' style={{ height: '75%' }} verticalAlign='middle'>
                                <Grid.Column style={{ maxWidth: 450 }}>
                                    <Header as='h2' color='teal' textAlign='center'>
                                        Faça Login na sua conta
                            </Header>
                                    <Form size='large'>
                                        <Segment stacked>
                                            <Button color='google plus' fluid size='large' onClick={() => this.autenticarGoogle('google')}>
                                                Login com o google
                        </Button>

                                        </Segment>
                                    </Form>
                                </Grid.Column>
                            </Grid>
                        </div>
                    )
                    :
                    (
                        <div>
                            <HeaderCustom />
                            <Container>
                                <br /><br /><br /><br />
                                <Grid centered columns={4}>
                                    <Grid.Column>
                                        <List>
                                            <Image centered size='tiny' circular src={this.state.usuario.photoURL} />
                                            <br />
                                            <List.Item>
                                                <List.Icon name='user' />
                                                <List.Content>{this.state.usuario.displayName}</List.Content>
                                            </List.Item>
                                            <List.Item >
                                                <List.Icon name='envelope' />
                                                <List.Content >{this.state.usuario.email}</List.Content>
                                            </List.Item>
                                        </List>

                                    </Grid.Column>
                                </Grid>
                            </Container>

                        </div>
                    )
            }

        </Fragment>
    );
}

}

export default Inicio;
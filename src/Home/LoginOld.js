import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

import { auth, providers, db } from './../config';
import HeaderCustom from '../Projeto/HeaderCustom';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            estaLogado: false,
            estaCarregando: false
        }

    }

    componentDidMount() {
        auth.onAuthStateChanged((usuario) => {
            if (usuario) {
                this.isRegistered();
                this.setState({
                    usuario,
                    estaLogado: true,
                })
            } else {
                this.setState({
                    estaLogado: false,
                })
            }
        })


    }
    
    isRegistered = () => {
        console.log('verificação de registro!')
        const usuariosRef = db.ref().child(`usuarios`);
        usuariosRef.on('value', (snapshot) => {
            let usuarioNovo = {};
            let usuarios = snapshot.val();
            console.log('usuario novo: ', usuarios);
            
            for (let key in usuarios){
                if(usuarios === null || usuarios === undefined || usuarios[key].uid !== auth.currentUser.uid){
                    usuarioNovo = {
                        uid: auth.currentUser.uid,
                        nome: auth.currentUser.displayName,
                        email: auth.currentUser.email,
                        foto: auth.currentUser.photoURL
                    }
                }
            }

            usuariosRef.push(usuarioNovo);

        })

    }



    autenticarGoogle = (provider) => {
        // console.log(provider);
        const result = auth.signInWithPopup(providers[provider]);
        console.log('result: ', result.user.displayName);

    }


    render() {
        if (this.state.estaLogado) {
            return <Redirect to='/' />
        } else {
            return (
                <div className='login-form'>
                    <HeaderCustom />
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
                                    {/*<Form.Input fluid icon='user' iconPosition='left' placeholder='Endereço de E-mail' />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Senha'
                                        type='password'
                                    />

                                    <Button color='teal' fluid size='large'>
                                        Login
                        </Button>

                                    <Divider />
                                    ou
                        <Divider /> */}

                                    <Button color='google plus' fluid size='large' onClick={() => this.autenticarGoogle('google')}>
                                        Login com o google
                        </Button>

                                </Segment>
                            </Form>
                            {/*}
                            <Message>
                                Novo? <Link to='/registrar'>Cadastre-se</Link>
                            </Message>
                            <Message>
                                Esqueceu sua senha? <Link to='/recuperar'>Recuperar</Link>
                    </Message>*/}
                        </Grid.Column>
                    </Grid>
                </div>
            )
        }
    }
}

export default Login;
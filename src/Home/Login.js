import React, { Component } from 'react';
import { Divider, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom';

import config, { auth, providers } from './../config';
import HeaderCustom from '../Projeto/HeaderCustom';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            estaLogado: false
        }  

    }

    componentDidMount(){
        auth.onAuthStateChanged((usuario) => {
            if (usuario) {
               // console.log(usuario);
                this.setState({
                    usuario,
                    estaLogado: true,
                })
            } else {
              //  console.log('nao logado');
                this.setState({
                    estaLogado: false,
                })
            }
        })
    }


    autenticarGoogle(provider) {
       // console.log(provider);
        auth.signInWithPopup(providers[provider]);

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
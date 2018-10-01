import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

//import Navegacao from './Navegacao';
import HeaderCustom from '../Projeto/HeaderCustom';

const Registrar = props => {
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
    `}</style>

        <Grid textAlign='center' style={{ height: '75%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Cadastro Poker To Do
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Endereço de E-mail' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Senha'
                            type='password'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirmar Senha'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Cadastrar
                        </Button>

                        {/*}

                        <Divider />
                        ou
                        <Divider />

                        <Button color='google plus' fluid size='large'>
                            Login com o google
                        </Button>
                        */}
                    </Segment>
                </Form>
                <Message>
                    Esqueceu sua senha? <Link to='/recuperar'>Recuperar</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div>
    )
}

export default Registrar;
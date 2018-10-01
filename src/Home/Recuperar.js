import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import HeaderCustom from '../Projeto/HeaderCustom'

const Recuperar = props => {
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
                        Recuperar Senha
                </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Message>
                                Caso tenha esquecido sua senha,
                                apenas digite seu endereço de email usado na sua conta criada com email e clique em "Enviar".
                                Você receberá um link para recuperar sua senha.
                            </Message>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Endereço de E-mail' />

                            <Button color='teal' fluid size='large'>
                                Enviar
                        </Button>

                        </Segment>
                    </Form>
                    <Message>
                        Novo? <Link to='/registrar'>Cadastre-se</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Recuperar
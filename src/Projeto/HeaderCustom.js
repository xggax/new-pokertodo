import React, { Component, Fragment } from 'react';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import { auth } from './../config';


class HeaderCustom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            estaLogado: false,
        }

    }

    componentDidMount() {

        const usuarioAtual = auth.currentUser;
        //   console.log(usuarioAtual);

        if (usuarioAtual !== null) {
            const usuarioLogado = {
                nome: usuarioAtual.displayName,
                foto: usuarioAtual.photoURL,
            }
            this.setState({
                usuario: usuarioLogado,
                estaLogado: true
            });
        }
    }

    deslogarUsuario = () => {
        auth
            .signOut()
            .then(() => {

                this.setState({
                    usuario: '',
                    estaLogado: false,
                })

                //      console.log('Usuario deslogado com sucesso');
            })
            .catch(error => {
                //      console.log('Erro ao deslogar o usuário:' + error);
            })

    }

    render() {

        const { foto, nome } = this.state.usuario;
        

        return (


            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Poker To Do</h1>

                    {
                        this.state.estaLogado ?
                            (
                                <Menu>
                                    <Menu.Item><strong>PokerToDo</strong></Menu.Item>
                                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                                    <Menu.Item as={Link} to='/projetos'>Projetos</Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item><Image avatar src={foto} /></Menu.Item>
                                        <Dropdown item text={nome}>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    Perfil
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={this.deslogarUsuario}>
                                                    Sair
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Menu>
                                </Menu>

                            )
                            :
                            (
                                <Menu>
                                    <Menu.Item><strong>PokerToDo</strong></Menu.Item>
                                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item><Icon name='user' /></Menu.Item>
                                        <Dropdown item text='Acesse aqui'>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link to='/login'>Login</Link>
                                                </Dropdown.Item>
                                                {/*} <Dropdown.Item>
                                                    <Link to='/registrar'>Registrar</Link>
                                                    </Dropdown.Item>*/}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Menu>
                                </Menu>
                            )
                    }
                </header >
            </div >
        )
    }
}

export default HeaderCustom;
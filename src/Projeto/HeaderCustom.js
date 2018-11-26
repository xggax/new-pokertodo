import React, { Component } from 'react';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
        // # Melhoria Futura:
        // # Não consegui usar o asyc e await então usei setInterval até chegar os dados do CurrentUser 
        // lá do firebase e poder renderizar todo o resto corretamente. Problema: um mini delay no carregamento
        this.getCurrentUser();

        /* 
        const usuarioAtual = auth.currentUser;
        console.log(usuarioAtual);
          
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
        console.log('emailUser: ', this.state.usuario.email)
        */
    }

    getCurrentUser = () => {
        let usuarioAtual = setInterval(() => {
            if ( auth.currentUser !== null ) {
                clearInterval(usuarioAtual);
                const usuarioLogado = {
                    nome: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    foto: auth.currentUser.photoURL,
                }
                this.setState({
                    usuario: usuarioLogado,
                    estaLogado: true
                });
                //console.log(auth.currentUser)
                return auth.currentUser;
            } else {
              console.log('Recebendo os dados ainda...');
            }
          }, 350);
    }
    
    deslogarUsuario = () => {
        auth.signOut().then(() => {

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

        const { foto, nome, email} = this.state.usuario;
        
        return (

            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">To Do Scrum</h1>
                    {   
                            
                        this.state.estaLogado &&
                            (
                                <Menu>
                                    <Menu.Item><strong>ToDoScrum</strong></Menu.Item>
                                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                                    <Menu.Item as={Link} to='/projetos'>Projetos</Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item><Image avatar src={foto} /></Menu.Item>
                                        <Dropdown item text={nome!== null ? nome : email}>
                                            <Dropdown.Menu>
                                                {/*<Dropdown.Item>
                                                    Perfil
                                                </Dropdown.Item>*/}
                                                <Dropdown.Item onClick={this.deslogarUsuario}>
                                                    Sair
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Menu>
                                </Menu>

                            )
                        }
                        {
                            !this.state.estaLogado &&
                            (
                                <Menu>
                                    <Menu.Item><strong>ToDoScrum</strong></Menu.Item>
                                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item><Icon name='user' /></Menu.Item>
                                        <Dropdown item text='Acesse aqui'>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link to='/'>Login</Link>
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
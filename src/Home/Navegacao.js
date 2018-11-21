import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navegacao = props => {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Poker To Do</h1>
                <Menu>
                    <Menu.Item><strong>PokerToDo</strong></Menu.Item>
                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                    {/*<Menu.Menu position='right'>
                        <Menu.Item><Icon name='user' /></Menu.Item>
                        <Dropdown item text='Acesse aqui'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    Google
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>*/}
                </Menu>
            </header>
        </div>
    )
}

export default Navegacao;
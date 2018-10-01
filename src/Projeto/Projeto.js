import React from 'react';
import { Grid, Segment, Header, Icon, Dropdown } from 'semantic-ui-react';


const Projeto = props => {
    return (
        <Grid.Column>
            <Segment >
                <Header as='h2'>
                    <Header.Subheader>
                        <Icon name={props.icone} />
                    </Header.Subheader>
                    {props.titulo}
                </Header>
                <Dropdown.Menu text name='opções'>
                    <Dropdown.Item>
                        Renomear
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Burndown
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Excluir
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Segment>
        </Grid.Column>
    )
}

export default Projeto;
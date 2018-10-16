import React from 'react';
import { Grid, Segment, Header, Icon, ListItem, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Storie = props => {
    return (
        <span key={props.id}>
            {/* Os parâmetros passados pelas rotas chegam no componente através da propriedade params.
                Poderíamos acessar o parâmetro id de dentro do componente respectivo à rota */
            }
            <Segment >
                <List size={"tiny"}>
                    <p>ID:{props.id}</p>
                    <Header as='h4'>Título: {props.titulo}
                        <Header.Subheader>
                            <List.Item>
                                <p>Descrição: {props.descricao}</p>
                            </List.Item>
                            <ListItem>
                                <p>Data Inicio: {props.dataInicio}</p>
                            </ListItem>
                            <ListItem>
                                <p>Data Fim: {props.dataFim}</p>
                            </ListItem>
                            <ListItem>
                                <p>Progresso: {props.situacao}</p>
                            </ListItem>
                            <ListItem>
                                <p>Pontos: {props.pontos}</p>
                            </ListItem>
                        </Header.Subheader>
                    </Header>
                    <Link to=''><Icon name='clipboard outline' size='large' /></Link>
                    <Link to=''><Icon name='edit outline' size='large' /></Link>
                    <Link to=''><Icon name='delete' size='large' /></Link>
                </List>
            </Segment>
        </span>
    )
}

export default Storie;
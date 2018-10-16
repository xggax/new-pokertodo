import React, { Component } from 'react';
import { Grid, Segment, Header, Icon, ListItem, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config, { auth, providers, db } from './../config';


class Storie extends Component {
    constructor(props) {
        super(props)
    }

    //Primeiro preciso codar os projetos pra receber os parametros certos pra exluir usando a ID do projeto
    removeItem(itemId) {
        const itemRef = db.ref(`/projetos/`);
        itemRef.remove();
      }


    render() {
        return (
            <span key={this.props.id} >
                {/* Os parâmetros passados pelas rotas chegam no componente através da propriedade params.
                Poderíamos acessar o parâmetro id de dentro do componente respectivo à rota */
                }
                < Segment >
                    <List size={"tiny"}>
                        <p>ID:{this.props.id}</p>
                        <Header as='h4'>Título: {this.props.titulo}
                            <Header.Subheader>
                                <List.Item>
                                    <p>Descrição: {this.props.descricao}</p>
                                </List.Item>
                                <ListItem>
                                    <p>Data Inicio: {this.props.dataInicio}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Data Fim: {this.props.dataFim}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Progresso: {this.props.situacao}</p>
                                </ListItem>
                                <ListItem>
                                    <p>Pontos: {this.props.pontos}</p>
                                </ListItem>
                            </Header.Subheader>
                        </Header>
                        <Link to=''><Icon name='clipboard outline' size='large' /></Link>
                        <Link to=''><Icon name='edit outline' size='large' /></Link>
                        <button onClick={() => this.removeItem(this.props.id)}><Icon name='delete' size='large' /></button>
                    </List>
                </Segment>
            </span >
        )
    }
}

export default Storie;
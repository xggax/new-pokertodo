import React, { Component } from 'react';
import { Segment, Image, Icon, List, ListItem } from 'semantic-ui-react';
import {db, auth} from '../config'


class Comentario extends Component {

    removeItem(itemId, projId, storyId) {
        const usuario = db.ref().child('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);

        usuario.once('value', (snapshot) => {
            let usuarioObjeto = snapshot.val();
            let chaveUsuario = Object.keys(usuarioObjeto)[0];
            let removes = {};
            removes['projetos/' + projId + '/stories/' + storyId + '/comentarios/' + itemId] = null;
            removes['projetosDoUsuario/' + chaveUsuario + '/' + projId + '/stories/' + storyId + '/comentarios/' + itemId] = null;
            db.ref().update(removes);
        })

    }

    render() {

        return (
                <List>
                    <List.Item>
                        <List.Content floated='right'>
                            <Icon name='delete' link onClick={() => this.removeItem(this.props.id, this.props.idProj, this.props.idStory)} />
                        </List.Content>
                        <Image avatar src={this.props.foto} />
                        <List.Content verticalAlign='bottom'>{this.props.autor} - {this.props.data}</List.Content>
                    </List.Item>
                    <ListItem>
                        <Segment>{this.props.post}</Segment>
                    </ListItem>
                </List>
        );
    }
}

export default Comentario;
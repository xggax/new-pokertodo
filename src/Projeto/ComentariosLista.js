import React, { Component, Fragment } from 'react';
import { TextArea, Form, FormField, Button, Image, Icon } from 'semantic-ui-react';
import Comentario from './Comentario';
import { db, auth } from '../config';
import * as moment from 'moment';
import 'moment/locale/pt-br';


class ComentariosLista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarioNovo: '',
            carregando: false,
        }

    }

    handleChangeNormal = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })

    }

    handleSubmitComment = (event) => {
        event.preventDefault();
        this.setState({
            carregando: true
        })

        let idProj = this.props.idProj;
        let idStory = this.props.idStory;
        // A post entry.
        const comentario = {
            nomeAutor: auth.currentUser.displayName,
            uidAutor: auth.currentUser.uid,
            fotoAutor: auth.currentUser.photoURL,
            post: this.state.comentarioNovo,
            postData: moment().format('llll'),
        };

        // Get a key for a new Comment.
        const novoComentarioChave = db.ref().child('projetos').child(`${idProj}`).child('stories').child(`${idStory}`).child('comentarios').push().key;

        const usuario = db.ref().child('usuarios').orderByChild('uid').equalTo(`${auth.currentUser.uid}`);
        usuario.once('value', (snapshot) => {
            let usuarioObjeto = snapshot.val();
            let chaveUsuario = Object.keys(usuarioObjeto)[0];
            let updates = {};
            updates['/projetos/' + idProj + '/stories/' + idStory + '/comentarios/' + novoComentarioChave] = comentario;
            updates['/projetosDoUsuario/' + chaveUsuario + '/' + idProj + '/stories/' + idStory + '/comentarios/' + novoComentarioChave] = comentario;
            db.ref().update(updates);

        })

        this.setState({
            comentarioNovo: '',
            carregando: false
        })

    }

    render() {
        return (
            this.state.estaCarregando ?
                (
                    <p><Icon loading name='spinner' /></p>
                )
                :
                (
                    <Fragment>
                        <Form onSubmit={this.handleSubmitComment}>
                            <FormField >
                                <label><Image avatar src={auth.currentUser.photoURL} /> {auth.currentUser.displayName}</label>
                                <TextArea
                                    placeholder='Escreva seu comentário...'
                                    required 
                                    type='text'
                                    name='comentarioNovo'
                                    value={this.state.comentarioNovo}
                                    rows='2'
                                    onChange={this.handleChangeNormal}>
                                </TextArea>
                            </FormField>
                            <Button alt='Enviar' size='mini' type='submit'>Enviar</Button>
                        </Form>
                            { // Renderizar só quando projetos e usuários estiverem não nulos

                                this.props.comentarios && Object.keys(this.props.comentarios).map(key => {
                                    return <Comentario
                                        idProj= {this.props.idProj}
                                        idStory = {this.props.idStory}
                                        key={key}
                                        id={key}
                                        autor={this.props.comentarios[key].nomeAutor}
                                        uidAutor={this.props.comentarios[key].uidAutor}
                                        foto={this.props.comentarios[key].fotoAutor}
                                        post={this.props.comentarios[key].post}
                                        data={this.props.comentarios[key].postData}
                                    />
                                }

                                )
                            }
                    </Fragment >
                )
                );
    }
}

export default ComentariosLista;
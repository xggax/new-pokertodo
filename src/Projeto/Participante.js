import React, { Component, Fragment } from 'react';
import { List, Image, Icon, Button, Modal, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { db} from '../config';

class Participante extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openAndCloseDelete: false,
            redirect: false
        }
    }

    showAndHide = () => {
        this.setState(prevState => ({
            openAndCloseDelete: !prevState.openAndCloseDelete
        }));
    }

    handleSubmitRemove = (e) => {
        e.preventDefault();
        const idProj = this.props.idProj;
        const idUsuario = this.props.idUsuario;
        const emailUsuario = this.props.email;
        console.log(this.props.idUsuario);
        const projetoRef = db.ref().child('projetos').child(`${idProj}`);
        projetoRef.once('value', (snapshot) => {
            let projeto = snapshot.val();
            let updates = {};

            Object.keys(projeto.equipeProj).map(key => {
                if (projeto.equipeProj[key].email === emailUsuario) {
                    console.log('usuarioVaiSerExcluido:', projeto.equipeProj[key]);
                    console.log('idUsario:', idUsuario)
                    console.log('vai Exluir!!!!')
                    console.log('key: ', key);
                    updates['projetosDoUsuario/' + key + '/' + idProj] = null;
                    updates['projetos/' + idProj + '/equipeProj/' + key] = null;
                    updates['usuariosNoProjeto/' + idProj + '/' + key] = null;
                    console.log('excluiu o cara!!!!');
                    console.log('-------------------')
                    /*const usuarioExcluido = db.ref().child('usuariosNoProjeto').child(`${idProj}`).child(`${idUsuario}`);
                    usuarioExcluido.on('value', snapshot => {
                        let excluido = snapshot.val();
                        if ((auth.currentUser.email === emailUsuario) && excluido === null) {
                            this.setState({
                                redirect: true
                            })
                        }
                    })*/
                    return db.ref().update(updates);

                } else {
                    console.log('Fez o else');
                    return null;
                }

            });

        })
        this.showAndHide();
        this.props.carregaStories();
    }

    render() {
        if((this.props.equipeProj[this.props.idUsuario].email === this.props.email) === null){
            return <Redirect to='/' />
        }
        return (
            <Fragment>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Image avatar src={this.props.foto} />
                <List.Content>
                    <List.Header>{this.props.nome}</List.Header>
                    {
                        (this.props.email === this.props.scrumMasterProj) ?
                            (
                                <Fragment>
                                    Líder
                                </Fragment>
                            ) :
                            (
                                <Fragment>
                                    Membro <Icon color='red' name='remove user' link title='Deletar Membro' onClick={this.showAndHide} />
                                    <Modal open={this.state.openAndCloseDelete}>
                                        <Modal.Header color='teal'>Remover {this.props.nome}?</Modal.Header>
                                        <Modal.Content>
                                            <Form onSubmit={this.handleSubmitRemove}>
                                                <Form.Field>
                                                    <Button onClick={this.showAndHide} color='red' inverted>Cancelar</Button><Button color='green' inverted type='submit'>Sim</Button>
                                                </Form.Field>
                                            </Form>
                                        </Modal.Content>
                                    </Modal>
                                </Fragment>
                            )
                    }
                </List.Content>

            </Fragment>
        )
    }
}

export default Participante;
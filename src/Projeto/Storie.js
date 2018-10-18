import React, { Component } from 'react';
import { Grid, Segment, Header, Icon, ListItem, List, Button, Modal, Input, Form, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import config, { auth, providers, db } from './../config';


class Storie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //atributos novos para update
            tituloNovo: '',
            descricaoNovo: '',
            dataInicioNovo: '',
            dataFimNovo: '',
            progressoNovo: '',
            pontosNovo: '',
            //modals
            modalOpenUpdate: false,
            modalOpenExcluir: false,
            modalOpenFechar: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleOpenUpdate = () => this.setState({ modalOpenUpdate: true })

    handleCloseUpdtate = () => this.setState({ modalOpenUpdate: false })

    handleOpenExcluir = () => { this.setState({ modalOpenExcluir: true }) }

    handleCloseExcluir = () => { this.setState({ modalOpenExcluir: false }) }

    handleOpenFechar = () => this.setState({ modalOpenFechar: true })

    handleCloseFechar = () => this.setState({ modalOpenFechar: false })

    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            //situacao: 'A fazer',
            //storyPoint: '?',
        })
    }



    handleUpdate(e) {
        e.preventDefault();
        const itemId = this.props.id;
        const projId = this.props.idProj
        console.log('enviou o form do item:', itemId);
        
        const storyRef = db.ref(`/projetos/${projId}/stories/${itemId}`);
        storyRef.on('value', (snapshot) => {
            let story = snapshot.val();
            console.log('story: ', story);
            const {storiesTitulo, storiesDesc, situacao, dataInicio, dataFim, storyPoint } = story;

            const updateStory = {
                storiesTitulo: this.state.tituloNovo,
                storiesDesc: this.state.descricaoNovo,
                dataInicio: this.state.dataInicioNovo,
                dataFim: this.state.dataFimNovo,
                situacao: this.state.progressoNovo,
                storyPoint: this.state.pontosNovo,
            }

            if(this.state.tituloNovo === ''){
                updateStory.storiesTitulo = storiesTitulo;
            }else{
                updateStory.storiesTitulo = this.state.tituloNovo;
            }

            if(this.state.descricaoNovo === ''){
                updateStory.storiesDesc = storiesDesc;
            }else{
                updateStory.storiesDesc = this.state.descricaoNovo;
            }

            if(this.state.dataInicioNovo === ''){
                updateStory.dataInicio = dataInicio;
            }else{
                updateStory.dataInicio = this.state.dataInicioNovo;
            }

            if(this.state.dataFimNovo === ''){
                updateStory.dataFim = dataFim;
            }else{
                updateStory.dataFim = this.state.dataFimNovo;
            }

            if(this.state.progressoNovo === ''){
                updateStory.situacao = situacao;
            }else{
                updateStory.situacao = this.state.progressoNovo
            }

            if(this.state.pontosNovo === ''){
                updateStory.storyPoint = storyPoint;
            }else{
                updateStory.storyPoint = this.state.pontosNovo;
            }

            console.log('updateStory:', updateStory);

            storyRef.update({
                storiesTitulo: updateStory.storiesTitulo,
                storiesDesc: updateStory.storiesDesc,
                dataInicio: updateStory.dataInicio,
                dataFim: updateStory.dataFim,
                situacao: updateStory.situacao,
                storyPoint: updateStory.storyPoint,
            })

            this.setState({
                tituloNovo: '',
                descricaoNovo: '',
                dataInicioNovo: '',
                datafimNovo: '',
                progressoNovo: '',
                storyPointNovo: '',
            });


        });

        

        /*
        if(this.state.tituloNovo == ''){
            this.setState({
                tituloNovo: 
            }) 
        }


        projetoRef.update({
            storiesTitulo: this.state.tituloNovo,

        })
        */
    }

    //Primeiro preciso codar os projetos pra receber os parametros certos pra exluir usando a ID do projeto
    removeItem(itemId, projId) {
        console.log('id da story: ', itemId);
        console.log('id do projeto: ', itemId);
        const itemRef = db.ref(`/projetos/${projId}/stories/${itemId}`);
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
                        <Link to=''><Button icon='clipboard outline' size='mini' /></Link>
                        {/*Botão de Atualizar a Story*/}
                        <Modal
                            trigger={<Button onClick={this.handleOpenUpdate} size='mini' icon='edit outline' />}
                            basic size='small'
                            open={this.state.modalOpenUpdate}
                            onClose={this.handleCloseUpdtate}
                            dimmer= 'blurring'
                        >
                            <Header icon='edit outline' content='Atualizar Story' />
                            <p>*Deixe o campo em branco vazio se não quiser alterá-lo</p>
                            <Modal.Content>
                                <Form onSubmit={this.handleUpdate}>
                                    <Form.Field>
                                        
                                        <p>Título Atual: {this.props.titulo}</p>
                                        <label>Novo Título:</label>
                                        <Input type='text' name='tituloNovo' placeholder='Novo Título' onChange={this.handleChange}  />
                                        {this.state.tituloNovo}
                                    </Form.Field>
                                    <Form.Field>
                                        
                                        <p>Descrição Atual: {this.props.descricao}</p>
                                        <label>Nova Descrição:</label>
                                        <TextArea type='text' name='descricaoNovo' rows='3' onChange={this.handleChange} />
                                        {this.state.descricaoNovo}
                                    </Form.Field>
                                    <Form.Field>
                                        
                                        <p>Data Início Atual: {this.props.dataInicio}</p>
                                        <label>Nova Data Inicio:</label>
                                        <Input type='text' name='dataInicioNovo' placeholder='Nova Data Início' onChange={this.handleChange} />
                                        {this.state.dataInicioNovo}
                                    </Form.Field>
                                    <Form.Field>
                                        
                                        <p>Data Fim Atual: {this.props.dataFim}</p>
                                        <label>Nova Data Fim:</label>
                                        <Input type='text' name='dataFimNovo' placeholder='Nova Data Fim' onChange={this.handleChange} />
                                        {this.state.dataFimNovo}
                                    </Form.Field>
                                    <Form.Field>
                                        
                                        <p>Progresso Atual: {this.props.progresso}</p>
                                        <label>Novo Progresso</label>
                                        <Input type='text' name='progressoNovo' placeholder='Novo Status de Progresso' onChange={this.handleChange} />
                                        {this.state.progressoNovo}
                                    </Form.Field>
                                    <Form.Field>
                                        
                                        <p>Pontos Atual: {this.props.pontos}</p>
                                        <label>Nova Pontuação</label>
                                        <Input type='text' name='pontosNovo' placeholder='Nova Pontuação' onChange={this.handleChange} />
                                        {this.state.progressoNovo}
                                    </Form.Field>

                                    <Button type='submit'>Atualizar</Button>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.handleCloseUpdtate} color='red' inverted>
                                    <Icon name='remove' /> Fechar
                                    </Button>
                            </Modal.Actions>
                        </Modal>
                        <Button icon='delete' size='mini' onClick={() => this.removeItem(this.props.id, this.props.idProj)} />
                    </List>
                </Segment>
            </span >
        )
    }
}

export default Storie;
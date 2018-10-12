import React from 'react'

import { Container, Segment, Grid, Button, Header, List, Modal, Icon, Form, Image } from 'semantic-ui-react'

const Participantes = props => {
    return (
        <List horizontal>
            <List.Item>
                <Header as='h3' color='teal'>Equipe: </Header>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                <List.Content>
                    <List.Header>Tom</List.Header>
                    Líder
                            </List.Content>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <List.Content>
                    <List.Header>Christian Rocha</List.Header>
                    Membro
                        </List.Content>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <List.Content>
                    <List.Header>Matt</List.Header>
                    Membro
                        </List.Content>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                <List.Content>
                    <List.Header>Naruto</List.Header>
                    Membro
                            </List.Content>
            </List.Item>
            <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <List.Content>
                    <List.Header>Sasuke</List.Header>
                    Membro
                        </List.Content>
            </List.Item>
        </List>
    )
}

export default Participantes;
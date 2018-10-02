import React from 'react';
import {Container, Segment} from 'semantic-ui-react'

import HeaderCustom from './../Projeto/HeaderCustom';

const Burndown = (props) => {
    return (
        <div>
            <HeaderCustom />
            <Container>
                <Segment piled>
                    <h2>Burndown Chart</h2>
                </Segment>
            </Container>

        </div>
    )
}

export default Burndown;
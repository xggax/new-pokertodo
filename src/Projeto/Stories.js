import React from 'react';

import HeaderCustom from './HeaderCustom';
import {Container} from 'semantic-ui-react'

const Stories = (props) => {
    return(
        <div>
            <HeaderCustom />
            <Container>
                <h2>Quadro Kanban de Stories</h2>
            </Container>
        </div>
    )
}

export default Stories;
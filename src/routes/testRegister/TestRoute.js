import React from 'react'
import {TextField} from 'material-ui'

export default class TestRoute extends React.Component {
    render() {
        return (
            <div>
                teste register
                <TextField fullWidth name="test" type="text" floatingLabelText={'NOME CERTO: '} />
                <TextField fullWidth value={'HAHA'} type="text" name="nome2" floatingLabelText={'NOME: '} />
             </div>
        )
    }
}
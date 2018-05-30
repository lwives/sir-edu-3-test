import React, {PropTypes} from 'react'
import { TextField } from 'material-ui'

export default class TextFieldDefault extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        handleChange: PropTypes.func,
        multiLine: PropTypes.bool
    }

    render () {
        var name = (this.props.name).replace(' ', '-').toLowerCase()
        var LabelText = this.props.name + ': '
        
        const type = (this.props.type !== undefined) ? this.props.type : 'text'
        const isMultiLine = this.props.multiLine  //(this.props.multiLine === undefined) ? true : false
        
        // className="col-md-6" 
        return (
            <TextField multiLine={isMultiLine} fullWidth value={this.props.value || ''} type={type} name={name} onChange={this.props.handleChange} floatingLabelText={LabelText} />
        )
    }
}

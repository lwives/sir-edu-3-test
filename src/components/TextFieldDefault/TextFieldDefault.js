import React, {PropTypes} from 'react'
import { TextField } from 'material-ui'

export default class TextFieldDefault extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        handleChange: PropTypes.func,
        multiLine: PropTypes.bool,
        className: PropTypes.string
    }

    render () {
        var name = (this.props.name).replace(' ', '-').toLowerCase()
        var LabelText = this.props.name + ': '
        
        const type = (this.props.type !== undefined) ? this.props.type : 'text'
        const isMultiLine = this.props.multiLine  //(this.props.multiLine === undefined) ? true : false
        const className = this.props.className // "col-md-6"
        
        return (
            <TextField className={className} multiLine={isMultiLine} fullWidth value={this.props.value || ''} type={type} name={name} floatingLabelText={LabelText} />
        )
    }
}

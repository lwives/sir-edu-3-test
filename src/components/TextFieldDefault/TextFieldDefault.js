import React, {PropTypes} from 'react'
import { TextField } from 'material-ui'

export default class TextFieldDefault extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        handleOnChange: PropTypes.func,
        multiLine: PropTypes.bool,
        className: PropTypes.string
    }

    render () {
        var name = (this.props.name).replace(' ', '_').toLowerCase()
        name = name.toLowerCase()
        console.log(name);
        
        var LabelText = this.props.name + ': '
        
        const type = (this.props.type !== undefined) ? this.props.type : 'text'
        const isMultiLine = this.props.multiLine  //(this.props.multiLine === undefined) ? true : false
        const className = this.props.className // "col-md-6"
        const placeholder = this.props.placeholder // "col-md-6"
        
        return (
            <div>
            <label htmlFor={name} id={name}>{placeholder}</label>
            <input className={className} 
                multiLine={isMultiLine} fullWidth 
                value={this.props.value || ''} onChange={this.props.handleOnChange}
                type={type} name={name} 
                floatingLabelText={LabelText} />
            {/*  <TextField className={className} 
                 multiLine={isMultiLine} fullWidth 
                 value={this.props.value || ''} onChange={this.props.handleOnChange}
                 type={type} name={name} 
                 floatingLabelText={LabelText} /> */}
            </div>
        )
    }
}

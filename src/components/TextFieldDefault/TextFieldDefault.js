import React, {PropTypes} from 'react'
import './textFieldDefault.scss'
//import { TextField } from 'material-ui'

export default class TextFieldDefault extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        handleOnChange: PropTypes.func,
        multiLine: PropTypes.bool,
        className: PropTypes.string,
        fieldDescription: PropTypes.string
    }

    render () {
        var name = (this.props.name).replace(' ', '_');
        //name = name.toLowerCase()
        
        const type = (this.props.type !== undefined) ? this.props.type : 'text';
        const isMultiLine = this.props.multiLine; //(this.props.multiLine === undefined) ? true : false
        const className = 'form-control ' + this.props.className;
        const fieldDescription = (this.props.fieldDescription) ? this.props.fieldDescription : this.props.floatingLabelText;
        const LabelText = fieldDescription + ': ';
        const placeholder = (this.props.placeholder) ? this.props.placeholder: fieldDescription;
        let component;
        
        if (!isMultiLine) {  
            component = <input className={className} 
                            value={this.props.value || ''} onChange={this.props.onChange}
                            type={type} name={name} 
                            placeholder={placeholder}
                            />
        } else {
            component = <textarea className={className} 
                            rows={this.props.rows}
                            value={this.props.value || ''} onChange={this.props.onChange}
                            type={type} name={name} 
                            placeholder={placeholder}
                            />
        }
        
        return (
            <div className="textFieldDefault">
                <label htmlFor={name} id={name}>{LabelText}</label>
                {component}
                {/*  <TextField className={className} 
                    multiLine={isMultiLine} fullWidth 
                    value={this.props.value || ''} onChange={this.props.handleOnChange}
                    type={type} name={name} 
                    floatingLabelText={LabelText} /> */}
            </div>
        )
    }
}

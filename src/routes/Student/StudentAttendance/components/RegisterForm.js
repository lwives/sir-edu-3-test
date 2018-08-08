import React, { PropTypes } from 'react'
import { DatePicker, RaisedButton, TextField } from 'material-ui' //Checkbox, RaisedButton, SelectField, MenuItem, TextField, Button, 
import Dropzone from '../../../../components/Dropzone'
import { specialNeeds } from '../../../../constants/necessidadesEspeciais'
import handleChangeHelper2 from '../../../../helpers/register-helper'

const handleChangeHelper = (event, id, valueParam) => {
    let name = '';
    let value = null;
    
    if (event) {
        name = event.target.name;
        value = event.target.value;
    } else {
        name = id;
        value = valueParam;
    }
    return { [name]: value }
}

export default class RegisterForm extends React.Component {
    static propTypes = {
        step: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        student: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.openTermOfUse = false;
        this.isInitialState = true;
        this.register = {}
        this.defaultValue()
        this.registerInitialLength = this.register.lenght
    
    this.classes = theme => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap'
        },
        textField: {
          marginLeft: 10, //theme.spacing.unit,
          marginRight: 100, //theme.spacing.unit,
          width: 200
        }
      })
    }

    defaultValue = () => {
        if (!this.register.country && !this.register.city) {
            this.register.city = 'Porto Alegre'
            this.register.state = 'Rio Grande do Sul'
            this.register.country = 'Brasil'
        }
    }

    onImageDrop = (field, file) => {
        this.addRegister({}, field, file)
    }

    handleChange = (event, id, valueParam) => {
        this.addRegister(handleChangeHelper(event, id, valueParam))
        this.forceUpdate()
        //this.setState(...this.register)
    }

    handleCheckbox = (event, value) => {
        this.addRegister({}, [event.target.name], value)
    }

    handleSelectChange = (event, index, values, stateProp) => {
        this.addRegister({}, stateProp, values)
    }

    handleCheckboxGroup = (value) => {
        let newSelectionArray;
        let student = this.props.student
        if (student.specialNeeds && student.specialNeeds.indexOf(value) > -1) {
            newSelectionArray = student.specialNeeds.filter(s => s !== value)
        } else {
            newSelectionArray = [...student.specialNeeds || '', value];
        }
        this.addRegister({}, 'specialNeeds', newSelectionArray)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        //this.setState(...this.register)
        this.props.handleSubmit(this.register);
    }
    
    addRegister = (entry, key = '', content = '') => {
        console.log(entry);
        
        if (entry.lenth <= 0) { 
            entry = {[key]: content}
        }
        this.register = {
            ...this.register,
            entry
        }
    }

    showTermOfUse = () => {
        this.openTermOfUse = true;
    }

    render() {
        if (!this.register.name) {
            this.register = { ...this.register, ...this.props.student }
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.step === 0 &&
                    <div className="row">
                        <div className="col-md-12">
                        <div className="col-md-8">
                            <label>Imagem do aluno:</label>
                            <span className="text-center">
                                <Dropzone
                                    multiple={false}
                                    accept={'image/*'}
                                    name="avatar"
                                    onDrop={this.onImageDrop}
                                    initConfig={this.register.avatar}
                                    text={'Arraste e solte uma imagem ou clique no botão para selecionar um arquivo'} />
                            </span>
                            </div>
                        </div><div className="col-md-8">
                            <TextField fullWidth className={this.classes.textField} value={this.register.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome:" required />
                        {/* </div><div className="col-md-2">
                            <TextField fullWidth className={this.classes.textField} value={this.register.country || ''} type="text" name="country" onChange={this.handleChange} floatingLabelText="País:" /> */}
                        </div>
                    </div>
                }
                {this.props.step === 1 &&
                    <div className="row">
                        <div className="col-md-4">
                            <TextField fullWidth className={this.classes.textField} value={this.register.school || ''} type="text" name="school" onChange={this.handleChange} floatingLabelText="Escola:" />
                        </div>
                    </div>
                }
                {this.props.step === 2 &&
                    <div className="row ">
                        <div className="col-md-12">
                            {/* <Checkbox style={{ width: 290, float: 'left', marginTop: 5 }}
                                label="Você concorda com o termo de uso?" name="termOfUse"
                                checked={this.register.termOfUse || false}
                                onCheck={this.handleCheckbox}
                            /> */}
                            {/* geralRegister: { type: Number }, 
                            historical: { type: String },
                            docParentsAproval: { path: String, mimeType: String },
                            termOfUse: { type: Boolean }, 
                            _dateCreate: { type: Date },
                            _dateModifi: { type: Date },*/}
  
                            {/* geralRegister: { type: Number },
  historical: { type: String },
  docParentsAproval: { path: String, mimeType: String },
  termOfUse: { type: Boolean },
  _createdBy: { type: String, ref: 'User' }, //Link to teacher model
  _schoolId: { type: String, ref: 'School' } //Link to school model */} 
                            {/* <RaisedButton color="primary" type="submit" label="Cadastrar" /> */}
                            <button className="btn btn-primary">Cadastrar</button>
                        </div>
                    </div>
                }
            </form>
        )
    }
}

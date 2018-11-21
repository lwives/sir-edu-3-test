import React, { PropTypes } from 'react'
import { DatePicker } from 'material-ui' //TextField, Checkbox, RaisedButton, SelectField, MenuItem, TextFieldDefault, Button, 
import Dropzone from '../../../../components/Dropzone'
import MultipleCheckboxes from './MultipleCheckboxes'
import { specialNeeds } from '../../../../constants/necessidadesEspeciais'
//import handleChangeHelper2 from '../../../../helpers/register-helper'
import TextFieldDefault from '../../../../components/TextFieldDefault'
import { setDefaultValue } from '../../../../helpers/register-helper'

const defaultValue = [
    { city: 'Porto Alegre' },
    { state: 'Rio Grande do Sul' },
    { country: 'Brasil' }
];

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
        student: PropTypes.object,
        selectedStudent: PropTypes.object,
        modo: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.openTermOfUse = false;
        this.register = {}
        setDefaultValue(defaultValue, this.addRegister, this.getRegister)
        this.registerInitialLength = this.register.lenth;
        
        this.loadInitial = false;
    
        this.classes = {  }
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
        if (entry.lenth <= 0) { 
            entry = {[key]: content}
        }
        this.register = {
            ...this.register,
            ...entry
        }
        console.log(entry, this.register);
    }

    getRegister = (key) => {
        return (key) ? this.register[key] : this.register
    }

    showTermOfUse = () => {
        this.openTermOfUse = true;
    }

    componentDidMount() {
    }
    
    render() {
        if (!this.loadInitial && ( 
            this.props.modo === 'editar' || this.props.modo === 'excluir')) { 
            this.register = { ...this.register, ...this.props.selectedStudent }
            this.loadInitial = true;
        }
        
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.step === 0 &&
                    <div className="row">
                        <div className="form-group col-md-12">
                        <div className="form-group col-md-8">
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
                        </div><div className="form-group col-md-8">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.name || ''} type="text" name="name" onChange={this.handleChange} fieldDescription="Nome" required />
                        </div><div className="col-md-4">
                            <DatePicker fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.register.birthdate || {}} name="birthdate" onChange={(evt, value) => { this.handleChange(evt, 'birthdate', value) }} floatingLabelText="Data Nascimento" />
                        </div><div className="form-group col-md-6">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.motherName || ''} type="text" name="motherName" onChange={this.handleChange} fieldDescription="Nome da Mãe" required />
                        </div><div className="form-group col-md-2">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.motherPhone || ''} type="phone" name="motherPhone" onChange={this.handleChange} fieldDescription="Telefone na Mãe" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.motherEmail || ''} type="email" name="motherEmail" onChange={this.handleChange} fieldDescription="E-mail da Mãe" />
                        </div><div className="form-group col-md-6">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.fatherName || ''} type="text" name="fatherName" onChange={this.handleChange} fieldDescription="Nome do Pai" />
                        </div><div className="form-group col-md-2">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.fatherPhone || ''} type="phone" name="fatherPhone" onChange={this.handleChange} fieldDescription="Telefone do Pai" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.fatherEmail || ''} type="email" name="fatherEmail" onChange={this.handleChange} fieldDescription="E-mail do Pai" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.responsible || ''} type="text" name="responsible" onChange={this.handleChange} fieldDescription="Nome do Responsável" />
                        </div><div className="form-group col-md-2">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.relationship || ''} type="text" name="relationship" onChange={this.handleChange} fieldDescription="Parentesco" />
                        </div><div className="form-group col-md-2">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.responsiblePhone || ''} type="phone" name="responsiblePhone" onChange={this.handleChange} fieldDescription="Telefone do Respons." />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.responsibleEmail || ''} type="email" name="responsibleEmail" onChange={this.handleChange} fieldDescription="E-mail do Responsável" />
                        </div><div className="form-group col-md-6">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.adress || ''} type="text" name="adress" onChange={this.handleChange} fieldDescription="Endereço" />
                        </div><div className="form-group col-md-6">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.adress2 || ''} type="text" name="adress2" onChange={this.handleChange} fieldDescription="Complemento" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.district || ''} type="text" name="district" onChange={this.handleChange} fieldDescription="Bairro" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.city || ''} type="text" name="city" onChange={this.handleChange} fieldDescription="Cidade" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.state || ''} type="text" name="state" onChange={this.handleChange} fieldDescription="Estado" />
                        {/* </div><div className="form-group col-md-2">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.country || ''} type="text" name="country" onChange={this.handleChange} fieldDescription="País" /> */}
                        </div>
                    </div>
                }
                {this.props.step === 1 &&
                    <div className="row">
                        <div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.school || ''} type="text" name="school" onChange={this.handleChange} fieldDescription="Escola" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.registration || ''} type="text" name="registration" onChange={this.handleChange} fieldDescription="Matrícula" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.classNumber || ''} type="text" name="classNumber" onChange={this.handleChange} fieldDescription="Turma" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.shift || ''} type="text" name="shift" onChange={this.handleChange} fieldDescription="Turno" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.series || ''} type="text" name="series" onChange={this.handleChange} fieldDescription="Ano/Série" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.professorNEE || ''} type="text" name="professorNEE" onChange={this.handleChange} fieldDescription="Professor NEE" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.orientation || ''} type="text" name="orientation" onChange={this.handleChange} fieldDescription="Orientação Educacional" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.coordination || ''} type="text" name="coordination" onChange={this.handleChange} fieldDescription="Coordenação Pedagógica" />
                        </div><div className="form-group col-md-4">
                            <DatePicker fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.register.routingDate || {}} name="routingDate" onChange={(evt, value) => { this.handleChange(evt, 'routingDate', value) }} placeholder="Data de encaminhamento a AEE/SR" />
                        </div><div className="form-group col-md-4">
                            <TextFieldDefault fullWidth className={this.classes.textField} multiLine value={this.register.routingReason || ''} type="text" name="routingReason" onChange={this.handleChange} fieldDescription="Motivo do encaminhamento a AEE/SR" />
                        </div>
                    </div>
                }
                {this.props.step === 2 &&
                    <div className="row ">
                        <div className="form-group col-md-8">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.cid || ''} type="text" name="cid" onChange={this.handleChange} fieldDescription="CID" />
                        </div><div className="form-group col-md-12">
                            <MultipleCheckboxes specialNeeds={specialNeeds} values={this.register.specialNeeds || []} handleCheckboxGroup={this.handleCheckboxGroup} />
                        </div><div className="form-group col-md-8">
                            <TextFieldDefault fullWidth className={this.classes.textField} value={this.register.otherSpecialNeeds || ''} type="text" name="otherSpecialNeeds" onChange={this.handleChange} fieldDescription="Outras necessidades especiais" />
                        </div>
                        <div className="form-group col-md-12">
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

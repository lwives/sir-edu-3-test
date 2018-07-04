import React, { PropTypes } from 'react'
import { DatePicker, Checkbox, RaisedButton, TextField } from 'material-ui' //RaisedButton, SelectField, MenuItem, TextField, Button, 
import Dropzone from 'components/Dropzone'
import MultipleCheckboxes from './MultipleCheckboxes'
import { specialNeeds } from '../../../../constants/necessidadesEspeciais'

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
    }

    defaultValue = () => {
        if ( !this.register.country ) {
            this.register.city = 'Porto Alegre'
            this.register.state = 'Rio Grande do Sul'
        }
    }

    onImageDrop = (field, file) => {
        this.addRegister(field, file)
    }

    handleChange = (event, id, valueParam) => {
        let name = '';
        let value = null;
        console.log(event);

        if (event) {
            name = event.target.name;
            value = event.target.value;
        } else {
            name = id;
            value = valueParam;
        }
        this.addRegister(name, value)
        this.forceUpdate()
        //this.setState(...this.register)
    }

    handleCheckbox = (event, value) => {
        this.addRegister([event.target.name], value)
    }

    handleSelectChange = (event, index, values, stateProp) => {
        this.addRegister(stateProp, values)
    }

    handleCheckboxGroup = (value) => {
        let newSelectionArray;
        let student = this.props.student
        if (student.specialNeeds && student.specialNeeds.indexOf(value) > -1) {
            newSelectionArray = student.specialNeeds.filter(s => s !== value)
        } else {
            newSelectionArray = [...student.specialNeeds || '', value];
        }
        this.addRegister('specialNeeds', newSelectionArray)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        this.setState(...this.register)
        // console.log('handleSubmit')
        // console.log(this.register)
        // console.log(this.state)
        this.props.handleSubmit(this.register);
    }

    addRegister = (key, content) => {
        this.register = {
            ...this.register,
            [key]: content
        }
    }

    showTermOfUse = () => {
        this.openTermOfUse = true;
    }

    render() {
        if (!this.register.name) {
            this.register = { ...this.props.student }
            if (!this.register.city) {
                this.register.city = 'Porto Alegre'
            }
            if (!this.register.state) {
                this.register.state = 'Rio Grande do Sul'
            }
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.step === 0 &&
                    <div className="col-md-12">
                        <div className="col-md-4">
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
                        </div><div className="col-md-8">
                            <TextField fullWidth value={this.register.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome:" required />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.motherName || ''} type="text" name="motherName" onChange={this.handleChange} floatingLabelText="Nome da Mãe:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.fatherName || ''} type="text" name="fatherName" onChange={this.handleChange} floatingLabelText="Nome da Pai:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.responsible || ''} type="text" name="responsible" onChange={this.handleChange} floatingLabelText="Nome do Responsável:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.relationship || ''} type="text" name="relationship" onChange={this.handleChange} floatingLabelText="Parentesco do Responsável:" />
                        </div><div className="col-md-4">
                            <DatePicker fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.register.birthdate || {}} name="birthdate" onChange={(evt, value) => { this.handleChange(evt, 'birthdate', value) }} floatingLabelText="Data Nascimento:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.phoneNumber || ''} type="number" name="phoneNumber" onChange={this.handleChange} floatingLabelText="Telefone:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.email || ''} type="email" name="email" onChange={this.handleChange} floatingLabelText="E-mail:" />
                        </div><div className="col-md-6">
                            <TextField fullWidth value={this.register.adress || ''} type="text" name="adress" onChange={this.handleChange} floatingLabelText="Endereço:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.city || ''} type="text" name="city" onChange={this.handleChange} floatingLabelText="Cidade:" />
                        </div><div className="col-md-2">
                            <TextField fullWidth value={this.register.state || ''} type="text" name="state" onChange={this.handleChange} floatingLabelText="Estado:" />
                        </div>
                        {/* Telefone de contato, e-mail de contato */}

                    </div>
                }
                {this.props.step === 1 &&
                    <div className="row">
                        <div className="col-md-4">
                            <TextField fullWidth value={this.register.school || ''} type="text" name="school" onChange={this.handleChange} floatingLabelText="Escola:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.registration || ''} type="number" name="registration" onChange={this.handleChange} floatingLabelText="Matrícula:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.classNumber || ''} type="number" name="classNumber" onChange={this.handleChange} floatingLabelText="Turma:" helperText="Turma regular" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.shift || ''} type="text" name="shift" onChange={this.handleChange} floatingLabelText="Turno:" helperText="Turno da turma regular" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.series || ''} type="text" name="series" onChange={this.handleChange} floatingLabelText="Ano/Série:" />
                        </div>
                        <div className="col-md-4">
                            <TextField fullWidth value={this.register.professorNEE || ''} type="text" name="professorNEE" onChange={this.handleChange} floatingLabelText="Professor NEE:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.orientation || ''} type="text" name="orientation" onChange={this.handleChange} floatingLabelText="Orientação Educacional:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth value={this.register.coordination || ''} type="text" name="coordination" onChange={this.handleChange} floatingLabelText="Coordenação Pedagógica:" />
                        </div><div className="col-md-4">
                            <DatePicker fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.register.routingDate || {}} name="routingDate" onChange={(evt, value) => { this.handleChange(evt, 'routingDate', value) }} floatingLabelText="Data de encaminhamento a AEE/SIR:" />
                        </div><div className="col-md-4">
                            <TextField fullWidth multiLine value={this.register.routingReason || ''} type="text" name="routingReason" onChange={this.handleChange} floatingLabelText="Motivo do encaminhamento" />
                        </div>
                    </div>
                }
                {this.props.step === 2 &&
                    <div className="col-md-12">
                        <div className="col-md-8">
                            <TextField fullWidth value={this.register.cid || ''} type="text" name="cid" onChange={this.handleChange} floatingLabelText="CID:" />
                        </div><div className="col-md-12">
                            <MultipleCheckboxes specialNeeds={specialNeeds} values={this.register.specialNeeds || []} handleCheckboxGroup={this.handleCheckboxGroup} />
                        </div><div className="col-md-8">
                            <TextField fullWidth value={this.register.otherSpecialNeeds || ''} type="text" name="otherSpecialNeeds" onChange={this.handleChange} floatingLabelText="Outras necessidades especiais:" />
                        </div>
                        <div className="col-md-12">
                            {/* <Checkbox style={{ width: 290, float: 'left', marginTop: 5 }}
                                label="Você concorda com o termo de uso?" name="termOfUse"
                                checked={this.register.termOfUse || false}
                                onCheck={this.handleCheckbox}
                            /> */}
                            <RaisedButton color="primary" type="submit" label="Cadastrar" />
                            {/* <input className="hidden" type="submit" /> */}
                        </div>
                    </div>
                }
            </form>
        )
    }
}

import React, { PropTypes } from 'react'
import { DatePicker, TextField } from 'material-ui' //Checkbox, RaisedButton, SelectField, MenuItem, TextFieldDefault, Button, 
import { setDefaultValue } from '../../../../helpers/register-helper'
import HeaderDefault from '../../../../components/HeaderDefault';
import TextFieldDefault from '../../../../components/TextFieldDefault';

const defaultValue = [
    { date: new Date() },
    { adaptationHistoric: 'Tras o texto do Histórico Anterior aqui...' },
    { adaptationNeed: 'Tras o texto do Necessidades aqui...' }
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
        student: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.openTermOfUse = false;
        this.isInitialState = true;
        this.register = {}
        setDefaultValue(defaultValue, this.addRegister, this.getRegister)
        this.registerInitialLength = this.register.lenght

        this.classes = '';
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
        if (entry.length <= 0) {
            entry = { [key]: content }
        }
        this.register = {
            ...this.register,
            ...entry
        }
    }

    getRegister = (key) => {
        return (key) ? this.register[key] : this.register
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.step === 0 &&
                    <div>
                        <div className="row">
                            <div className="col-md-3">
                                <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                                    locale="pt-br"
                                    value={this.register.date || {}}
                                    name="date"
                                    onChange={(evt, value) => { this.handleChange(evt, 'date', value.toISOString()) }}
                                    floatingLabelText="Data"
                                />
                            </div><div className="col-md-3">
                                <TextField fullWidth className={this.classes} value={this.register.grade || ''} placeholder="Série/Etapa" name="grade" floatingLabelText="Série/Etapa" onChange={(evt, value) => { this.handleChange(evt, 'grade', value) }} />
                            </div><div className="col-md-3">
                                <TextField fullWidth className={this.classes} value={this.register.class || ''} placeholder="Turma" name="class" floatingLabelText="Turma" onChange={(evt, value) => { this.handleChange(evt, 'class', value) }} />
                            </div><div className="col-md-3">
                                <TextField fullWidth className={this.classes} value={this.register.period || ''} placeholder="Trimestre" name="period" floatingLabelText="Trimestre" onChange={(evt, value) => { this.handleChange(evt, 'period', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth className={this.classes} value={this.register.matters || ''} placeholder="Matéria/Área" name="matters" floatingLabelText="Matéria/Área" onChange={(evt, value) => { this.handleChange(evt, 'matters', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth className={this.classes} value={this.register.teacher || ''} placeholder="Professor" name="teacher" floatingLabelText="Professor" onChange={(evt, value) => { this.handleChange(evt, 'teacher', value) }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <HeaderDefault texto="Histórico" type="h4" />
                            </div><div className="col-md-6">
                                <HeaderDefault texto="Necessidade" type="h4" />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.adaptationHistoric || ''} placeholder="Histórico" name="adaptationHistoric" floatingLabelText="Histórico" onChange={(evt, value) => { this.handleChange(evt, 'adaptationHistoric', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.adaptationNeed || ''} placeholder="Necessidade" name="adaptationNeed" floatingLabelText="Necessidade" onChange={(evt, value) => { this.handleChange(evt, 'adaptationNeed', value) }} />
                            </div><div className="col-md-6">
                                <HeaderDefault texto="Programação" type="h4" />
                            </div><div className="col-md-6">
                                <HeaderDefault texto="Sugestão" type="h4" />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.programGoals || ''} placeholder="Objetivos" name="programGoals" floatingLabelText="Objetivos" onChange={(evt, value) => { this.handleChange(evt, 'programGoals', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.suggestionGoals || ''} placeholder="Objetivos" name="suggestionGoals" floatingLabelText="Objetivos" onChange={(evt, value) => { this.handleChange(evt, 'suggestionGoals', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.programConceptual || ''} placeholder="Conteúdos/Conceitos" name="programConceptual" floatingLabelText="Conteúdos Conceituais" onChange={(evt, value) => { this.handleChange(evt, 'programConceptual', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.suggestionConceptual || ''} placeholder="Conteúdos/Conceitos" name="suggestionConceptual" floatingLabelText="Conteúdos Conceituais" onChange={(evt, value) => { this.handleChange(evt, 'suggestionConceptual', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.programContents || ''} placeholder="Conteúdos Procedimentais" name="programContents" floatingLabelText="Conteúdos Procedimentais" onChange={(evt, value) => { this.handleChange(evt, 'programContents', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.suggestionContents || ''} placeholder="Conteúdos Procedimentais" name="suggestionContents" floatingLabelText="Conteúdos Procedimentais" onChange={(evt, value) => { this.handleChange(evt, 'suggestionContents', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.programEvaluation || ''} placeholder="Avaliações" name="programEvaluation" floatingLabelText="Avaliações" onChange={(evt, value) => { this.handleChange(evt, 'programEvaluation', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows={3} className={this.classes} value={this.register.suggestionEvaluation || ''} placeholder="Avaliações" name="suggestionEvaluation" floatingLabelText="Avaliações" onChange={(evt, value) => { this.handleChange(evt, 'suggestionEvaluation', value) }} />
                            </div> 

                            <div className="col-md-12">
                                <button className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>
                    </div>
                }
            </form>
        )
    }
}

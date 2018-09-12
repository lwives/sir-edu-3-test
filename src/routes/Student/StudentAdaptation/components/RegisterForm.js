import React, { PropTypes } from 'react'
import { DatePicker, TextField } from 'material-ui' //Checkbox, RaisedButton, SelectField, MenuItem, TextField, Button, 
import { setDefaultValue } from '../../../../helpers/register-helper'
import HeaderDefault from '../../../../components/HeaderDefault';

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
        // if (!this.register.name) {
        //     this.register = { ...this.register, ...this.props.student }
        // }
        console.log(this.register);

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
                                <TextField fullWidth className={this.classes.field} value={this.register.grade || ''} placeholder="Série/Etapa" floatingLabelText="Série/Etapa" onChange={(evt, value) => { this.handleChange(evt, 'grade', value) }} />
                            </div><div className="col-md-3">
                                <TextField fullWidth className={this.classes.field} value={this.register.class || ''} placeholder="Turma" floatingLabelText="Turma" onChange={(evt, value) => { this.handleChange(evt, 'class', value) }} />
                            </div><div className="col-md-3">
                                <TextField fullWidth className={this.classes.field} value={this.register.period || ''} placeholder="Trimestre" floatingLabelText="Trimestre" onChange={(evt, value) => { this.handleChange(evt, 'period', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth className={this.classes.field} value={this.register.matters || ''} placeholder="Matéria/Área" floatingLabelText="Matéria/Área" onChange={(evt, value) => { this.handleChange(evt, 'matters', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth className={this.classes.field} value={this.register.teacher || ''} placeholder="Professor" floatingLabelText="Professor" onChange={(evt, value) => { this.handleChange(evt, 'teacher', value) }} />
                            </div>
                        </div>
                        <div className="row">
                            <HeaderDefault texto="Adequação" type="h2" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.adaptationHistoric || ''} placeholder="Histórico" floatingLabelText="Histórico" onChange={(evt, value) => { this.handleChange(evt, 'adaptationHistoric', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.adaptationNeed || ''} placeholder="Necessidade" floatingLabelText="Necessidade" onChange={(evt, value) => { this.handleChange(evt, 'adaptationNeed', value) }} />
                            </div><div className="col-md-6">
                                <HeaderDefault texto="Programação" type="h4" />
                            </div><div className="col-md-6">
                                <HeaderDefault texto="Sugestão" type="h4" />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.programGoals || ''} placeholder="Objetivos" floatingLabelText="Objetivos" onChange={(evt, value) => { this.handleChange(evt, 'programGoals', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.suggestionGoals || ''} placeholder="Objetivos" floatingLabelText="Objetivos" onChange={(evt, value) => { this.handleChange(evt, 'suggestionGoals', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.programConceptual || ''} placeholder="Conteúdos Conceituais" floatingLabelText="Conteúdos Conceituais" onChange={(evt, value) => { this.handleChange(evt, 'programConceptual', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.suggestionConceptual || ''} placeholder="Conteúdos Conceituais" floatingLabelText="Conteúdos Conceituais" onChange={(evt, value) => { this.handleChange(evt, 'suggestionConceptual', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.programContents || ''} placeholder="Conteúdos Procedimentais e Avaliações" floatingLabelText="Conteúdos Procedimentais e Avaliações" onChange={(evt, value) => { this.handleChange(evt, 'programContents', value) }} />
                            </div><div className="col-md-6">
                                <TextField fullWidth multiLine rows="3" className={this.classes.field} value={this.register.suggestionContents || ''} placeholder="Conteúdos Procedimentais e Avaliações" floatingLabelText="Conteúdos Procedimentais e Avaliações" onChange={(evt, value) => { this.handleChange(evt, 'suggestionContents', value) }} />
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

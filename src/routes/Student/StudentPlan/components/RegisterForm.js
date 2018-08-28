import React, { PropTypes } from 'react'
import { DatePicker, TextField } from 'material-ui' //Checkbox, RaisedButton, SelectField, MenuItem, TextField, Button, 
import Paper from 'material-ui/Paper'
import TinyMCE from 'react-tinymce'
import { setDefaultValue } from '../../../../helpers/register-helper'
import HeaderDefault from '../../../../components/HeaderDefault';

const defaultValue = [
    { date: new Date() }
];

const paperStyle = {
    marginBotton: 400
};

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

const developeStatus = {
    title: 'Anacronismos e Habilidades',
    elements: [
        {
            title: 'Funções Cognitivas',
            elements: [
                { title: 'Memória (Curto/Longo Prazo)', column: 0, line: 0 },
                { title: 'Raciocínio Lógico', column: 0, line: 1 },
                { title: 'Linguagem', column: 0, line: 2 },
                { title: 'Atenção', column: 0, line: 3 },
                { title: 'Percepção', column: 0, line: 4 },
                { title: 'Funções Executivas', column: 0, line: 5 }]
        }, {
            title: 'Funções Interativas/Sociais',
            elements: [
                { title: 'Relações Interpessoais', column: 1, line: 0 },
                { title: 'Relações Comportamentais', column: 1, line: 1 },
                { title: 'Autonomia', column: 1, line: 2 },
                { title: 'Relações Culturais', column: 1, line: 3 },
                { title: 'Auto-imagem', column: 1, line: 4 },
                { title: 'Resolução de conflitos', column: 1, line: 5 }]
        }, {
            title: 'Funções Motoras',
            elements: [
                { title: 'Dinâmica Geral - Controle das ações motoras', column: 2, line: 0 },
                { title: 'Execução e intencionalidade', column: 2, line: 1 },
                { title: 'Flexibilidade, tonicidade, movimentos involuntários', column: 2, line: 2 },
                { title: 'Lateralidade e domínio de esquema corporal', column: 2, line: 3 },
                { title: 'Equilíbrio estático e dinâmico', column: 2, line: 4 },
                { title: 'Compensações motoras', column: 2, line: 5 }]
        }
    ]
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

        this.developerStatusLayout()
    }

    developerStatusLayout = function () {
        let list = [];
        const lenghtElements = developeStatus.elements.reduce((prev, cur) => {
            return (prev > cur.elements.length) ? prev : cur.elements.length
        }, 0)
        for (let index = 0; index < lenghtElements; index++) {
            list.push([])
        }
        this.developeStatusTransposed = developeStatus.elements.reduce((prev, curr) => {
            for (const index in curr.elements) {
                prev[index].push(curr.elements[index])
            }
            return prev
        }, list)
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
            entry = { [key]: content }
        }
        this.register = {
            ...this.register,
            entry
        }
    }

    getRegister = (key) => {
        return this.register[key]
    }

    render() {
        if (!this.register.name) {
            this.register = { ...this.register, ...this.props.student }
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <HeaderDefault texto="Identificacao" type="h2" />
                <div className="row">
                    <div className="col-md-6">
                        <DatePicker DateTimeFormat={Intl.DateTimeFormat}
                            locale="pt-br"
                            value={this.register.date || {}}
                            name="date"
                            onChange={(evt, value) => { this.handleChange(evt, 'date', value.toISOString()) }}
                            floatingLabelText="Data"
                        />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.extraClassActivity || ''} floatingLabelText="Título" onChange={(evt, value) => { this.handleChange(evt, 'extraClassActivity', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.AEE || ''} floatingLabelText="AEE **" onChange={(evt, value) => { this.handleChange(evt, 'aee', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.days || ''} floatingLabelText="Dias de atendimento" onChange={(evt, value) => { this.handleChange(evt, 'days', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.shift || ''} floatingLabelText="Turno" onChange={(evt, value) => { this.handleChange(evt, 'shift', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.otherInformation || ''} floatingLabelText="Outras informação" onChange={(evt, value) => { this.handleChange(evt, 'otherInformation', value) }} />
                    </div>
                </div>
                <HeaderDefault texto="Histórico" type="h2" />
                <div className="row">
                    <div className="col-md-6">
                        <TextField fullWidth value={this.register.forwardingCode || ''} floatingLabelText="Código no Encaminhamento AEE" onChange={(evt, value) => { this.handleChange(evt, 'forwardingCode', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.forwardingReason || ''} floatingLabelText="Motivo do encaminhamento" onChange={(evt, value) => { this.handleChange(evt, 'forwardingReason', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.forwardingDate || ''} floatingLabelText="Data do encaminhamento" onChange={(evt, value) => { this.handleChange(evt, 'forwardingDate', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.familyDinamics || ''} floatingLabelText="Dinâmica Familiar" onChange={(evt, value) => { this.handleChange(evt, 'familyDinamics', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.historical || ''} floatingLabelText="Histórico Escolar" onChange={(evt, value) => { this.handleChange(evt, 'historical', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.attendance || ''} floatingLabelText="Atendimento (especializado)*" onChange={(evt, value) => { this.handleChange(evt, 'attendance', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.NEES || ''} floatingLabelText="NEES *" onChange={(evt, value) => { this.handleChange(evt, 'NEES', value) }} />
                    </div>
                </div>
                <HeaderDefault texto="SITUAÇÃO DO DESENVOLVIMENTO" type="h2" />
                <HeaderDefault texto={developeStatus.title} type="h3" />
                {
                    this.developeStatusTransposed.map(rowDiv => {
                        return <div className="row">
                            {
                                rowDiv.map((columnDiv) => {
                                    return <div className="col-sm-6 col-md-4">
                                        <TextField fullWidth value={this.register['caracter' + columnDiv.column + columnDiv.line] || ''} floatingLabelText={columnDiv.title} onChange={(evt, value) => { this.handleChange(evt, 'caracter' + columnDiv.column + columnDiv.line, value) }} />
                                    </div>
                                })
                            }
                        </div>
                    })

                }

                <HeaderDefault texto="DESENVOLVIMENTO" type="h2" />
                <div className="row">
                    <div className="col-md-6">
                        <TextField fullWidth value={this.register.actionExiting || ''} floatingLabelText="Ações já existentes" onChange={(evt, value) => { this.handleChange(evt, 'actionExiting', value) }} />
                    </div><div className="col-md-6">
                        <TextField fullWidth value={this.register.actionFuture || ''} floatingLabelText="Ações a serem desenvolvidas" onChange={(evt, value) => { this.handleChange(evt, 'actionFuture', value) }} />
                    </div>
                    {/* <div className="col-md-12 col-md-offset-3 text-area">
                    <Paper style={paperStyle} zDepth={5}>
                            <TinyMCE
                            content={this.register.text}
                            config={{
                                plugins: 'link paste autoresize',
                                toolbar: 'undo redo | bold italic | link | alignleft aligncenter alignright',
                                    autoresize_max_height: 1500,
                                    statusbar: false
                                }}
                                onChange={this.handleEditorChange}
                            />
                        </Paper>
                    </div> */}
                    <div className="col-md-12">
                        <button className="btn btn-primary">Cadastrar</button>
                        {/* btn Gerar .doc
                        btn Gerar Apresentações
                        btn Gerar pdf
                        btn Gerar Imprimir */}
                    </div>
                </div>
            </form>
        )
    }
}

/*
Data:

DADOS DE OUTROS CADASTROS
Escola
Aluno
idade
Data Nascimento
Matrícula
Matrícula
Ano/Série
Turno
Turma
Professores
Endereço
Contatos


Atividades Extra-Classes: 	
AEE:
Dias: 	
Turno:
Outras Informações: 

HISTORICO 	
Encaminhamento AEE: 	
Motivo Principal: 
Data:
Dinâmica Familiar: 
Histórico Escolar: 
Atendimento(especializados): 
NEES:

SITUAÇÃO DO DESENVOLVIMENTO:
*Anacronismos e Habilidades:
**Funções Cognitiva:
	
**Funções Interativas Sociais:
	
**Funções Motora:
-Memória (Curto/Longo Prazo): 
Relações Interpessoais: 
Dinâmica Geral - Controle das ações motoras: 
-Raciocínio Lógico: 
Relações Comportamentais: 
Execução e intencionalidade: 
-Linguagem:
Autonomia:
Flexibilidade, tonicidade, movimentos involuntários: 
-Atenção:
Relações Culturais:
Lateralidade e domínio de esquema corporal: 
-Percepção:
Auto-imagem, auto-estima: 
Equilíbrio estático e dinâmico: 
-Funções Executivas:
Resolução de conflitos: 
Compensações motoras:

------------
PROPOSIÇÕES
*PLANO DE INTERVENÇÃO PEDAGÓGICA
Ações já existentes: textarea
Ações a serem desenvolvidas: textarea

btn Gerar .doc
btn Gerar Apresentações
btn Gerar pdf
btn Gerar Imprimir

*/

import React, { PropTypes } from 'react'
import { TextField } from 'material-ui'
import { setDefaultValue } from '../../../../helpers/register-helper'
import TextFieldDefault from '../../../../components/TextFieldDefault';

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
    static PropTypes = {
        step: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        // this.handleSubmit = props.handleSubmit
        // this.handleCancel = props.handleCancel
        // this.handleChange = props.handleChange
        this.repetPassword = ''
        this.register = {}
        setDefaultValue(defaultValue, this.addRegister, this.getRegister)
    }

    handleChange = (event, id, valueParam) => {
        this.addRegister(handleChangeHelper(event, id, valueParam))
        this.forceUpdate();
        // //this.setState(...this.register)
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
            <div className="row">
                {/*             cep, bairro, concorda
                */}
                <div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.name || ''} name="name" type="text" floatingLabelText="Nome" onChange={(evt, val) => { this.handleChange(evt, 'name', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.lastName || ''} name="lastName" type="text" floatingLabelText="Sobrenome" onChange={(evt, val) => { this.handleChange(evt, 'lastName', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.cpf || ''} name="cpf" type="cpf" floatingLabelText="CPF" onChange={(evt, val) => { this.handleChange(evt, 'cpf', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.email || ''} name="email" type="email" floatingLabelText="E-mail" onChange={(evt, val) => { this.handleChange(evt, 'email', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.password || ''} name="password" type="password" floatingLabelText="Senha" onChange={(evt, val) => { this.handleChange(evt, 'password', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.repetPassword || ''} name="repetPassword" type="password" floatingLabelText="Repetir Senha" onChange={(evt, val) => { this.handleChange(evt, 'repet', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.mobile || ''} name="mobile" type="phone" floatingLabelText="Celular" onChange={(evt, val) => { this.handleChange(evt, 'mobile', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.phone || ''} name="phone" type="phone" floatingLabelText="Telefone" onChange={(evt, val) => { this.handleChange(evt, 'phone', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.address || ''} name="address" type="text" floatingLabelText="Endereço" onChange={(evt, val) => { this.handleChange(evt, 'address', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.addressNumber || ''} name="addressNumber" type="text" floatingLabelText="Número" onChange={(evt, val) => { this.handleChange(evt, 'addressNumber', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.addressComplemento || ''} name="addressComplemento" type="text" floatingLabelText="Complemento" onChange={(evt, val) => { this.handleChange(evt, 'addressComplemento', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.city || ''} name="city" type="text" floatingLabelText="Cidade" onChange={(evt, val) => { this.handleChange(evt, 'city', val) }} />
                </div><div className="col-md-6">
                    <TextFieldDefault  fullWidth value={this.register.state || ''} name="state" type="text" floatingLabelText="Estado" onChange={(evt, val) => { this.handleChange(evt, 'state', val) }} />
                </div>
                <div className="col-md-12">
                    <button className="btn btn-secudary" onClick={this.handleCancel}>Cancelar</button>
                    <button className="btn btn-primary">Cadastrar</button>
                </div>
            </div>
            }
            </form>
        )
    }
} 

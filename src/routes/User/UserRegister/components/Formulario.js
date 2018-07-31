import React, { PropTypes } from 'react'
import { RaisedButton, TextField } from 'material-ui'

export default class RegisterForm extends React.Component {
    static PropTypes = {
        step: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.handleSubmit = props.handleSubmit
        this.handleCancel = props.handleCancel
        this.handleChange = props.handleChange
        this.repetPassword = ''
        this.register = {}
        this.defalutValue()
    }

    handleChange = (evt, key, value) => {
        if (key === 'repet') {

        } else {
            this.props.handleChange()
        }
    }

    defalutValue = () => {
        this.register.city = 'Porto Alegre'
        this.register.state = 'Rio Grande do Sul'
    }

    render() {
        if (!this.register.name) {
            this.register = { ...this.props.student }
        }
        return (
            <div className="row">
                {/*             cep, bairro, concorda
                */}
                <div className="col-md-6">
                    <TextField fullWidth value={this.register.name || ''} type="text" floatingLabelText="Nome" onChange={(evt, val) => { this.handleChange('name', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.lastName || ''} type="text" floatingLabelText="Sobrenome" onChange={(evt, val) => { this.handleChange('lastName', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.cpf || ''} type="cpf" floatingLabelText="CPF" onChange={(evt, val) => { this.handleChange('cpf', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.email || ''} type="email" floatingLabelText="E-mail" onChange={(evt, val) => { this.handleChange('email', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.password || ''} type="password" floatingLabelText="Senha" onChange={(evt, val) => { this.handleChange('password', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.repetPassword || ''} type="password" floatingLabelText="Repetir Senha" onChange={(evt, val) => { this.handleChange('repet', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.mobile || ''} type="mobile" floatingLabelText="Celular" onChange={(evt, val) => { this.handleChange('mobile', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.phone || ''} type="phone" floatingLabelText="Telefone" onChange={(evt, val) => { this.handleChange('phone', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.address || ''} type="text" floatingLabelText="Endereço" onChange={(evt, val) => { this.handleChange('address', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.addressNumber || ''} type="text" floatingLabelText="Número" onChange={(evt, val) => { this.handleChange('addressNumber', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.addressComplemento || ''} type="text" floatingLabelText="Complemento" onChange={(evt, val) => { this.handleChange('addressComplemento', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.city || ''} type="text" floatingLabelText="Cidade" onChange={(evt, val) => { this.handleChange('city', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.register.state || ''} type="text" floatingLabelText="Estado" onChange={(evt, val) => { this.handleChange('state', val) }} />
                </div>
                <div className="col-md-12">
                    <RaisedButton className="btn-action" label="Cancelar" onClick={this.handleCancel} />
                    <RaisedButton className="btn-action" label="Cadastrar" primary onClick={this.handleSubmit} />
                </div>
            </div>
        )
    }
} 

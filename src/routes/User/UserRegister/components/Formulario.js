import React from 'react'


class Formulario extends React.Components {
    constructor(props) {
        super(props)
        this.handleSubmit = props.handleSubmit
        this.handleCancel = props.handleCancel
        this.handleChange = props.handleChange
        this.repetPassword = ''
    }

    handleChange = (evt, key, value) => {
        if (key === 'repet') {
            
        } else {
            this.props.handleChange()
        }
    }

    render() {
        <div className="row">
{/* 
                cep
                bairro
                concorda
                */}
            <div className="col-md-12">
                <div className="col-md-6">
                    <TextField fullWidth value={this.state.user.name || ''} type="text" floatingLabelText="Nome"
                        onChange={(evt, val) => { this.handleChange('name', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.lastName || ''} type="text" floatingLabelText="Sobrenome"
                        onChange={(evt, val) => { this.handleChange('lastName', val) }} />
                </div><div className="col-md-6">
                <TextField fullWidth value={this.state.user.email || ''} type="cpf" floatingLabelText="CPF"
                    onChange={(evt, val) => { this.handleChange('cpf', val) }} />
                </div><div className="col-md-6">
                <TextField fullWidth value={this.state.user.email || ''} type="email" floatingLabelText="E-mail"
                    onChange={(evt, val) => { this.handleChange('email', val) }} />
                </div><div className="col-md-6">
                <TextField fullWidth value={this.state.user.password || ''} type="password" floatingLabelText="Senha"
                    onChange={(evt, val) => { this.handleChange('password', val) }} />
                    </div><div className="col-md-6">
                    <TextField fullWidth value={this.repetPassword || ''} type="password" floatingLabelText="Repetir Senha"
                        onChange={(evt, val) => { this.handleChange('repet', val) }} />
                </div><div className="col-md-6">
                <TextField fullWidth value={this.state.user.phone || ''} type="phone" floatingLabelText="Celular"
                    onChange={(evt, val) => { this.handleChange('mobile', val) }} />
                    </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.phone || ''} type="phone" floatingLabelText="Telefone"
                        onChange={(evt, val) => { this.handleChange('phone', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.address || ''} type="text" floatingLabelText="Endereço"
                        onChange={(evt, val) => { this.handleChange('address', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.address || ''} type="text" floatingLabelText="Número"
                        onChange={(evt, val) => { this.handleChange('addressNumber', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.address || ''} type="text" floatingLabelText="Complemento"
                        onChange={(evt, val) => { this.handleChange('addressComplemento', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.address || ''} type="text" floatingLabelText="Cidade"
                        onChange={(evt, val) => { this.handleChange('city', val) }} />
                </div><div className="col-md-6">
                    <TextField fullWidth value={this.state.user.address || ''} type="text" floatingLabelText="Estado"
                        onChange={(evt, val) => { this.handleChange('state', val) }} />
                </div>
            </div>
            <div className="col-md-12">
                <RaisedButton className="btn-action" label="Cancelar" onClick={this.handleCancel} />
                <RaisedButton className="btn-action" label="Cadastrar" primary onClick={this.handleSubmit} />
            </div>
        </div>
    }
}

import React, { PropTypes } from 'react'
import { TextField } from 'material-ui'
import { handleChange } from '../../../../helpers/register-helper'

export default class RegisterForm extends React.Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    school: PropTypes.object
  }

  register = {}

  constructor(props) {
    super(props);
    this.state = {}
    this.openTermOfUse = false;
    this.isInitialState = true;

    this.handleChange = handleChange
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    this.setState(...this.register)
    // console.log('handleSubmit')
    // console.log(this.register)
    // console.log(this.state)
    this.props.handleSubmit(this.register);
  }

  render() {
    if (!this.register.name) {
      this.register = { ...this.props.school }
    }
    
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.step === 0 &&
          <div className="row">
            <div className="col-md-12">
              <TextField fullWidth value={this.register.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome:" required />
            </div><div className="col-md-6">
              {/* <TextField fullWidth value={this.register.name || ''} type="number" name="mapLocation" onChange={this.handleChange} floatingLabelText="Nome:" required />
            </div><div className="col-md-6"> */}
              <TextField fullWidth value={this.register.adress || ''} type="text" name="adress" onChange={this.handleChange} floatingLabelText="Endereço:" />
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.adressNum || ''} type="text" name="adressNum" onChange={this.handleChange} floatingLabelText="Número:" required />
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.district || ''} type="text" name="district" onChange={this.handleChange} floatingLabelText="Bairro:" required />
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.city || ''} type="text" name="city" onChange={this.handleChange} floatingLabelText="Cidade:" required />
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.state || ''} type="text" name="state" onChange={this.handleChange} floatingLabelText="Estado:" required />
            {/* </div><div className="col-md-6">
              <TextField fullWidth value={this.register.country || ''} type="text" name="country" onChange={this.handleChange} floatingLabelText="País:" required /> */}
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.phone || ''} type="text" name="phone" onChange={this.handleChange} floatingLabelText="Telefone:" />
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.email || ''} type="text" name="email" onChange={this.handleChange} floatingLabelText="E-mail:" />
            </div><div className="col-md-6">
              <TextField fullWidth value={this.register.principal || ''} type="text" name="principal" onChange={this.handleChange} floatingLabelText="Diretor:" />
            </div>
          </div>
        }
      </form>
    )
  }
}

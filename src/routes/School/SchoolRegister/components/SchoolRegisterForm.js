import React, { PropTypes } from 'react'
import { TextField, RaisedButton, withStyles } from 'material-ui'
//import { withStyles } from '@material-ui/core/style';
import { handleChangeHelper } from '../../../../helpers/register-helper'

export default class RegisterForm extends React.Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    school: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {}
    this.openTermOfUse = false;
    this.isInitialState = true;
    this.register = {}
    this.defaultValue()

    this.classes = theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
      }
    })
  }

  handleChange = (event, id, valueParam) => {
    //console.log(event)
    this.addRegister(handleChangeHelper(event, id, valueParam))
    this.forceUpdate()
  }

  addRegister = (entry, key = '', content = '') => {
    if (entry.lenth <= 0) { 
        entry = {[key]: content}
    }
    this.register = {
        ...this.register,
        ...entry
    }
  }

  defaultValue = () => {
      if (!this.register.country) {
        this.register.city = 'Porto Alegre'
        this.register.state = 'Rio Grande do Sul'
        this.register.country = 'Brasil'
      }
  }
  handleSubmit = (evt) => {
    evt.preventDefault()
    
    //this.setState(...this.register)
    this.props.handleSubmit(this.register);
  }

  render() {
    if (!this.register.name) {
      this.register = { ...this.register, ...this.props.school }
    }
    
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.step === 0 &&
          <div className="row">
            <div className="col-md-12">
              <TextField fullWidth className={this.classes.textField} value={this.register.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome:" required />
            </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.phone || ''} type="text" name="phone" onChange={this.handleChange} floatingLabelText="Telefone:" />
            </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.email || ''} type="text" name="email" onChange={this.handleChange} floatingLabelText="E-mail:" />
            </div><div className="col-md-6">
              {/* <TextField fullWidth className={this.classes.textField} value={this.register.name || ''} type="number" name="mapLocation" onChange={this.handleChange} floatingLabelText="Nome:" required />
            </div><div className="col-md-6"> */}
              <TextField fullWidth className={this.classes.textField} value={this.register.adress || ''} type="text" name="adress" onChange={this.handleChange} floatingLabelText="Endereço:" />
            </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.adress2 || ''} type="text" name="adress2" onChange={this.handleChange} floatingLabelText="Número:" />
            </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.district || ''} type="text" name="district" onChange={this.handleChange} floatingLabelText="Bairro:" />
            </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.city || ''} type="text" name="city" onChange={this.handleChange} floatingLabelText="Cidade:" />
            </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.state || ''} type="text" name="state" onChange={this.handleChange} floatingLabelText="Estado:" />
            {/* </div><div className="col-md-6">
              <TextField fullWidth className={this.classes.textField} value={this.register.country || ''} type="text" name="country" onChange={this.handleChange} floatingLabelText="País:" /> */}
            </div>
            <div className="col-md-12">
              <RaisedButton color="primary" type="submit" label="Cadastrar" />
            </div>
          </div>
        }
      </form>
    )
  }
}
// name: { type: String, required: true },
//   mapLocation: { type: [Number], index: '2d' },
//   zipcode: { type: Number },
//   adress: { type: String },
//   adress2: { type: String },
//   district: { type: String },
//   city: { type: String },
//   state: { type: String },
//   country: { type: String },
//   phone: { tupe: String },
//   email: { tupe: String },
//   _dateCreate: { type: Date },
//   _dateModifi: { type: Date },
//   _createdBy: { type: String, ref: 'User' }

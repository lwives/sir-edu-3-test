import React, { PropTypes } from 'react'
import { TextField } from 'material-ui' //RaisedButton, SelectField, MenuItem, TextField, Button, 
// import { specialNeeds } from '../../../../constants/necessidadesEspeciais'
import { handleChange } from '../../../../helpers/register-helper'

export default class RegisterForm extends React.Component {
    static propTypes = {
        step: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        school: PropTypes.object
    }

    schoolTemporario = {}

    constructor(props) {
        super(props);
        this.state = {}
        this.openTermOfUse = false;
        this.isInitialState = true;
    }

    onImageDrop = (field, file) => {
        this.addSchoolTemporario(field, file)
    }

    // handleChange = (event, id, valueParam) => {
    //     let name = '';
    //     let value = null;

    //     if (event) {
    //         name = event.target.name;
    //         value = event.target.value;
    //     } else {
    //         name = id;
    //         value = valueParam;
    //     }
    //     this.addSchoolTemporario(name, value)
    //     this.forceUpdate()
    // }

    handleSubmit = (evt) => {
        evt.preventDefault()

        this.setState(...this.schoolTemporario)
        // console.log('handleSubmit')
        // console.log(this.schoolTemporario)
        // console.log(this.state)
        this.props.handleSubmit(this.schoolTemporario);
    }

    addSchoolTemporario = (key, content) => {
        this.schoolTemporario = {
            ...this.schoolTemporario,
            [key]: content
        }
    }

    render() {
        if (!this.schoolTemporario.name) {
            // this.schoolTemporario = { ...this.props.school }
            // if (!this.schoolTemporario.city) {
            //     this.schoolTemporario.city = 'Porto Alegre'
            // }
            // if (!this.schoolTemporario.state) {
            //     this.schoolTemporario.state = 'Rio Grande do Sul'
            // }
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.step === 0 &&
                    <div className="row">
                        <div className="col-md-12">
                            <TextField fullWidth value={this.schoolTemporario.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome:" required />
                        </div><div className="col-md-6">
                            <TextField fullWidth value={this.schoolTemporario.adress || ''} type="text" name="adress" onChange={this.handleChange} floatingLabelText="Endereço:" />
                        </div><div className="col-md-6">
                            <TextField fullWidth value={this.schoolTemporario.phone || ''} type="text" name="phone" onChange={this.handleChange} floatingLabelText="Telefone:" />
                        </div><div className="col-md-6">
                            <TextField fullWidth value={this.schoolTemporario.director || ''} type="text" name="director" onChange={this.handleChange} floatingLabelText="Diretor:" />
                        </div><div className="col-md-6">
                            <TextField fullWidth value={this.schoolTemporario.vicedirector || ''} type="text" name="vicedirector" onChange={this.handleChange} floatingLabelText="Vice-diretor:" />
                        </div>
                        

                    </div>
                }
            </form>
        )
    }
}

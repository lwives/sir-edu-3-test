import React, {PropTypes} from 'react'
import { DatePicker, Checkbox, RaisedButton, TextField } from 'material-ui' //RaisedButton, SelectField, MenuItem, TextField, Button, 
import Dropzone from 'components/Dropzone'
import MultipleCheckboxes from './MultipleCheckboxes'
import TermOfUse from './TermOfUse'
//import TextFieldDefault from '../../../../components/TextFieldDefault'
import { specialNeeds } from '../../../../constants/necessidadesEspeciais'

export default class RegisterForm extends React.Component {
    static propTypes = {
        step : PropTypes.any,
        handleSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxGroup = this.handleCheckboxGroup.bind(this);
        this.showTermOfUse = this.showTermOfUse.bind(this);
        this.openTermOfUse = false;

        //const specialNeeds = specialNeeds
    }

    onImageDrop(field, file) {
        this.setState({ [field]: file });
    }

    handleChange(event, id, valueParam) {
        let name = '';
        let value = null;

        if (event) {
            name = event.target.name;
            value = event.target.value;
        } else {
            name = id;
            value = valueParam;
        }

        this.setState({ [name]: value });
    }

    handleCheckbox = (event, value) => {
        this.setState({ [event.target.name]: value });
    }

    handleSelectChange = (event, index, values, stateProp) => {
        this.setState({ [stateProp]: values });
    }

    handleCheckboxGroup(value) {
        let newSelectionArray;

        if (this.state.specialNeeds && this.state.specialNeeds.indexOf(value) > -1) {
            newSelectionArray = this.state.specialNeeds.filter(s => s !== value)
        } else {
            newSelectionArray = [...this.state.specialNeeds || '', value];
        }

        this.setState({ specialNeeds: newSelectionArray });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.handleSubmit(this.state);
    }

    showTermOfUse() {
        this.openTermOfUse = true;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}> 
                {this.props.step === 0 &&
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <label>Imagem do aluno:</label>
                                <span className="text-center">
                                <Dropzone
                                    multiple={false}
                                    accept={'image/*'}
                                    name="avatar"
                                    onDrop={this.onImageDrop}
                                    initConfig={this.state.avatar}
                                    text={'Arraste e solte uma imagem ou clique no botão para selecionar um arquivo'} />
                            </span> 
                        </div>
                        <div className="col-md-6">
                            <TextField fullWidth value={this.state.name || ''} type="text" name="name" onChange={this.handleChange} floatingLabelText="Nome:" />
                            <TextField className="col-md-6" fullWidth value={this.state.registration || ''} type="number" name="registration" onChange={this.handleChange}  floatingLabelText="Matrícula:" />
                            <TextField className="col-md-6" fullWidth value={this.state.classNumber || ''} type="number" name="classNumber" onChange={this.handleChange} floatingLabelText="Turma:" />
                            <TextField className="col-md-6" fullWidth value={this.state.shift || ''} type="text" name="shift" onChange={this.handleChange} floatingLabelText="Turno:" />
                            <TextField className="col-md-6" fullWidth value={this.state.series || ''} type="text" name="series" onChange={this.handleChange} floatingLabelText="Ano/Série:" />
                            <DatePicker className="col-md-6" fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br"value={this.state.birthdate || {}} name="birthdate" onChange={(evt, value) => { this.handleChange(evt, 'birthdate', value) }} floatingLabelText="Data Nascimento:" />
                            <TextField className="col-md-6" fullWidth value={this.state.motherName || ''} type="text" name="motherName" onChange={this.handleChange} floatingLabelText="Nome da Mãe:" />
                        </div>
                        <div className="col-md-6">
                        <TextField className="col-md-6" fullWidth value={this.state.relationship || ''} type="text" name="relationship" onChange={this.handleChange} floatingLabelText="Parentesco:" />
                            <TextField className="col-md-6" fullWidth value={this.state.phoneNumber || ''} type="number" name="phoneNumber" onChange={this.handleChange} floatingLabelText="Telefone:" />
                            <TextField className="col-md-6" fullWidth value={this.state.adress || ''} type="text" name="adress" onChange={this.handleChange} floatingLabelText="Endereço:" />
                            <TextField className="col-md-6" fullWidth value={this.state.cid || ''} type="text" name="cid" onChange={this.handleChange} floatingLabelText="CID:" />
                            <TextField className="col-md-6" fullWidth name="school" value={this.state.school || ''} type="text" onChange={this.handleChange} floatingLabelText="Escola:" />
                            <TextField className="col-md-6" fullWidth value={this.state.fatherName || ''} type="text" name="fatherName" onChange={this.handleChange} floatingLabelText="Nome da Pai:" />
                            <TextField className="col-md-6" fullWidth value={this.state.responsible || ''} type="text" name="responsible" onChange={this.handleChange} floatingLabelText="Responsável:" />
                        </div>
                    </div>
                }
                {this.props.step === 1 &&
                    <div className="col-md-12">
                        <TextField  fullWidth value={this.state.professorNEE || ''} type="text" name="professorNEE" onChange={this.handleChange} floatingLabelText="Professor NEE:" />
                        <TextField  fullWidth value={this.state.orientation || ''} type="text" name="orientation" onChange={this.handleChange} floatingLabelText="Orientação Educacional:" />
                        <TextField  fullWidth value={this.state.coordination || ''} type="text" name="coordination" onChange={this.handleChange} floatingLabelText="Coordenação Pedagógica:" />
                        <DatePicker fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.state.routingDate || {}} name="routingDate" onChange={(evt, value) => { this.handleChange(evt, 'routingDate', value) }} floatingLabelText="Data de encaminhamento a AEE/SIR:" />
                        <TextField fullWidth multiLine value={this.state.routingReason || ''} type="text" name="routingReason" onChange={this.handleChange} floatingLabelText="Motivo do encaminhamento" /> 
                    </div>
                }
                {this.props.step === 2 &&
                    <div className="col-md-12">
                        <MultipleCheckboxes specialNeeds={specialNeeds} values={this.state.specialNeeds || []} handleCheckboxGroup={this.handleCheckboxGroup} />
                        <TextField  fullWidth value={this.state.otherSpecialNeeds || ''} type="text" name="otherSpecialNeeds" onChange={this.handleChange} floatingLabelText="Outras necessidades especiais:" />
                    </div>
                }
                {this.props.step === 3 &&
                    <div className="col-md-12">
                        <div>
                            <label>Inserir documento com aprovação dos pais:</label>
                            <span className="text-center">
                                <Dropzone
                                    multiple={false}
                                    name="docParentsAproval"
                                    onDrop={this.onImageDrop}
                                    initConfig={this.state.docParentsAproval}
                                    text={'Arraste e solte um documento ou clique no botão para selecionar um arquivo'} />
                            </span>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Checkbox style={{ width: 290, float: 'left', marginTop: 5 }}
                                label="Você concorda com o termo de uso?" name="termOfUse"
                                checked={this.state.termOfUse || false}
                                onCheck={this.handleCheckbox}
                            />
                            <TermOfUse />
                            <RaisedButton color="primary" type="submit" label="Cadastrar" />
                        </div>
                    </div>
                }
                <div className="col-md-12">
                    <input className="hidden" type="submit" />
                </div>
            </form>
        )
    }
}

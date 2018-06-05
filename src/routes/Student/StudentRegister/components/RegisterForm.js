import React, {PropTypes} from 'react'
import { DatePicker, Checkbox, RaisedButton, TextField } from 'material-ui' //RaisedButton, SelectField, MenuItem, TextField, Button, 
import Dropzone from 'components/Dropzone'
import MultipleCheckboxes from './MultipleCheckboxes'
import TermOfUse from './TermOfUse'
import TextFieldDefault from '../../../../components/TextFieldDefault'
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
            <form onSubmit={''}> 
            {/* this.handleSubmit}> */}
                {this.props.step === 0 &&
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <label>Imagem do aluno:</label>
                            {/* <span className="text-center">
                                <Dropzone
                                    multiple={false}
                                    accept={'image/*'}
                                    name="avatar"
                                    onDrop={this.onImageDrop}
                                    initConfig={this.state.avatar}
                                    text={'Arraste e solte uma imagem ou clique no botão para selecionar um arquivo'} />
                            </span> */}
                        </div>
                        <div className="col-md-6">
                            <TextField fullWidth value={this.state.name || ''} type="text" name="nome2" floatingLabelText={'NOME: '} />
                            {/* <TextFieldDefault value={this.state.name} name={'Nome'} onChange={this.handleChange} />
                            <TextFieldDefault value={this.state.registration} type="number" name={'Matrícula'} onChange={this.handleChange} />
                            <TextFieldDefault value={this.state.className} type="number" name={'Turma'} onChange={this.handleChange} />
                            <TextFieldDefault value={this.state.shift} name={'Turno'} onChange={this.handleChange} />
                            <TextFieldDefault value={this.state.series} name={'Ano/Série'} onChange={this.handleChange} />
                            <DatePicker className="col-md-6" fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.state.birthdate || {}} name="birthdate" onChange={(evt, value) => { this.handleChange(evt, 'birthdate', value) }} floatingLabelText="Data Nascimento:" />
                            <TextFieldDefault value={this.state.motherName} name={'Nome da Mãe'} onChange={this.handleChange} /> */}
                        </div>
                        <div className="col-md-6">
                            {/* <TextFieldDefault onChange={this.handleChange} value={this.state.relationship} name="Parentesco" />
                            <TextFieldDefault onChange={this.handleChange} value={this.state.phoneNumber} name="Telefone" type="phone" />
                            <TextFieldDefault onChange={this.handleChange} value={this.state.adress} name="Endereço" />
                            <TextFieldDefault onChange={this.handleChange} value={this.state.cid} name="CID" />
                            <TextFieldDefault onChange={this.handleChange} value={this.state.school} name="Escola" />
                            <TextFieldDefault onChange={this.handleChange} value={this.state.fatherName} name="Nome da Pai" />
                            <TextFieldDefault onChange={this.handleChange} value={this.state.responsible} name="Responsável" /> */}
                        </div>
                    </div>
                }
                {this.props.step === 1 &&
                    <div className="col-md-12">
                        {/* <TextFieldDefault onChange={this.handleChange} value={this.state.professorNEE} name={'Professor NEE'} />
                        <TextFieldDefault onChange={this.handleChange} value={this.state.orientation} name={'Orientação Educacional'} />
                        <TextFieldDefault onChange={this.handleChange} value={this.state.coordination} name={'Coordenação Pedagógica'} />
                        <DatePicker fullWidth DateTimeFormat={Intl.DateTimeFormat} locale="pt-br" value={this.state.routingDate || {}} name="routingDate" onChange={(evt, value) => { this.handleChange(evt, 'routingDate', value) }} floatingLabelText="Data de encaminhamento a AEE/SIR:" />
                        <TextFieldDefault onChange={this.handleChange} value={this.state.routingReason} name={'Motivo do encaminhamento'} multiLine /> */}
                    </div>
                }
                {this.props.step === 2 &&
                    <div className="col-md-12">
                        {/* <MultipleCheckboxes specialNeeds={specialNeeds} values={this.state.specialNeeds || []} handleCheckboxGroup={this.handleCheckboxGroup} />
                        <TextFieldDefault onChange={this.handleChange} value={this.state.otherSpecialNeeds} name={'Outras necessidades especiais'} /> */}
                    </div>
                }
                {this.props.step === 3 &&
                    <div className="col-md-12">
                        {/* <div>
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
                        </div> */}
                    </div>
                }
                <div className="col-md-12">
                    <input className="hidden" type="submit" />
                </div>
            </form>
        )
    }
}

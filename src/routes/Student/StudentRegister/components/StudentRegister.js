import React, { PropTypes } from 'react'
import './StudentRegister.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
// import { DatePicker, Checkbox, RaisedButton, TextField } from 'material-ui' //RaisedButton, SelectField, MenuItem, TextField, Button, 
// import Dropzone from 'components/Dropzone'
// import MultipleCheckboxes from './MultipleCheckboxes'
// import TermOfUse from './TermOfUse'
// import { specialNeeds } from '../../../../constants/necessidadesEspeciais'
import RegisterForm from './RegisterForm';

export default class StudentRegister extends React.Component {
  static propTypes = {
    saveStudent: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired,
    students: PropTypes.object
    // id: PropTypes.string,
    // modo: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }

    this.openTermOfUse = false;
    // console.log('Id: ' + props.params.id)
    // console.log('modo: ' + props.params.modo)
    this.isInitialState = true

    this.tabs = [
      { name: 'Preencha os dados do aluno' },
      { name: 'Atividades Extraclasse' },
      { name: 'Necessidades Educacionais Especiais' },
      { name: 'Finalizar' }]

    this.data = {
      tabs: this.tabs,
      setStepIndex: this.handleSetStepindex,
      handleSubmit: this.handleSubmit,
      handleNext: this.handleNext,
      handlePrev: this.handlePrev,
      step: this.state.stepIndex
    }

    // if (this.props.params.modo === 'editar') {
    //   this.props.getStudent(this.props.params.id)
    // }
  }

  handleSetStepindex = (newState) => {
    this.setState({ stepIndex: newState })
  }

  handleSubmit = (form) => {
    console.log('enviando form', form)
    this.props.saveStudent(form)
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (stepIndex < 3) {
      this.setState({ stepIndex: stepIndex + 1 })
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  componentDidMount() {
    const { getStudent, students } = this.props
    
    if (!students.student.name && ( 
      this.props.params.modo === 'editar' || this.props.params.modo === 'excluir')) { 
      getStudent(this.props.params.id)
    }
    //this.setState(this.props.students.student)
  }

  render() {
    this.data = {
      ...this.data,
      step: this.state.stepIndex
    }
    
    return (
      <RegisterLayout titulo="Cadastro de Aluno" {...this.data}>
        <div className="register-form">
          <RegisterForm {...this.props.students} {...this.data} />
          {/* step={this.data.step}  */}
        </div>
      </RegisterLayout>
    )
  }
}

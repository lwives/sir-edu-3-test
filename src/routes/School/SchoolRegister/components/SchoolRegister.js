import React, { PropTypes } from 'react'
import './SchoolRegister.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import RegisterForm from './SchoolRegisterForm';
// import { handleNext, handlePrev } from '../../../../helpers/register-helper'

export default class SchoolRegister extends React.Component {
  static propTypes = {
    insertSchool: PropTypes.func.isRequired,
    editSchool: PropTypes.func.isRequired,
    deleteSchool: PropTypes.func.isRequired,
    getSchool: PropTypes.func.isRequired,
    schools: PropTypes.object
    // id: PropTypes.string,
    // modo: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }
    this.isInitialState = true

    this.tabs = [
      { name: 'Dados da Escola' }]

    this.data = {
      tabs: this.tabs,
      setStepIndex: this.handleSetStepindex,
      handleSubmit: this.handleSubmit,
      handleNext: this.handleNext,
      handlePrev: this.handlePrev,
      step: this.state.stepIndex
    }
  }

  handleSetStepindex = (newState) => {
    this.setState({ stepIndex: newState })
  }

  handleNext = (data) => {
    const { stepIndex } = this.state
    if (data.step < data.tabs.length) {
      this.setState({ stepIndex: stepIndex + 1 })
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  handleSubmit = (form) => {
    switch (this.props.params.modo) {
      case 'editar':
        this.props.editSchool(form)
        break
      case 'excluir':
        this.props.deleteSchool(form)
        break
      case 'inserir':
        this.props.insertSchool(form)
        break
      default:
    }
  }

  componentDidMount() {
    const { getSchool, schools } = this.props

    if (!schools.school && !schools.school.name && (
      this.props.params.modo === 'editar' || this.props.params.modo === 'excluir')) {
      getSchool(this.props.params.id)
    }
  }

  render() {
    this.data = {
      ...this.data,
      step: this.state.stepIndex
    }

    return (
      <RegisterLayout titulo="Cadastro de Escola" {...this.data}>
        <div className="row register-form">
          <RegisterForm {...this.props.schools} {...this.data} />
        </div>
      </RegisterLayout>
    )
  }
}

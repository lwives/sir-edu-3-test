import React, { PropTypes } from 'react'
import './SchoolRegister.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import RegisterForm from './SchoolRegisterForm';
import { handleNext, handlePrev } from '../../../../helpers/register-helper'

export default class SchoolRegister extends React.Component {
  static propTypes = {
    // saveSchool: PropTypes.func.isRequired,
    // getSchool: PropTypes.func.isRequired,
     schools: PropTypes.object
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

  handleSubmit = (form) => {
    // console.log('enviando form', form)
    this.props.saveSchool(form)
  }

//   export const handleNext = (data) => {
//     if (data.step < data.tabs.length) {
//         this.setState({ stepIndex: stepIndex + 1 })
//     }
// }

// export const handlePrev = () => {
//     const { stepIndex } = this.state
//     if (stepIndex > 0) {
//         this.setState({ stepIndex: stepIndex - 1 })
//     }
// }

  componentDidMount() {
    // const { getSchool, schools } = this.props
    
    // if (schools && schools.school && !schools.school.name && ( 
    //   this.props.params.modo === 'editar' || this.props.params.modo === 'excluir')) { 
    //   getSchool(this.props.params.id)
    // }
    // this.setState(this.props.Schools.School)
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
          {/* step={this.data.step}  */}
        </div>
      </RegisterLayout>
    )
  }
}

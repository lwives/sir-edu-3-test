import React, { PropTypes } from 'react'
import RegisterForm from './RegisterForm'
import './StudentRegister.scss'
import RegisterStepper from '../../../../components/RegisterStepper'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import StepperPagination from '../../../../components/StepperPagination'

export default class StudentRegister extends React.Component {
  static propTypes = {
    saveStudent: PropTypes.func.isRequired
    // id: PropTypes.string,
    // modo: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log('Id: ' + props.params.id)
    console.log('modo: ' + props.params.modo)

    this.tabs = [
      { name: 'Preencha os dados do aluno' },
      { name: 'Atividades Extraclasse' },
      { name: 'Necessidades Educacionais Especiais' },
      { name: 'Finalizar' }]
  }

  handleSetStepindex = (newState) => {
    this.setState({ stepIndex: newState })
  }

  handleSubmit(form) {
    console.log('enviando form', form)
    this.props.saveStudent(form)
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (stepIndex < 3) {
      this.setState({ stepIndex: stepIndex + 1 })
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  };

  render() {
    const { stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }

    const data = {
      step: stepIndex,
      tabs: this.tabs,
      setStepIndex: this.handleSetStepindex,
      handleSubmit: this.handleSubmit,
      handleNext: this.handleNext,
      handlePrev: this.handlePrev
    }

    return (
      <RegisterLayout titulo="Cadastro de Aluno">
        <div>

          <RegisterStepper {...data} />

          <div style={contentStyle} className="register-form">
            <RegisterForm {...data} />
          </div>

          <div className="text-center">
            <StepperPagination {...data} />
          </div>
          
        </div>
      </RegisterLayout>
    )
  }
}

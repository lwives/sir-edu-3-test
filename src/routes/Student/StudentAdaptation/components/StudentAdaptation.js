import React, { PropTypes } from 'react'
import './StudentAdaptation.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import RegisterForm from './RegisterForm';

export default class StudentAdaptation extends React.Component {
  static propTypes = {
    students: PropTypes.array,
    params: PropTypes.shape({
      id: PropTypes.string,
      modo: PropTypes.string
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0
    }

    this.openTermOfUse = false;
    this.isInitialState = true

    this.tabs = []

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
    switch (this.props.params.modo) {
      case 'editar':
        this.props.editAdaptation(form)
        break
      case 'excluir':
        this.props.deleteAdaptation(form)
        break
      case 'inserir':
      default:
        this.props.insertAdaptation(form)
        break
    }
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
    //   const { getStudent, students } = this.props
    const { getFiles, getJudgements, routeParams } = this.props;

    // getFiles(routeParams.id);
    // getJudgements(routeParams.id);
    //   if (!students.student.name && ( 
    //     this.props.params.modo === 'editar' || this.props.params.modo === 'excluir')) { 
    //     getStudent(this.props.params.id)
    //   }
  }

  render() {
    // this.data = {
    //   ...this.data,
    //   step: this.state.stepIndex
    // }
    console.log(this.props);
    
    return (
      <RegisterLayout titulo="Adequação Curricular" {...this.data}>
        <div className="row register-form">
          <RegisterForm  {...this.data} {...this.props.students} />
        </div>
      </RegisterLayout>
    )
  }
}

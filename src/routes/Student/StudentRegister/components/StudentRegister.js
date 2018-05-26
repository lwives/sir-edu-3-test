import React, {PropTypes} from 'react'
import RegisterForm from './RegisterForm'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import './StudentRegister.scss'
import RegisterStepper from '../../../../components/RegisterStepper'

export default class StudentRegister extends React.Component {
    static propTypes = {
        saveStudent : PropTypes.func.isRequired
        // id: PropTypes.string,
        // modo: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            stepIndex: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log('Id: ' + this.props.params.id)
        console.log('modo: ' + this.props.params.modo)

        this.tabs = [
          {name: 'Preencha os dados do aluno'}, 
          {name: 'Atividades Extraclasse'}, 
          {name: 'Necessidades Educacionais Especiais'}, 
          {name: 'Finalizar'} ]
    }
    
    handleSubmit(form) {
        console.log('enviando form', form)
        this.props.saveStudent(form)
    }

    handleNext = () => {
        const {stepIndex} = this.state
        if (stepIndex < 3) {
            this.setState({stepIndex: stepIndex + 1})
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1})
        }
    };

    render() {
        const { stepIndex } = this.state
        const contentStyle = {margin: '0 16px'}

        return (
          <div className="container register-student">
            <div className="col-md-12">
              <h1 className="text-center">Cadastro de Aluno</h1>
              <RegisterStepper tabs={this.tabs} stepIndex={stepIndex} /> 

              <div style={contentStyle}>
                <div className="register-student-form col-md-12">
                  <RegisterForm step={stepIndex} handleSubmit={this.handleSubmit} />
                </div>

                <div className="col-md-12 text-center">
                  <div className="stepper-pagination">
                    <FlatButton
                      label="Voltar"
                      disabled={stepIndex === 0}
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      label="Próximo"
                      disabled={stepIndex === 3}
                      primary={1}
                      onTouchTap={this.handleNext}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}


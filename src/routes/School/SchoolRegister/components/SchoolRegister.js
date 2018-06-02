import React, { PropTypes } from 'react'
// import RegisterForm from './RegisterForm'
// import RaisedButton from 'material-ui/RaisedButton'
// import FlatButton from 'material-ui/FlatButton'
import './SchoolRegister.scss'
// import RegisterStepper from '../../../../components/RegisterStepper'
// import HeaderDefault from '../../../../components/HeaderDefault'
import RegisterLayout from '../../../../layouts/RegisterLayout'

export default class StudentRegister extends React.Component {
    static propTypes = {
        //saveStudent: PropTypes.func.isRequired
        // id: PropTypes.string,
        // modo: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            stepIndex: 0
        }
        //this.handleSubmit = this.handleSubmit.bind(this)
        console.log('Id: ' + props.params.id)
        console.log('modo: ' + props.params.modo)
    }

    render() {
        return (
            <RegisterLayout titulo="Cadastro De Escolas">
                <div>teste</div>
            </RegisterLayout>
        )
    }
}

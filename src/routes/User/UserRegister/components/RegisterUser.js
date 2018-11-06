import React, { PropTypes } from 'react'
import './RegisterUser.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'
import Formulario from './Formulario'

import LoadingSpinner from 'components/LoadingSpinner';
import { browserHistory } from 'react-router'
import Dialog from 'components/Dialog/Dialog'

class RegisterUser extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        editUser: PropTypes.func,
        deleteUser: PropTypes.func,
        insertUser: PropTypes.func,
        closeModal: PropTypes.func,
        login: PropTypes.func,
        getUser: PropTypes.func,
        users: PropTypes.object
        // id: PropTypes.string,
        // modo: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {
                stepIndex: 0,
                name: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                phone: '',
                idRegistration: '',
                school: ''
            }
        }
        this.isInitialState = true

        this.tabs = [
            { name: 'Seus dados' }]

        this.data = {
            tabs: this.tabs,
            setStepIndex: this.handleSetStepindex,
            handleSubmit: this.handleSubmit,
            handleNext: this.handleNext,
            handlePrev: this.handlePrev,
            step: this.state.user.stepIndex
        }
        this.title = 'Cadastro de Usuário'
    }

    handleChange = (key, value) => {
        console.log(value);
        
        this.setState({
            user: {
                ...this.state.user,
                [key]: value
            }
        });
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

    handleCancel = () => {
        browserHistory.push('/login');
    }

    handleSetStepindex = (newState) => {
        this.setState({ stepIndex: newState })
    }

    handleSubmit = (form) => {
        switch (this.props.params.modo) {
            case 'editar':
                this.props.editUser(form)
                break
            case 'excluir':
                this.props.deleteUser(form)
                break
            case 'inserir':
                this.props.insertUser(form)
                break
            default:
        }
    }

    onCloseModal = () => {
        const { email, password } = this.state.user;

        this.props.closeModal();

        if (this.props.user.success) {
            this.props.login({ email, password });
        }
    }

    componentDidMount() {
        //const { getUser, users } = this.props

        // if (!users.user && !users.school.name && (
        //     this.props.params.modo === 'editar' || this.props.params.modo === 'excluir')) {
        //     getUser(this.props.params.id)
        // }
    }

    render() {
        const { user } = this.props; // this.props.user.showModal
        const handles = { handleSubmit: this.handleSubmit, handleCancel: this.handleCancel, handleChange: this.handleChange }

        this.data = {
            ...this.data,
            step: this.state.user.stepIndex
        }

        return (
            <RegisterLayout titulo={this.title} {...this.data}>
                <div>
                    {/* <div className="container register-user register-form"> */}
                    <LoadingSpinner loading={this.props.user.isFetching} />
                    <Dialog open={this.props.user.showModal} onClose={this.onCloseModal}>
                        <p>{user.message}</p>
                    </Dialog>
                    <div className="row register-form">
                        <Formulario {...handles} {...this.data} />
                    </div>
                </div>
            </RegisterLayout>
        );
    }

    componentWillUnmount = () => {
        const { user, closeModal } = this.props;

        if (user.showModal) {
            closeModal();
        }
    }
}

export default RegisterUser;

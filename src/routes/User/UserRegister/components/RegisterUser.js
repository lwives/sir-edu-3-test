import React, { PropTypes } from 'react'
import { RaisedButton, TextField } from 'material-ui'
import LoadingSpinner from 'components/LoadingSpinner';
import { browserHistory } from 'react-router'
import Dialog from 'components/Dialog/Dialog'
import './RegisterUser.scss'
import RegisterLayout from '../../../../layouts/RegisterLayout'

class RegisterUser extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        registerUser: PropTypes.func,
        closeModal: PropTypes.func,
        login: PropTypes.func

    }

    constructor(props) {
        super(props);
        this.state = {
            user: {
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
    }

    handleChange = (key, value) => {
        this.setState({
            user: {
                ...this.state.user,
                [key]: value
            }
        });
    }

    handleCancel = () => {
        browserHistory.push('/login');
    }

    handleSubmit = () => {
        this.props.registerUser(this.state.user);
    }

    onCloseModal = () => {
        const { email, password } = this.state.user;

        this.props.closeModal();

        if (this.props.user.success) {
            this.props.login({ email, password });
        }
    }

    render() {
        const { user } = this.props; // this.props.user.showModal
        const handles = { handleSubmit: handleSubmit, handleCancel: handleCancel, handleChange: handleChange }

        return (
            <RegisterLayout titulo="Cadastro de Escola" {...this.data}>
                <div className="container register-user register-form">
                <LoadingSpinner loading={this.props.user.isFetching} />
                <Dialog open={this.props.user.showModal} onClose={this.onCloseModal}>
                    <p>{user.message}</p>
                </Dialog>
                <Formulario {...handles}></Formulario>
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

import React, { PropTypes } from 'react'
import { RaisedButton, TextField } from 'material-ui'
import LoadingSpinner from 'components/LoadingSpinner';
import { browserHistory } from 'react-router'
import Dialog from 'components/Dialog/Dialog'
import './RegisterUser.scss'
import HeaderDefault from '../../../../components/HeaderDefault'

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
        const { user } = this.props;

        return (
            <div className="container register-user">
                <LoadingSpinner loading={this.props.user.isFetching} />
                <Dialog open={this.props.user.showModal} onClose={this.onCloseModal}>
                    {/* .bind(this) */}
                    <p>{user.message}</p>
                </Dialog>
                <HeaderDefault texto="Cadastro de Usuário" type="h1" />
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <TextField fullWidth value={this.state.user.name || ''} type="text" floatingLabelText="Nome"
                            onChange={(evt, val) => { this.handleChange('name', val) }} />
                        <TextField fullWidth value={this.state.user.lastName || ''} type="text" floatingLabelText="Sobrenome"
                            onChange={(evt, val) => { this.handleChange('lastName', val) }} />
                        <TextField fullWidth value={this.state.user.email || ''} type="email" floatingLabelText="E-mail"
                            onChange={(evt, val) => { this.handleChange('email', val) }} />
                        <TextField fullWidth value={this.state.user.password || ''} type="password" floatingLabelText="Senha"
                            onChange={(evt, val) => { this.handleChange('password', val) }} />
                        <TextField fullWidth value={this.state.user.phone || ''} type="number" floatingLabelText="Telefone"
                            onChange={(evt, val) => { this.handleChange('phone', val) }} />
                        <TextField fullWidth value={this.state.user.address || ''} type="text" floatingLabelText="Endereço"
                            onChange={(evt, val) => { this.handleChange('address', val) }} />
                    </div>
                    <div className="col-md-8 buttons col-md-offset-2">
                        <RaisedButton className="btn-action" label="Cancelar" onClick={this.handleCancel} />
                        <RaisedButton className="btn-action" label="Cadastrar" primary onClick={this.handleSubmit} />
                    </div>
                </div>
            </div>
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

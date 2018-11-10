import { connect } from 'react-redux'
import RegisterUser from '../components/RegisterUser'
import { insertUser, closeModal } from 'store/users'
import { login } from 'store/login'

const mapDispatchToProps = {
    //registerUser,
    insertUser,
    //editUser,
    //deleteUser,
    login,
    closeModal
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser)

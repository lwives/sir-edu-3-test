import { connect } from 'react-redux'
import { saveStudent } from 'store/students'
import StudentRegister from '../components/StudentRegister'

const mapDispatchToProps = {
    saveStudent
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegister)

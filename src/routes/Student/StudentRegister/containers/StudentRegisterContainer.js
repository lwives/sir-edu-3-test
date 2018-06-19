import { connect } from 'react-redux'
import { saveStudent, getStudent } from 'store/students'
import StudentRegister from '../components/StudentRegister'

const mapDispatchToProps = {
    saveStudent,
    getStudent
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegister)

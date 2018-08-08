import { connect } from 'react-redux'
import { insertStudent, editStudent, deleteStudent, getStudent } from 'store/students'
import StudentAttendance from '../components/StudentAttendance'

const mapDispatchToProps = {
    insertStudent,
    getStudent,
    editStudent,
    deleteStudent
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendance)

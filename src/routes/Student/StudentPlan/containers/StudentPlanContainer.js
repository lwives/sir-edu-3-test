import { connect } from 'react-redux'
import { insertStudent, editStudent, deleteStudent, getStudent } from 'store/students'
import StudentPlan from '../components/StudentPlan'

const mapDispatchToProps = {
    insertStudent,
    getStudent,
    editStudent,
    deleteStudent
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentPlan)

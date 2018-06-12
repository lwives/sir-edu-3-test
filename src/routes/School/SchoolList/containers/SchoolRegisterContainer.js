import { connect } from 'react-redux'
//import { saveSchools } from 'store/schools'
import SchoolListTable from '../components/SchoolListTable'

const mapDispatchToProps = {
    // getStudentsList,
    // filterStudents,
    // setSelectedStudent
}

const mapStateToProps = (state) => ({
    // schools: state.schools,
    // filterText: state.schools.filterText
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolListTable)

import { connect } from 'react-redux'
import { insertSchool, editSchool, deleteSchool, getSchool } from 'store/schools'
import SchoolRegister from '../components/SchoolRegister'

const mapDispatchToProps = {
    insertSchool,
    editSchool,
    deleteSchool,
    getSchool
}

const mapStateToProps = (state) => ({
    schools: state.schools
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRegister)

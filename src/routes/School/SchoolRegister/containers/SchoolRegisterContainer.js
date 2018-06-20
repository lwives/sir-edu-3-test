import { connect } from 'react-redux'
import { saveSchool, getSchool } from 'store/schools'
import SchoolRegister from '../components/SchoolRegister'

const mapDispatchToProps = {
    saveSchool,
    getSchool
}

const mapStateToProps = (state) => ({
    schools: state.schools
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRegister)

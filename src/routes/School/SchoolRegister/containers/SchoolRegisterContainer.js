import { connect } from 'react-redux'
//import { saveSchools } from 'store/schools'
import SchoolRegister from '../components/SchoolRegister'

const mapDispatchToProps = {
    //saveSchools
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRegister)

import { connect } from 'react-redux'
import { insertAdaptation, editAdaptation, deleteAdaptation, getAdaptation } from 'store/adaptations'
import StudentAdaptation from '../components/StudentAdaptation'

const mapDispatchToProps = {
    insertAdaptation,
    getAdaptation,
    editAdaptation,
    deleteAdaptation
}

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdaptation)

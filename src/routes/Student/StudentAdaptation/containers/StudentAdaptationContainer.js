import { connect } from 'react-redux'
import { insertAdaptation, editAdaptation, deleteAdaptation, getAdaptation } from 'store/adaptations'
import StudentAdaptation from '../components/StudentAdaptation'

const mapDispatchToProps = {
    insertAdaptation,
    getAdaptation,
    editAdaptation,
    deleteAdaptation,
    // saveJudgement,
    // getFiles,
    // clearJudgementState
}

const mapStateToProps = (state) => ({
    students: state.students.list,
    files: state.files,
    judgement: state.judgements
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdaptation)

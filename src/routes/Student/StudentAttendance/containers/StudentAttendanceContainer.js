import { connect } from 'react-redux'
import StudentAttendance from '../components/StudentAttendance'
import { students } from 'store/students'
import { getJudgements } from 'store/judgement' //saveJudgement, clearJudgementState 
import { getFiles } from 'store/files'

const mapDispatchToProps = {
    getFiles,
    getJudgements
}
// saveJudgement,
//     clearJudgementState
// getFiles,
//     getJudgements

const mapStateToProps = (state) => ({
    students: state.students.list,
    files: state.files,
    judgements: state.judgements
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendance)

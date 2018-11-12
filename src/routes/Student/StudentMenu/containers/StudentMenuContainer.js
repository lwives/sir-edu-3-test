import { connect } from 'react-redux'

import StudentMenu from '../components/StudentMenu'
import { getFiles } from 'store/files'
import { getJudgements } from 'store/judgement'
import { getAdaptations } from 'store/adaptations'
import { getAttendances } from 'store/attendances'
import { getPlans } from 'store/plans'

const mapDispatchToProps = {
    getFiles,
    getJudgements,
    getAdaptations,
    getAttendances,
    getPlans
}

const mapStateToProps = (state) => ({
    students: state.students,
    files: state.files,
    judgements: state.judgements,
    adaptations: state.adaptations,
    attendances: state.attendances,
    plans: state.plans
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentMenu)
